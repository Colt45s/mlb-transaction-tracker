import path from 'path';
import webpack from 'webpack';
import StatsPlugin from 'stats-webpack-plugin';
import { GenerateSW } from 'workbox-webpack-plugin';
import PwaManifest from 'webpack-pwa-manifest';

const config: webpack.Configuration = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].[id].bundle.js'
  },
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new StatsPlugin('stats.json', {
      chunkModules: true
    }),
    new PwaManifest({
      filename: 'manifest.webmanifest',
      name: 'mlb-transaction-tracker',
      short_name: 'mtt',
      description: 'transaction tracker',
      theme_color: '#2196f3',
      background_color: '#2196f3',
      display: 'standalone',
      scope: '/',
      start_url: 'https://mlb-transaction-tracker.netlify.com/',
      icons: [
        {
          src: path.resolve('assets', 'icons', 'icon.png'),
          sizes: [96, 128, 192, 256, 384, 512]
        }
      ]
    }),
    new GenerateSW({
      globDirectory: 'dist',
      globPatterns: ['*.{html,js,jpg}'],
      swDest: path.resolve('dist', 'sw.js'),
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: '/',
          handler: 'NetworkFirst' as const,
          options: {
            cacheName: 'page',
            expiration: {
              maxAgeSeconds: 60 * 60 * 24
            }
          }
        },
        {
          urlPattern:
            'https://lookup-service-prod.mlb.com/json/named.transaction_all.bam',
          handler: 'NetworkFirst' as const,
          options: {
            cacheName: 'api',
            expiration: {
              maxAgeSeconds: 60 * 60 * 24
            }
          }
        },
        {
          urlPattern: /\.(png|svg|woff|ttf|eot)/,
          handler: 'CacheFirst' as const,
          options: {
            cacheName: 'assets',
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 14
            }
          }
        }
      ]
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true
        }
      }
    }
  }
};

export default config;

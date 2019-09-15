import webpack from 'webpack';
import StatsPlugin from 'stats-webpack-plugin';

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

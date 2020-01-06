import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config =
  process.env.NODE_ENV === 'production'
    ? require('./webpack.prod.config').default
    : require('./webpack.dev.config').default;

const base: webpack.Configuration = {
  entry: path.resolve('src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.png?$/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    }),
    new ForkTsCheckerWebpackPlugin(),
    // @ts-ignore
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: 'assets/icons/icon.png'
    }),
    // eslint-disable-next-line no-useless-escape
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ja/)
  ]
};

// @ts-ignore
export default merge(base, config);

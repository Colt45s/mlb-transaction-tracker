import webpack from 'webpack';

const config: webpack.Configuration = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].[id].bundle.js'
  },
  plugins: [new webpack.optimize.AggressiveMergingPlugin()],
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

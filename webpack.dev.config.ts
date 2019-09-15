import path from 'path';
import webpack from 'webpack';
import DevServer from 'webpack-dev-server';

const devServer: DevServer.Configuration = {
  contentBase: path.resolve(__dirname, 'dist'),
  port: 8080,
  compress: true,
  inline: true,
  hot: true,
  historyApiFallback: true
};

const config: webpack.Configuration = {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer
};

export default config;

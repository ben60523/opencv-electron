const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');
const ModuleRules = require('./module.rules.js');

module.exports = (env = {}, argv = {}) => ({
  node: {
    __dirname: false,
  },
  target: 'node',
  entry: { app: './renderer/app/index.js' },
  output: {
    path: path.resolve('./build'),
    filename: '[name].js',
  },
  module: {
    rules: ModuleRules(env, argv),
  },
  plugins: [
    env.analyse ? new BundleAnalyzerPlugin() : null,
    new HtmlWebpackPlugin({
      template: './renderer/public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ].filter((plugin) => plugin !== null),
  resolve: {
    modules: [path.resolve('./node_modules')],
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.node'],
  },
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
});

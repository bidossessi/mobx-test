const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const buildPath = path.resolve(__dirname, 'public');
const srcPath = path.resolve(__dirname, 'src');
const reloadPath = '/';
const nodeModulesPath = path.resolve(__dirname, 'node_modules');

const config = {
  //Entry points to the project
  entry: [
    // 'babel-polyfill',
    // polyfill for older browsers
    path.join(__dirname, 'src', 'index'),
  ],
  //Config options on how to interpret requires imports
  resolve: {
    extensions: [".js", ".json", ".scss"],
  },
  //Render source-map file for final build
  devtool: 'cheap-module-source-map',
  context: srcPath,
  output: {
    publicPath: '/',    //Path of output file
    path: buildPath,    //Path of output file
    filename: 'app.js',
  },
  // Production optimization
  // I still need to figure out the whole chunks business yet
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.template.ejs',
      title: 'JWT test - PROD',
    }),
    new BundleTracker({filename: './webpack-stats-prod.json'}),
    new BundleAnalyzerPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true,
      },
      comments: false
    }),
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("production"),
        },
    }),
  ],
  module: {
    loaders: [
      {
        //React-hot loader and
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: [nodeModulesPath],
      },
    ],
  },
};

module.exports = config;

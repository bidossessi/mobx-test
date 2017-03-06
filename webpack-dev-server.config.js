const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const buildPath = path.resolve(__dirname, 'public');
const srcPath = path.resolve(__dirname, 'src');
const reloadPath = '/';
const nodeModulesPath = path.resolve(__dirname, 'node_modules');

const config = {
  //Entry points to the project
  entry: [
    'babel-polyfill',
    // polyfill for older browsers

    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:3000',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    path.join(__dirname, 'src', 'index'),
  ],
  //Config options on how to interpret requires imports
  resolve: {
    extensions: [".js", ".json", ".scss"],
  },

  //Server Configuration options
  devServer:{
    historyApiFallback: true,
    hot: true,        //Live-reload
    inline: true,
    port: 3000,        //Port Number
    host: 'localhost',  //Change to '0.0.0.0' for external facing server
    publicPath: reloadPath,
    contentBase: buildPath,
  },
  devtool: 'inline-source-map',
  context: srcPath,
  output: {
    publicPath: reloadPath,
    path: buildPath,    //Path of output file
    filename: 'app.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally
    new HtmlWebpackPlugin({
      template: 'index.template.ejs',
      title: 'JWT test - DEV',
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new BundleTracker({filename: './webpack-stats.json'}),
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("development"),
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

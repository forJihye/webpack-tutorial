const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('./webpack.config.js');
const compiler = webpack(config);

const express= require('express');
const app = express();

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  noInfo: false,
  publicPath: config.output.publicPath,
  stats: 'minimal',
  historyApiFallback: true
  // filename: 'bundle.js',
  // quiet: false,
  // lazy: false,
  // stats: {
  //   colors: true
  // },
  // watchOptions: {
  //   aggregateTimeout: 300,
  //   poll: true
  // },
}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log
}));

app.listen(3000, function () {
  console.log('http://localhost:3000');
});



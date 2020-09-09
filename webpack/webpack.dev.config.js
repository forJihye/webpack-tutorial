const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const pathResolve = (...v) => path.resolve(__dirname, '..', ...v);
const isDev = process.env.NODE_ENV === 'development';
const jsconfig = require(pathResolve('jsconfig'));
const paths = jsconfig.compilerOptions.paths;

module.exports = {
  mode: 'development',
  entry: [pathResolve('webpack/entry.js'), 'webpack-hot-middleware/client'],
  output: {
    path: pathResolve('dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    noInfo: true,
    inline: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: ['/node_modules', path.resolve('src')],
        use: ['babel-loader']
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 0,
              name: 'assets/[hash].[ext]'
            }
          }
        ]
      }
    ]
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js'],
    alias: Object
      .keys(paths)
      .filter(key => key.slice(-1) === '*')
      .reduce((acc, key) => Object.assign(acc, {[key.slice(0, -2)]: pathResolve(paths[key][0].slice(0, -2))}), {})
    ,
  },
  plugins: [
    new HtmlWebpackPlugin({template: './public/index.html'}),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
      chunkFilename: 'assets/[id].css',
    }),
    new CleanWebpackPlugin({default: ['dist']}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  optimization: {
    minimize: false  
  }
} 

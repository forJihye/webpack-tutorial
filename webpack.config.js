const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const pathResolve = dir => path.resolve(__dirname, dir);

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: isDev ? ['webpack-hot-middleware/client', './webpack/entry.js'] : './webpack/entry.js',
  output: {
    path: pathResolve('dist'),
    filename: isDev ? '[name].js' : 'dist.js',
    publicPath: '/'
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
        use: [
          isDev ? 'style-loader'
          : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/',
            }
          },
          'css-loader',
          'sass-loader'
        ]
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
  devtool: isDev ? 'inline-source-map' : false,
  resolve: {
    alias: {
      '~': pathResolve('src')
    }
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
    minimize: !isDev
  }
} 

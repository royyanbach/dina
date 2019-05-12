const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const isProduction = mode === 'production';

module.exports = {
  mode,
  entry: {
    app: './index.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    disableHostCheck: true,
    contentBase: './docs',
    host: '0.0.0.0',
    // hot: true,
    port: 5001
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            // options: {
            //   hmr: !isProduction,
            // },
          },
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|webp)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ],
  },
  optimization: {
    minimizer: [
      ...(isProduction ? [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})] : []),
    ],
  },
  output: {
    filename: isProduction ? '[name].[hash].js' : '[name].js',
    path: path.resolve(__dirname, 'docs')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Development',
      template: 'index.html',
      minify: isProduction,
      hash: isProduction,
    }),
    new MiniCssExtractPlugin({
      filename: isProduction ? '[name].[hash].css' : '[name].css',
    })
  ]
};
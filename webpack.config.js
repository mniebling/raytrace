const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniExtractCssPlugin = require('mini-css-extract-plugin')
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')


module.exports = {
  devServer: {
    contentBase: './dist',
    open: true,
    stats: 'minimal'
  },
  devtool: 'inline-source-map',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: MiniExtractCssPlugin.loader },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.html$/,
        exclude: /index.html/,
        use: 'html-loader'
      },
      {
        test: /\.woff$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      }
    ]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: 'favicon.png' }
    ]),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new MiniExtractCssPlugin()
  ],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm.js'
    },
    extensions: ['.ts', '.js', '.css'],
    plugins: [new TsConfigPathsPlugin()]
  }
}

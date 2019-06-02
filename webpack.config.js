const path = require('path')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
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
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: 'html-loader',
        exclude: /index.html/
      }
    ]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CopyWebpackPlugin([
      'favicon.png'
    ]),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm.js'
    },
    extensions: ['.ts', '.js'],
    plugins: [new TsConfigPathsPlugin()]
  }
}

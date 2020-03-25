// webpack.config.dev.js
const path = require('path')

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: './src/index',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader']
    }, {
      test: /\.html$/,
      loader: "raw-loader" // loaders: ['raw-loader'] is also perfectly acceptable.
    }]
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    compress: true,
    port: 8080,
  }
}
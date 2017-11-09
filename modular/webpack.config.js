const webpack = require('webpack');

module.exports = {
  entry: {
    index: './src/pages/index.js',
    catalog: './src/pages/catalog.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/build',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ["env"]
        }
      },
    ],
  },
  plugins: [
     new webpack.optimize.UglifyJsPlugin({
       compress: { warnings: false },
       sourceMap: true
     }),
  ],
};

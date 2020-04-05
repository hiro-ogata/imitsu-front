module.exports = {
  entry: './index.js',
  output: {
    path: __dirname + './_webpackTest/dist',
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['es2015']
          }
        }
      }
    ]
  }
};

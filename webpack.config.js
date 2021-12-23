const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    "audio": "./audio/js/index"
  },
  output: {
    filename: "[name].js",
    path: __dirname + '/dist',
    publicPath: "/dist"
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /nodemodules/,
      use: "babel-loader"
    }]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9190,
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  }
}
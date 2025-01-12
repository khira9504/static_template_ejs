const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = function() {
  return {
    mode: "development",
    entry: './src/assets/ts/script.ts',
    output: {
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.ejs$/,
          use: [
            "html-loader",
            "template-ejs-loader",
          ],
        },
        {
          test: /\.ts$/,
          use: [
            "ts-loader",
          ],
        },
      ]
    },
    resolve: {
      extensions: [
        '.ts', '.js',
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.ejs"),
        filename: "index.html",
        minify: {
          collapseWhitespace: false,
          preserveLineBreaks: true,
        },
      }),
    ],
  }
}

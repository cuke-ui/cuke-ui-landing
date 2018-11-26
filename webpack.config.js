const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = () => {

  const options = {
    mode: "production",
    target: "web",

    entry: path.resolve(__dirname, "index.jsx"),

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "app.js",
      chunkFilename: "app.js",
      publicPath: "/cuke-ui-landing"
    },

    module: {
      rules: [
        {
          test: /\.js[x]?$/,
          use: [
            {
              loader: "babel-loader"
            }
          ],
          exclude: "/node_modules/"
        },
        {
          test: /\.less$/,
          use:
          [
            { loader: "style-loader" }, //loader 倒序执行  先执行 less-loader
            {
              loader: "css-loader",
              options: {
                javascriptEnabled: true,
                minimize: false,
                sourceMap: false
              }
            },
            {
              loader: "postcss-loader",
              options: { javascriptEnabled: true, sourceMap: false }
            }, //自动加前缀
            {
              loader: "less-loader",
              options: { javascriptEnabled: true, sourceMap: false }
            }
          ]
        },
        {
          test: /\.css$/,
          use:
          [
            { loader: "style-loader" },
            {
              loader: "css-loader",
              options: {
                javascriptEnabled: true,
                minimize: true,
                sourceMap: false
              }
            },
            {
              loader: "postcss-loader",
              options: { javascriptEnabled: true, sourceMap: false }
            }
          ]
        },
        {
          test: /\.(jpg|jpeg|png|gif|cur|ico)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "images/[name][hash:8].[ext]"
              }
            }
          ]
        },
        {
          test: /\.(eot|ttf|svg|woff|woff2)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "fonts/[name][hash:8].[ext]"
              }
            }
          ]
        }
      ]
    },

    //自动补全后缀
    resolve: {
      enforceExtension: false,
      extensions: [".js", ".jsx", ".json", ".less", ".css"],
    },

    //插件
    plugins: [
      new webpack.HashedModuleIdsPlugin(),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      }),
      new HtmlWebpackPlugin({
        title: "🥒 CUKE Ui : 一个即插即用的 React UI 库",
        filename: "index.html",
        template: path.resolve(__dirname, "index.html"),
        hash: true
      })
    ]
  };
  return options;
};
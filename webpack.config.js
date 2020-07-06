const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const optimization = () => {
  const config = {};
  if (isProd) {
    config.minimizer = [new OptimizeCssAssetsPlugin(), new TerserWebpackPlugin()];
  }
  return config;
};

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: {
    main: "./main.js"
  },
  optimization: optimization(),
  devServer: {
    port: 3000,
    hot: isDev
  },
  resolve: {
    extensions: [".js", ".json", ".png"]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build")
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: "Webpack App",
      template: "./index.html",
      minify: {
        collapseWhitespace: !isProd
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets"),
          to: path.resolve(__dirname, "build/assets")
        },
        {
          from: path.resolve(__dirname, "src/favicon.ico"),
          to: path.resolve(__dirname, "build")
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              htmr: isDev,
              reloadAll: true
            }
          },
          "css-loader"
        ]
      },
      {
        test: /\.(s[ac]ss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              htmr: isDev,
              reloadAll: true
            }
          },
          "css-loader",
          "sass-loader"
        ]
      },

      {
        test: /\.(png|jpeg|svg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ["file-loader"]
      }
    ]
  }
};

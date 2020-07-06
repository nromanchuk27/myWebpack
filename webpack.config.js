const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const FOLDER_NAME = "task1";

const PORT = process.env.PROT || process.env.PROT + 1;

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const cssLoaders = extra => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        htmr: isDev,
        reloadAll: true
      }
    },
    "css-loader"
  ];
  if (extra) loaders.push(extra);

  return loaders;
};

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
    main: ["@babel/polyfill", "./study/" + FOLDER_NAME + "/index.js"]
  },
  optimization: optimization(),

  devServer: {
    port: PORT
    /* hot: isDev */
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
      template: "./study/" + FOLDER_NAME + "/index.html",
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
        use: cssLoaders()
      },
      {
        test: /\.(s[ac]ss)$/,
        use: cssLoaders("sass-loader")
      },

      {
        test: /\.(png|jpeg|svg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ["file-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"]
          }
        }
      }
    ]
  }
};

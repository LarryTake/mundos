/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 20/08/16
 * Licence: See Readme
 */

import autoprefixer from "autoprefixer";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import webpack from "webpack";
import type { Configuration } from "./configuration";

// Constants
const BUILD_DIR = path.resolve(__dirname, "../../dev_build/");
const APP_DIR = path.resolve(__dirname, "../../dev/");
const SRC_DIR = path.resolve(__dirname, "../../src");
const ROOT_DIR = path.resolve(__dirname, "../..");

export default <Configuration>{
  mode: "development",
  bail: true,
  devtool: "inline-source-map",
  entry: {
    app: [path.join(APP_DIR, "index.tsx"), path.join(APP_DIR, "index.html")],
    vendor: ["react", "react-hotkeys", "react-dom", "lodash"],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
  },
  output: {
    path: BUILD_DIR,
    filename: "[name]-[contenthash:5].js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "eslint-loader",
        enforce: "pre",
        include: [SRC_DIR],
        options: {
          configFile: path.join(ROOT_DIR, ".eslintrc.json"),
          failOnWarning: true,
          failOnError: true,
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-loader",
            options: {
              modules: {
                camelCase: true,
                localIdentName:
                  "[path][name]---[local]---[contenthash:base64:5]",
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [autoprefixer(["last 3 versions", "ie > 8"])],
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                camelCase: true,
                localIdentName:
                  "[path][name]---[local]---[contenthash:base64:5]",
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [autoprefixer(["last 3 versions", "ie > 8"])],
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMaps: "true",
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf|wav)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10,
          name: "[name].[contenthash:7].[ext]",
        },
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: process.env.NODE_ENV,
      },
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: "index.html",
      template: path.join(APP_DIR, "index.html"),
    }),
  ],
};

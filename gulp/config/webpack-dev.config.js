/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 20/08/16
 * Licence: See Readme
 */

/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackCombineLoaders = require('webpack-combine-loaders');
const autoprefixer = require('autoprefixer');

// Constants
const BUILD_DIR = path.resolve(__dirname, '../../dev_build/');
const APP_DIR = path.resolve(__dirname, '../../dev/');
const SRC_DIR = path.resolve(__dirname, '../../src');
const ROOT_DIR = path.resolve(__dirname, '../..');

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */

module.exports = {
    bail: true,
    devtool: 'source-map',
    entry: {
        app: [
            path.join(APP_DIR, 'index.jsx'),
            path.join(APP_DIR, 'index.html'),
        ],
        vendor: ['react', 'react-hotkeys', 'react-dom', 'lodash'],
    },
    resolve: {
        extensions: ['', '.scss', '.sass', '.css', '.js', '.jsx', '.json'],
    },
    output: {
        path: BUILD_DIR,
        filename: '[name]-[hash:5].js',
        publicPath: '/',
    },
    module: {
        preLoaders: [
            {
                test: /\.js(x|)$/,
                loader: 'eslint',
                include: [
                    SRC_DIR,
                ],
            },
        ],
        loaders: [
            {
                test: /\.js(x|)?/,
                exclude: /node_modules/,
                loader: 'babel',
            },
            {
                test: /\.html$/,
                loader: 'html',
            },
            {
                test: /\.css$/,
                loader: webpackCombineLoaders([
                    {
                        loader: 'css',
                        query: {
                            modules: true,
                            camelCase: true,
                            localIdentName: '[path][name]---[local]---[hash:base64:5]',
                        },
                    },
                    {
                        loader: 'postcss',
                    },
                ]),
            },
            {
                test: /\.s[ac]ss$/,
                loader: webpackCombineLoaders([
                    {
                        loader: 'style',
                    },
                    {
                        loader: 'css',
                        query: {
                            modules: true,
                            camelCase: true,
                            localIdentName: '[path][name]---[local]---[hash:base64:5]',
                        },
                    },
                    {
                        loader: 'postcss',
                    },
                    {
                        loader: 'sass',
                        query: {
                            sourceMaps: 'true',
                        },
                    },
                ]),
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf|wav)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10,
                    name: '[name].[hash:7].[ext]',
                },
            },
        ],
    },
    eslint: {
        configFile: path.join(ROOT_DIR, '.eslintrc.json'),
        failOnWarning: true,
        failOnError: true,
    },
    postcss: [
        autoprefixer({
            browsers: ['last 3 versions', 'ie > 8'],
        }),
    ],
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: process.env.NODE_ENV,
            },
        }),
        new HtmlWebpackPlugin({
            inject: true,
            filename: 'index.html',
            template: path.join(APP_DIR, 'index.html'),
        }),
    ],
};

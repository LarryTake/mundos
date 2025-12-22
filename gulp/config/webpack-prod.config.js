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
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

// Constants
const BUILD_DIR = path.resolve(__dirname, '../../docs/');
const APP_DIR = path.resolve(__dirname, '../../dev/');
const SRC_DIR = path.resolve(__dirname, '../../src');
const ROOT_DIR = path.resolve(__dirname, '../..');

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */

module.exports = {
    bail: true,
    devtool: 'cheap-module-source-map',
    entry: {
        app: [
            path.join(APP_DIR, 'index.jsx'),
            path.join(APP_DIR, 'index.html'),
        ],
        vendor: ['react', 'react-hotkeys', 'react-dom', 'lodash'],
    },
    resolve: {
        extensions: ['.scss', '.sass', '.css', '.js', '.jsx', '.json'],
    },
    output: {
        path: BUILD_DIR,
        filename: '[name]-[hash:5].js',
    },
    module: {
        rules: [
            {
                test: /\.js(x|)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [
                    SRC_DIR,
                ],
                options: {
                    configFile: path.join(ROOT_DIR, '.eslintrc.json'),
                    failOnWarning: true,
                    failOnError: true,
                },
            },
            {
                test: /\.js(x|)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            query: {
                                modules: true,
                                camelCase: true,
                                localIdentName: '[local]',
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [
                                    autoprefixer({
                                        browsers: ['last 3 versions', 'ie > 8'],
                                    }),
                                ],
                            },
                        },
                    ],
                }),
            },
            {
                test: /\.s[ac]ss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            query: {
                                modules: true,
                                camelCase: true,
                                localIdentName: '[local]',
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [
                                    autoprefixer({
                                        browsers: ['last 3 versions', 'ie > 8'],
                                    }),
                                ],
                            },
                        },
                        {
                            loader: 'sass-loader',
                            query: {
                                sourceMaps: 'true',
                            },
                        },
                    ],
                }),
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf|wav)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10,
                    name: '[name].[hash:7].[ext]',
                },
            },
        ],
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js',
        }),
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
        new ExtractTextPlugin({
            filename: '[name]-[hash:5].css',
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
                dead_code: true,
                unused: true,
            },
            minimize: true,
            sourceMap: true,
        }),
    ],
}
;

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
const webpackCombineLoaders = require('webpack-combine-loaders');
const autoprefixer = require('autoprefixer');

// Constants
const BUILD_DIR = path.resolve(__dirname, '../../docs/');
const APP_DIR = path.resolve(__dirname, '../../dev/');

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */

module.exports = {
    entry: {
        app: [
            path.join(APP_DIR, 'index.jsx'),
            path.join(APP_DIR, 'index.html'),
        ],
        vendor: ['react', 'react-hotkeys'],
    },
    resolve: {
        extensions: ['', '.scss', '.css', '.js', '.json'],
    },
    output: {
        path: BUILD_DIR,
        filename: '[name]-[hash:5].js',
    },
    module: {
        loaders: [
            {
                test: /\.js?/,
                exclude: /node_modules/,
                loader: 'babel',
            },
            {
                test: /\.html$/,
                loader: 'html',
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(webpackCombineLoaders([
                    {
                        loader: 'css',
                        query: {
                            modules: true,
                            camelCase: true,
                            localIdentName: '[local]',
                        },
                    },
                    {
                        loader: 'postcss',
                    },
                ])),
            },
            {
                test: /\.s[ac]ss$/,
                loader: ExtractTextPlugin.extract(webpackCombineLoaders([
                    {
                        loader: 'css',
                        query: {
                            modules: 'true',
                            camelCase: 'true',
                            localIdentName: '[local]',
                            importLoaders: 1,
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
                ])),
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
        new ExtractTextPlugin('[name]-[hash:5].css'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({}),
    ],
};

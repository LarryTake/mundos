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

// Constants
const BUILD_DIR = path.resolve(__dirname, '../../docs/');
const APP_DIR = path.resolve(__dirname, '../../dev/');

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */

module.exports = {
    entry: {
        app: [
            `${APP_DIR}/index.jsx`,
        ],
    },
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.js?/,
                exclude: /node_modules/,
                loader: 'babel',
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: process.env.NODE_ENV,
            },
        }),
        new HtmlWebpackPlugin({
            inject: true,
            filename: 'index.html',
            template: `${APP_DIR}/index.html`,
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({}),
    ],
};
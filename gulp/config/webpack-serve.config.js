/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 20/08/16
 * Licence: See Readme
 */

/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const WebpackBrowserPlugin = require('webpack-browser-plugin');
const configDev = require('./webpack-dev.config');

const babelrcString = fs.readFileSync(path.resolve(__dirname, '../../.babelrc'));
const babelrc = JSON.parse(babelrcString.toString());

// Update
configDev.bail = false;
configDev.module.rules = configDev.module.rules
// Remove eslint
    .filter(rule => (rule.loader !== 'eslint-loader'))
    // Change babel-loader configuration
    .map((rule) => {
        if (rule.loader !== 'babel-loader') {
            // Continue
            return rule;
        }

        rule.query = babelrc; // eslint-disable-line no-param-reassign
        rule.query.presets.push('react-hmre'); // eslint-disable-line no-param-reassign
        rule.query.babelrc = false; // eslint-disable-line no-param-reassign
        return rule;
    });
configDev.entry.app.push('webpack-dev-server/client?http://localhost:8080');
configDev.entry.app.push('webpack/hot/only-dev-server');
configDev.plugins.push(new webpack.NoErrorsPlugin());
configDev.plugins.push(new webpack.HotModuleReplacementPlugin());
configDev.plugins.push(new WebpackBrowserPlugin());

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */

module.exports = configDev;


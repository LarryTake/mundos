/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 20/08/16
 * Licence: See Readme
 */

/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
var fs = require('fs');
var path = require('path');
var configDev = require('./webpack-dev.config');
var babelrcString = fs.readFileSync(path.resolve(__dirname, '../../.babelrc'));
var babelrc = JSON.parse(babelrcString.toString());

// Update
configDev.module.loaders[0].query = babelrc;
configDev.module.loaders[0].query.presets.push('react-hmre');
configDev.module.loaders[0].query.babelrc = false;
configDev.entry.app.push('webpack-dev-server/client?http://localhost:8080');
configDev.entry.app.push('webpack/hot/only-dev-server');
configDev.entry.app.push('webpack-hot-middleware/client');

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */

module.exports = configDev;


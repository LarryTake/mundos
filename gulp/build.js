/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 21/08/16
 * Licence: See Readme
 */

/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const { series } = require('gulp');
const clean = require('./clean');
const env = require('./env');
const web = require('./web');

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */

/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */

exports.prod = series(env.prod, clean.release.docs, web.build.prod);
exports.dev = series(env.dev, clean.web.dev, web.build.dev);

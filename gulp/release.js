/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 22/08/16
 * Licence: See Readme
 */

/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const { series } = require('gulp');
const babel = require('gulp-babel');
const build = require('./build');
const clean = require('./clean');
const env = require('./env');

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */

/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */

exports.default = series(env.prod, clean.release.dist, build.prod, babel);

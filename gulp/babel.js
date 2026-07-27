/*
 * Author: Phanabani
 * Date: 24/05/22
 * Licence: See Readme
 */

/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const { dest, src } = require('gulp');
const gulpBabel = require('gulp-babel');

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */

/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */

exports.default = function babel() {
    src('src/**/*')
        .pipe(gulpBabel())
        .pipe(dest('dist'));
};

/*
 * Author: Phanabani
 * Date: 24/05/22
 * Licence: See Readme
 */

/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const { dest, src } = require('gulp');
const babel = require('gulp-babel');

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */

/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */

exports.default = () => {
    src('src/**/*')
        .pipe(babel())
        .pipe(dest('dist'));
};

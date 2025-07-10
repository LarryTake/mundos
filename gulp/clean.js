/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 21/08/16
 * Licence: See Readme
 */

/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const gulp = require('gulp');
const del = require('del');

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */


/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */

gulp.task('clean:web:dev', () => del('dev_build'));

gulp.task('clean:release:dist', () => del('dist'));

gulp.task('clean:release:docs', () => del('docs'));

/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 21/08/16
 * Licence: See Readme
 */

/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const gulp = require('gulp');
const runSequence = require('run-sequence');

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */


/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */

gulp.task('build:prod', done => runSequence('env:prod', 'clean:release:docs', 'web:build:prod', done));

gulp.task('build:dev', done => runSequence('env:dev', 'clean:web:dev', 'web:build:dev', done));


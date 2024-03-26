/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 22/08/16
 * Licence: See Readme
 */

/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const gulp = require('gulp');
const babel = require('gulp-babel');
const runSequence = require('run-sequence');

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */

/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */

gulp.task('release',
    done => runSequence('env:prod',
        ['clean:release:dist', 'clean:release:docs'],
        ['web:build:docs', 'babel'],
        done)
);

gulp.task('babel', () => {
    gulp.src('src/**/*')
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});

/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 03/11/16
 * Licence: See Readme
 */

/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const { src, dest } = require('gulp');
const bump = require('gulp-bump');

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */

/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */

// MAJOR ('major') version when you make incompatible API changes
// MINOR ('minor') version when you add functionality in a backwards-compatible manner
// PATCH ('patch') version when you make backwards-compatible bug fixes.

const bumpMajor = () => (
    src(['package.json'])
        .pipe(bump({
            type: 'major',
        }))
        .pipe(dest('./'))
);

const bumpMinor = () => (
    src(['package.json'])
        .pipe(bump({
            type: 'minor',
        }))
        .pipe(dest('./'))
);

const bumpPatch = () => (
    src(['package.json'])
        .pipe(bump({
            type: 'patch',
        }))
        .pipe(dest('./'))
);

exports.major = bumpMajor;
exports.minor = bumpMinor;
exports.patch = bumpPatch;

exports.default = bumpMinor;

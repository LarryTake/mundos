/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 03/11/16
 * Licence: See Readme
 */

import { dest, src } from 'gulp';
import bump from 'gulp-bump';

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

bumpMajor.displayName = 'bump:major';
bumpMinor.displayName = 'bump:minor';
bumpPatch.displayName = 'bump:patch';

export { bumpMajor, bumpMinor, bumpPatch };

export default bumpMinor;

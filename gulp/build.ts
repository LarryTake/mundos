/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 21/08/16
 * Licence: See Readme
 */

import { series } from 'gulp';

import { cleanReleaseDocs, cleanWebDev } from './clean';
import { envProd, envDev } from './env';
import { webBuildProd, webBuildDev } from './web';

const buildProd = series(envProd, cleanReleaseDocs, webBuildProd);
const buildDev = series(envDev, cleanWebDev, webBuildDev);

buildProd.displayName = 'build:prod';
buildDev.displayName = 'build:dev';

export { buildProd, buildDev };

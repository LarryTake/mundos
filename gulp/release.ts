/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 22/08/16
 * Licence: See Readme
 */

import { series } from 'gulp';

import { babel } from './babel';
import { buildProd } from './build';
import { cleanReleaseDist } from './clean';
import { envProd } from './env';

export const release = series(envProd, cleanReleaseDist, buildProd, babel);

/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 21/08/16
 * Licence: See Readme
 */

import { series } from 'gulp';

import { envDev } from './env';
import { webServe } from './web';

export const serve = series(envDev, webServe);

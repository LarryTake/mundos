/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 20/08/16
 * Licence: See Readme
 */

function envProd(cb) {
  process.env.NODE_ENV = '"production"';
  cb();
}

function envDev(cb) {
  process.env.NODE_ENV = '"development"';
  cb();
}

envProd.displayName = 'env:prod';
envDev.displayName = 'env:dev';

export { envProd, envDev };

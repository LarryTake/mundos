/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 20/08/16
 * Licence: See Readme
 */

type CallbackType = (err?: Error) => void;

function envProd(cb: CallbackType) {
  process.env.NODE_ENV = '"production"';
  cb();
}

function envDev(cb: CallbackType) {
  process.env.NODE_ENV = '"development"';
  cb();
}

envProd.displayName = "env:prod";
envDev.displayName = "env:dev";

export { envProd, envDev };

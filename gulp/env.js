/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 20/08/16
 * Licence: See Readme
 */

/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */

/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */

exports.prod = function envProd(cb) {
    process.env.NODE_ENV = '"production"';
    cb();
};

exports.dev = function envDev(cb) {
    process.env.NODE_ENV = '"development"';
    cb();
};

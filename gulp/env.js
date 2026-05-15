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

exports.prod = (cb) => {
    process.env.NODE_ENV = '"production"';
    cb();
};

exports.dev = (cb) => {
    process.env.NODE_ENV = '"development"';
    cb();
};

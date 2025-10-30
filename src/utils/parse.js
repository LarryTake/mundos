/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 22/10/16
 * Licence: See Readme
 */
/* ************************************* */
/* ********       IMPORTS       ******** */
/* ************************************* */


/* ************************************* */
/* ********      VARIABLES      ******** */
/* ************************************* */


/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */


/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */

/**
 * Parse.
 * @param string {String} string to parse
 * @returns {*}
 */
function parse(string) {
    let result = string;

    // Check if string contains 'function' and start with it to eval it
    if (result.indexOf('function') === 0) {
        return eval(`(${result})`); // eslint-disable-line no-eval
    }

    try {
        result = JSON.parse(string);
    } catch (e) {
        // Error
    }
    return result;
}

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */
export default parse;

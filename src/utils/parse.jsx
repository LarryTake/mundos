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

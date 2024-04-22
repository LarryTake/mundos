/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 19/10/16
 * Licence: See Readme
 */

/* ************************************* */
/* ********       IMPORTS       ******** */
/* ************************************* */


/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */


/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */

/**
 * Get Object type.
 * @param obj {*} object to get type
 * @returns {*}
 */
function getObjectType(obj) {
    if (obj !== null && typeof obj === 'object' && !Array.isArray(obj) &&
        typeof obj[Symbol.iterator] === 'function') {
        return 'Iterable';
    }
    return Object.prototype.toString.call(obj).slice(8, -1);
}

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */
export default {
    getObjectType,
};

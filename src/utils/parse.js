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

const basicFunctionPattern = /^function *(?<name>[$_a-zA-Z][$\w]*)?\((?<params>[$_a-zA-Z][$\w]*(?:, *[$_a-zA-Z][$\w]*)*)*?\) *{(?<body>[^}]*)}$/;

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */

/**
 * Sanitize a string that might have a function definition.
 * Note that this is not a perfect solution, there are still
 * security flaws.
 * @param functionString {String} string to sanitize
 * @returns {Function | null}
 */
function sanitizeFunction(functionString) {
    /* This is not an exhaustive check by any means
     * For instance, function names may have a wide variety of
     * unicode characters and still be valid... oh well!
     *
     * TEST CASES:
     *
     * Should match:
     *
     * function() {}
     * function myFunc(){}
     * function myFunc(arg1){}
     * function(arg1,arg2, arg3,  arg4) {}
     * function myFunc(arg1, arg2, arg3){}
     * function myFunc(arg1, arg2, arg3){console.log('something');}
     *
     * Should not match:
     *
     * function myFunc(arg1,){}
     * function myFunc(arg1, ){}
     * function myFunc(arg1) {if (true) {var thisWontWorkBcOfCurlyBraces}}
     * function myFunc()); (somethingBad()
     * function myFunc(){}, somethingBad()
     * somethingBad()
     */
    const match = basicFunctionPattern.exec(functionString);
    if (match === null) return null;
    let params = [];
    if (match.groups.params) {
        // Create an array of parameter names with whitespace trimmed
        params = match.groups.params.split(',').map((x) => x.trim())
    }

    // Here's the security flaw. We want this functionality for supporting
    // JSONP, so we've opted for the best attempt at maintaining some amount
    // of security. This should be a little better than eval because it
    // shouldn't automatically execute code, just create a function which can
    // be called later.
    // eslint-disable-next-line no-new-func
    const func = new Function(...params, match.groups.body || '');
    func.displayName = match.groups.name;
    return func;
}


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

    // Try parsing (and sanitizing) a function
    const func = sanitizeFunction(string);
    if (func !== null) return func;

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

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

const basicFunctionPattern = new RegExp(
    // eslint-disable-next-line prefer-template
    ''
    + /^function/.source
    + / *([$_a-zA-Z][$\w]*)?/.source // name
    + / *\([ \n]*([$_a-zA-Z][$\w]*(?:[ \n]*,[ \n]*[$_a-zA-Z][$\w]*)*)*?,?[ \n]*\)/.source // params
    + /[ \n]*{\n*(.*?)\n? *}$/.source, // body
    's',
);

/* ************************************* */
/* ********  PRIVATE FUNCTIONS  ******** */
/* ************************************* */

/**
 * Try to regex match a string as a javascript function.
 * @param functionString {string} string to match
 * @param splitParams {boolean} whether to split parameters into an array
 * @returns {{name: string, params: string | string[], body: string} | null}
 */
function matchFunction(functionString, splitParams = false) {
    const match = basicFunctionPattern.exec(functionString);
    if (match === null) return null;
    return {
        name: match[1],
        params: splitParams ? commaSplit(match[2]) : match[2],
        body: match[3],
    };
}

/**
 * Split comma separated strings and trim surrounding whitespace.
 * @param string {string | undefined} a string of comma-separated strings
 * @returns {string[]} an array of elements that were separated by commas with
 *   surrounding whitespace trimmed. May be empty.
 */
function commaSplit(string) {
    if (!string) return [];
    return string.split(',').map(x => x.trim());
}

/**
 * Try creating an anonymous function from a string, or return null if it's
 * not a valid function definition.
 * Note that this is not a completely safe, there are still security flaws,
 * but it is safer than using `exec`.
 * @param functionString {string} string to try to parse as a function
 *   definition
 * @returns {Function | null} an anonymous function if the string is a valid
 *   function definition, else null
 */
function createFunction(functionString) {
    /* This is not an exhaustive check by any means
     * For instance, function names may have a wide variety of
     * unicode characters and still be valid... oh well!
     *
     * TEST CASES:
     *
     * // Should match (single-line):
     * function() {}
     * function () {}
     * function myFunc(){}
     * function myFunc(arg1){}
     * function(arg1,arg2, arg3,  arg4) {}
     * function myFunc(arg1, arg2, arg3){}
     * function myFunc(arg1, arg2, arg3){console.log('something');}
     * function myFunc(arg1,){}
     * function myFunc(arg1, ){}
     * function myFunc(arg1) {if (true) {var moreCurlyBraces = 1;}}
     *
     * // Should match (multi-line):
     * function myFunc(arg1, arg2, arg3) {
     *     console.log('something');
     * }
     *
     * function myFunc() {
     *     console.log('test');
     *     if (true) {
     *         console.log('test2');
     *     }
     * }
     *
     * // Should not match (single-line):
     * anotherFunction()
     * function myFunc {}
     * function myFunc()); (anotherFunction()
     * function myFunc(){}, anotherFunction()
     */
    const match = matchFunction(functionString, true);
    if (!match) return null;

    // Here's the security flaw. We want this functionality for supporting
    // JSONP, so we've opted for the best attempt at maintaining some amount
    // of security. This should be a little better than eval because it
    // shouldn't automatically execute code, just create a function which can
    // be called later.
    // eslint-disable-next-line no-new-func
    const func = new Function(...match.params, match.body || '');
    func.displayName = match.name;
    return func;
}


/* ************************************* */
/* ********   PUBLIC FUNCTIONS  ******** */
/* ************************************* */

/**
 * Parse a string into either a function or a JSON element.
 * @param string {string} string to parse
 * @returns {Function | Object | Array | null | boolean | number | string}
 */
function parse(string) {
    // Try parsing (and sanitizing) a function
    const func = createFunction(string);
    if (func !== null) return func;

    try {
        return JSON.parse(string);
    } catch (e) {
        return string;
    }
}

/**
 * A different implementation of Function.prototype.toString which tries to get
 * a function name using displayName when name is "anonymous".
 * @param func {Function} function to transform into a string
 * @returns {string} a string representing the function
 */
function functionToString(func) {
    const pattern = /^function anonymous/;
    const funcStr = func.toString();
    if (pattern.test(funcStr) && func.displayName) {
        return func.toString().replace(pattern, `function ${func.displayName}`);
    }
    return funcStr;
}

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */
export default parse;
export { functionToString };

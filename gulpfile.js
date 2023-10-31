/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 03/07/16
 * Licence: See Readme
 */

/* ************************************* */
/* ********       REQUIRE       ******** */
/* ************************************* */
const fs = require('fs');
const gulp = require('gulp');
// Constants
const path = './gulp/';

try {
    const items = fs.readdirSync(path);
    if (items) {
        items.forEach((file) => {
            const filePath = path + file;
            const fileStat = fs.lstatSync(filePath);
            if (fileStat.isFile()) {
                require(path + file);
            }
        });
    }

    gulp.task('default', ['serve']);
} catch (e) {
    console.error(e);
}

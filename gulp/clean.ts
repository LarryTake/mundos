/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 21/08/16
 * Licence: See Readme
 */

import del from 'del';

const cleanWebDev = () => del('dev_build');

const cleanReleaseDist = () => del('dist');
const cleanReleaseDocs = () => del('docs');

cleanWebDev.displayName = 'clean:web:dev';
cleanReleaseDist.displayName = 'clean:release:dist';
cleanReleaseDocs.displayName = 'clean:release:docs';

export { cleanWebDev, cleanReleaseDist, cleanReleaseDocs };

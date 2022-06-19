PENJELASAN TENTANG PERBEDAAN ES MODULE dan COMMONJS MODULE ada di :

https://nodejs.org/docs/latest-v13.x/api/esm.html#esm_enabling

dan di sini :

https://blog.logrocket.com/commonjs-vs-es-modules-node-js/

\*\* Files ending with .mjs are always loaded as ES modules regardless of package scope.

\*\* Files ending with .cjs are always loaded as CommonJS regardless of package scope.

import './legacy-file.cjs';
// Loaded as CommonJS since .cjs is always loaded as CommonJS.

import 'commonjs-package/src/index.mjs';
// Loaded as ES module since .mjs is always loaded as ES module.

Another way to enable ES modules in your project can be done by adding a "type: module" field inside the nearest package.json file (the same folder as the package you’re making):

{
"name": "my-library",
"version": "1.0.0",
"type": "module",
// ...
}

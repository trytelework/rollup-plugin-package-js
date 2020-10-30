/** @license MIT */

const thisPlugin = require('.');

module.exports = [
  {
    input: 'test/index.mjs',
    output: {
      file: 'build/index.mjs',
      format: 'esm',
    },
    plugins: [ thisPlugin() ],
  },
  {
    input: 'test/index.cjs',
    output: {
      file: 'build/index.cjs',
      format: 'cjs',
    },
    plugins: [ thisPlugin() ],
  },
];

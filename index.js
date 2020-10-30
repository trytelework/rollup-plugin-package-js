/** @license MIT */
/**
 * @fileoverview
 * Put your logic here. This source comes from
 * `rollup-plugin-class-fields-to-getters` which replaces class fields with
 * getters for Closure Compiler compatibility.
 */

const babel = require('@babel/core');
const classProperties = require('@babel/plugin-syntax-class-properties');

/**
 * Example from `rollup-plugin-disable-packages`, which replaces imports of a
 * given list of packages with empty objects (`{}`).
 *
 * @param {...?} args
 * The arguments the AST replacement algorithm.
 *
 * @return {object}
 */
const ASTReplacements = (...args) => ({
  visitor: {
    ClassProperty(path) {
      /** The current node. */
      const node = path.node;
      /**
       * Our replacement node. Of form:
       * ```
       * static get myMethod() { return ...; }
       * ```
       * */
      const newNode = babel.types.classMethod(
          'get',
          node.key,
          [],
          babel.types.blockStatement([
            babel.types.returnStatement(
                node.value,
            ),
          ]),
          node.computed,
          node.static,
      );
      /** Replace the original node. */
      path.replaceWith(newNode);
    },
  },
});

/**
 * Import `empty` instead of a given module.
 *
 * @param  {...?} args
 * The name of the module to disable.
 *
 * @return {object}
 * The Rollup plugin object.
 */
const thisPlugin = (...args) => {
  return {
    name: 'thisPlugin',
    renderChunk: async (code, chunk, options) => {
      const output = await babel.transformAsync(code, {
        plugins: [
          classProperties,
          ASTReplacements(...args),
        ],
      });
      return output.code;
    },
  };
};

module.exports = thisPlugin;

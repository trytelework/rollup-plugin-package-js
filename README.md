# Rollup AST Plugin Template
Use `@babel/core` to parse the AST of Rollup modules and transform code chunks
as needed. Run `yarn test` for testing.

## `rollup.config.js`
```javascript
import astTemplate from 'rollup-plugin-ast-template';
export default {
  ...
  plugins: [
    astTemplate(...args),
  ],
  ...
}
```
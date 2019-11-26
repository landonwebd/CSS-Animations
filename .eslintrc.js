'use-strict';

module.exports = {
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': `eslint:recommended`,
  'globals': {
    'Atomics': `readonly`,
    'SharedArrayBuffer': `readonly`,
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': `module`,
  },
  rules: {
    // Global Rules
    'no-undef': [ `off` ],

    // Comment Rules
    'multiline-comment-style': [ `error`, `starred-block` ],
    'spaced-comment': [ `error`, `always` ],

    // Line Length Rules
    'max-len': [ `error`, { 'code': 120 } ],

    // Punctuation Rules 
    semi: [ `error`, `always` ],
    'semi-spacing': `error`,
    'no-extra-semi': `error`,
    'no-unexpected-multiline': `error`,
    'comma-style': [ `error`, `last` ],
    'comma-dangle': [ `error`, `always-multiline` ],
    quotes: [ `error`, `backtick` ],

    // Spacing Rules
    indent: [ `error`, 2 ],
    'space-infix-ops': `error`,
    'brace-style': `error`,
    'space-before-blocks': `error`,
    'keyword-spacing': [ `error`, {
      "overrides": {
        "if": { "after": false },
        "for": { "after": false },
        "while": { "after": false },
        "catch": { "after": false },
      },
    } ],
    'arrow-spacing': `error`,
    'space-before-function-paren': [
      `error`, {
        'anonymous': `always`,
        'named': `never`,
        'asyncArrow': `always`,
      },
    ],
    'newline-per-chained-call': `error`,
    'space-in-parens': [ `error`, `never` ],
    'array-bracket-spacing': [ `off` ],
    'object-curly-spacing': [ `error`, `always` ],
    'comma-spacing': [ `error`, { 'before': false, 'after': true } ],
    'no-multiple-empty-lines': [ `error`, { 'max': 1, 'maxEOF': 1 } ],

    // Variables
    camelcase: `error`,
    'no-unused-vars': [ `error`, { 'args': `none` } ],

    // Syntax and Logic Error Prevention
    'no-const-assign': `error`,
    'no-cond-assign': `error`,
    'no-dupe-args': `error`,
    'no-func-assign': `error`,
    'eqeqeq': [ `error`, `smart` ],
  },
};
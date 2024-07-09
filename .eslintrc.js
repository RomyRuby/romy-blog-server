
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error'],
    quotes: ['error', 'single'],
    semi: ['error'],
    'no-console': 0
  },
  globals: {
    process: true
  }
};
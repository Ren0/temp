module.exports = {
  root: true,
  env: {
    node: true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:node/recommended"
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-param-reassign": 0,
    "node/no-unsupported-features/es-syntax": 'off'
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};

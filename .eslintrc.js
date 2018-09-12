module.exports = {
  globals: {
    server: true,
  },
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'babel',
    'hbs',
  ],
  extends: [
    'plugin:ember/recommended',
    'plugin:ember-suave/recommended',
    'airbnb-base',
  ],
  env: {
    browser: true,
  },
  rules: {
    'class-methods-use-this': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'hbs/check-hbs-template-literals': 'error',
    'ember-suave/no-const-outside-module-scope': 'off',
  },
};

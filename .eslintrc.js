module.exports = {
  globals: {
    server: true,
  },
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  plugins: [
    'babel',
    'hbs',
    'ember',
  ],
  extends: [
    'airbnb-base',
    'plugin:ember/recommended',
  ],
  env: {
    browser: true
  },
  rules: {
    'no-underscore-dangle': ['error', {
      allow: ['_super'],
      allowAfterThis: false,
      allowAfterSuper: false,
      enforceInMethodNames: false,
    }],
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'hbs/check-hbs-template-literals': 'error',
  },
};

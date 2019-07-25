module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
    },
  },
  plugins: [
    'babel',
    'hbs',
    'ember',
    'ember-suave',
    'security',
    'prettier',
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:ember-suave/recommended',
    'airbnb-base',
    'plugin:security/recommended',
    'plugin:prettier/recommended',
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
    'generator-star-spacing': ['error', {
      before: false,
      after: true,
      method: {
        before: true,
        after: true
      },
    }]
  },
};

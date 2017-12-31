module.exports = {
  env: {
    mocha: true,
    embertest: true,
  },
  plugins: [
    'mocha',
    'chai-friendly',
    'chai-expect',
  ],
  extends: [
    'plugin:mocha/recommended',
  ],
  rules: {
    'func-names': 'off',
    'no-unused-expressions': 'off',
    'chai-friendly/no-unused-expressions': 'error',
    'chai-expect/no-inner-compare': 'error',
    'chai-expect/missing-assertion': 'error',
    'chai-expect/terminating-properties': 'error',
  },
};

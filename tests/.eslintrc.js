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
    'mocha/no-mocha-arrows': 'off',
    'mocha/no-top-level-hooks': 'off',
    'mocha/no-setup-in-describe': 'off',
    'mocha/no-hooks-for-single-case': 'off',
    'chai-friendly/no-unused-expressions': 'error',
    'chai-expect/no-inner-compare': 'error',
    'chai-expect/missing-assertion': 'error',
    'chai-expect/terminating-properties': 'error',
    'ember/no-restricted-resolver-tests': 'off',
  },
};

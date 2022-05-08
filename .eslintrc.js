module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/extensions': ['error', 'always'],
    'prefer-destructuring': ['error', { object: false, array: false }],
    'no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true },
    ],

  },
};

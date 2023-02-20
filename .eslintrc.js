module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2021,
  },
  parser: 'vue-eslint-parser',
  extends: ['plugin:vue/vue3-recommended', 'airbnb-base', 'plugin:prettier/recommended', 'plugin:jsx-a11y/recommended'],
  plugins: ['prettier', 'jsx-a11y'],
  env: {
    browser: true,
    node: true,
    es6: true,
    'vue/setup-compiler-macros': true,
  },
  rules: {
    'consistent-return': 'off',
    'prettier/prettier': ['error'],
    'no-console': 'off',
    'no-unused-expressions': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-absolute-path': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'no-shadow': 'off',
    'no-param-reassign': 'off',
    'no-restricted-syntax': 'off',
    'no-use-before-define': 'off',
    'no-plusplus': [
      'off',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
  },
}

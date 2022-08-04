module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json']
  },
  plugins: [
    'simple-import-sort',
    'prettier'
  ],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'prettier',
  ],
  env: {
    es6: true,
    node: true
  },
  rules: {
    'prettier/prettier': ['error', {
      printWidth: 100,
      singleQuote: true,
      trailingComma: 'es5'
    }],

    'import/prefer-default-export': 'off',

    'simple-import-sort/imports': [
      2,
      { 'groups': [['^\\u0000'], ['^[^.]'], ['^\\.'], ['^.+\\.s?css$']] }
    ],

    'no-plusplus': 'off'
  }
};

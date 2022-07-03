module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: [
    'simple-import-sort',
    'prettier'
  ],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:import/electron',
    'prettier'
  ],
  env: {
    browser: true,
    es6: true,
    node: true
  },
  rules: {
    'prettier/prettier': ['error', {
      printWidth: 100,
      singleQuote: true,
      trailingComma: 'es5',
    }],

    'import/prefer-default-export': 'off',

    "react/prop-types": 'off',
    'react/function-component-definition': 'off',
    "react/require-default-props": "off",
    'react/jsx-props-no-spreading': 'off',

    'react-hooks/exhaustive-deps': 'off',

    'simple-import-sort/imports': [
      2,
      { 'groups': [['^\\u0000'], ['^[^.]'], ['^\\.'], ['^.+\\.s?css$']] }
    ],

    'no-plusplus': 'off',
  }
}

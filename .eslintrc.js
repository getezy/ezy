module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json', './__tests__/simple-service/tsconfig.json', './__tests__/tls-service/tsconfig.json']
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
    'prettier',
    'plugin:storybook/recommended'
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
      trailingComma: 'es5'
    }],

    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        'devDependencies': [
          '**/*.stories.*',
          '**/.storybook/**/*.*'
        ],
        'peerDependencies': true
      }
    ],

    'react/prop-types': 'off',
    'react/function-component-definition': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',

    'react-hooks/exhaustive-deps': 'off',

    'simple-import-sort/imports': [
      'error',
      { 'groups': [['^\\u0000'], ['^[^.]'], ['^@(context|hooks|layouts|components|storage|core|core/types)'], ['^\\.'], ['^.+\\.s?css$']] }
    ],

    'no-plusplus': 'off'
  }
};

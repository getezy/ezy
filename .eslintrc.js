module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },

  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: [
      'tsconfig.node.json',
      'tsconfig.app.json',
      'tsconfig.splash-screen.json',
      './migrations/tsconfig.json',
      './tests/grpc-services/simple-service/tsconfig.json',
      './tests/grpc-services/tls-service/tsconfig.json',
    ],
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
    ecmaVersion: 2021,
  },

  plugins: ['simple-import-sort', 'prettier'],
  extends: ['airbnb', 'airbnb/hooks', 'airbnb-typescript', 'plugin:import/electron', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        semi: true,
        tabWidth: 2,
        printWidth: 100,
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],

    'no-plusplus': 'off',

    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'error',

    'react/prop-types': 'off',
    'react/function-component-definition': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',

    'react-hooks/exhaustive-deps': 'off',

    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^\\u0000'],
          ['^[^.]'],
          [
            '^@(core|main|components|themes|database|hooks|new-storage|storage|context|layouts|api)',
          ],
          ['^\\.'],
          ['^.+\\.s?css$'],
        ],
      },
    ],
  },
};

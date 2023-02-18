module.exports = () => ({
  autoDetect: true,

  files: ['src/**/*.ts', '!src/**/*.spec.ts'],

  tests: ['src/**/*.spec.ts'],

  env: {
    type: 'node',
  },

  testFramework: {
    configFile: './jest.config.core.js',
  },
});

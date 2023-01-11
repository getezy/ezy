/**
 * @type {import('jest').Config}
 * */
const coverage = {
  ci: true,
  collectCoverage: true,
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageReporters: ['text'],
};

/**
 * @type {import('jest').Config}
 * */
const config = {
  rootDir: './src/core',
  verbose: true,

  moduleFileExtensions: ['js', 'ts'],
  testEnvironment: 'node',
  testRegex: '.spec.ts$',
  transform: {
    '.+\\.(t|j)s$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.node.json',
      },
    ],
  },
  ...(process.env.CI === 'true' ? coverage : {}),
};

module.exports = config;

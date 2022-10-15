module.exports = {
  reject: [
    // jest.spyOn is broken on next versions till 29.2.0
    'jest',
    '@types/jest'
  ]
};

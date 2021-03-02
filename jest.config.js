module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testMatch: ['**/__tests__/*.spec.+(ts|tsx|js)', '**/*.test.+(ts|tsx|js)'],
  transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
  }
};
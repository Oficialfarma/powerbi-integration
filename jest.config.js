module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",
  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: [
    "json",
    "text",
    "lcov",
    "clover"
  ],
  // An object that configures minimum threshold enforcement for coverage results
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/__tests__/*.spec.+(ts|tsx|js)', '**/*.test.+(ts|tsx|js)'],
  transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest'
  }
};
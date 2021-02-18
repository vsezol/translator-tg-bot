module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  coverageProvider: 'v8',
  rootDir: 'src',
  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/$1',
  },
};

export default {
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'json'],
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
    roots: ['<rootDir>/__tests__'],
    verbose: true,
  };
export default {
  // Set the test environment to Node.js (for backend testing)
  testEnvironment: 'node',
  
  // Specify the file extensions Jest should consider as modules
  moduleFileExtensions: ['js', 'json'],
  
  // Define how files should be transformed before running tests.
  // Here, we use babel-jest to transform JavaScript files
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  
  // Specify the root directory where Jest will look for test files
  roots: ['<rootDir>/__tests__'],
  
  // Set Jest to show individual test results in the console (verbose output)
  verbose: true,
};

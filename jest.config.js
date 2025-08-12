module.exports = {
  testEnvironment: 'node',
  //globalSetup: './globalSetup.js',
  //globalTeardown: './globalTeardown.js',
  testTimeout: 30000,
  reporters: [
    'default',
    ['jest-html-reporter', {
      pageTitle: 'API Test Report',
      outputPath: './reports/test-report.html',
      includeFailureMsg: true,
      includeConsoleLog: true
    }],
    ['jest-junit', {
      outputDirectory: './reports',
      outputName: 'junit.xml'
    }]
  ],
  maxWorkers: 1
};
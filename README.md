# cross-layer-qa-automation [![CircleCI](https://dl.circleci.com/status-badge/img/gh/ranaamr22/cross-layer-qa-automation/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/ranaamr22/cross-layer-qa-automation/tree/main)


A complete end-to-end test automation framework covering UI and API testing using NightwatchJS, Supertest, and CircleCI. Includes test cases, bug reports, CI/CD pipeline, and HTML test reports.

# Test Scripts Documentation

This project includes automated UI tests using Nightwatch.js for end-to-end testing of web applications.

## Available Test Scripts

### AWS Test Suite
```bash
npm run test:amazonaws
```
- **Purpose**: Runs automated tests for AWS-related functionality
- **Configuration**: Uses `ui-tests/amazonaws/nightwatch.conf.js`
- **Target**: Amazon Web Services interfaces and workflows

### LinkedIn Registration Page Tests
```bash
npm run test:linkedinRegisterationPage
```
- **Purpose**: Tests LinkedIn registration page functionality
- **Configuration**: Uses `ui-tests/linkedinRegisterationPage/nightwatch.conf.js`
- **Target**: LinkedIn user registration flow and form validation

## Prerequisites

Before running the tests, ensure you have:

1. **Node.js** installed (version 14 or higher recommended)
2. **Dependencies** installed:
   ```bash
   npm install
   ```
3. **Browser drivers** configured (Chrome, Firefox, etc.)
4. **Test environment** properly set up

## Project Structure

```
project-root/
├── package.json
├── package-lock.json
├── ui-tests/
│   ├── amazonaws/
│   │   ├── nightwatch.conf.js
│   │   └── tests/
│   └── linkedinRegisterationPage/
│       ├── nightwatch.conf.js
│       └── tests/
└── README.md
```

## Running Tests

### Run Individual Test Suites

To run AWS tests:
```bash
npm run test:amazonaws
```

To run LinkedIn registration tests:
```bash
npm run test:linkedinRegisterationPage
```

### Run All Tests
```bash
# Run all available test suites
npm run test:amazonaws && npm run test:linkedinRegisterationPage
```

### Development Mode
For development and debugging, you can run tests with additional options:

```bash
# Run with verbose output
npx nightwatch --config ui-tests/amazonaws/nightwatch.conf.js --verbose

# Run specific test file
npx nightwatch --config ui-tests/amazonaws/nightwatch.conf.js tests/specific-test.js

# Run in headless mode
npx nightwatch --config ui-tests/amazonaws/nightwatch.conf.js --headless
```

## Configuration

Each test suite has its own Nightwatch configuration file:

- **AWS Tests**: `ui-tests/amazonaws/nightwatch.conf.js`
- **LinkedIn Tests**: `ui-tests/linkedinRegisterationPage/nightwatch.conf.js`

These configurations define:
- Browser settings
- Test environments
- Page object models
- Custom commands
- Reporter settings


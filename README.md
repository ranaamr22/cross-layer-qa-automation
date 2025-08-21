# Cross Layer QA Automation [![CircleCI](https://dl.circleci.com/status-badge/img/gh/ranaamr22/cross-layer-qa-automation/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/ranaamr22/cross-layer-qa-automation/tree/main)


A complete end-to-end test automation framework integrating **UI and API testing** using:

- [NightwatchJS](https://nightwatchjs.org) for UI testing  
- [Supertest](https://github.com/visionmedia/supertest) for API testing  
- [CircleCI](https://circleci.com) for CI/CD automation  
- HTML & JUnit reporters for test results and visibility

---

## Features

### UI Tests for:

- **Amazonaws**   
- **LinkedIn Registration Page** – Real-world form interaction tests  
- **MyStore Demo** – E-commerce UI testing

### API Tests for:

- **mock-user-auth** – Simulates user authentication & authorization flow  
- Covers: login, register, get, patch, delete, and access control edge cases

---

## CI/CD Pipeline

- Configured with **CircleCI** to automatically:
  - Install dependencies
  - Run UI and API test suites
---

# Test Scripts Documentation

This project includes automated **UI and API tests** for various web applications.

📂 A **demo video**, **test reports** (UI & API), and a **PDF containing all test cases and bug tickets** are available at the link below:

🔗 **[View Documentation, Reports & Demo](https://drive.google.com/drive/u/1/folders/1j-EnZDq77R4LNO7IpUhBYVMFabojHzSB)**


## Available Test Scripts

### AWS Test Suite
```bash
npm run test:amazonaws
```
- **Purpose**: Runs automated tests for amazonaws-related functionality
- **Configuration**: Uses `ui-tests/amazonaws/nightwatch.conf.js`
- **Target**: amazonaws Web Services interfaces and workflows

### LinkedIn Registration Page Tests
```bash
npm run test:linkedinRegisterationPage
```
- **Purpose**: Tests LinkedIn registration page functionality
- **Configuration**: Uses `ui-tests/linkedinRegisterationPage/nightwatch.conf.js`
- **Target**: LinkedIn user registration flow and form validation

### myStore Test Suite
```bash
npm run test:myStore
```
- **Purpose**: Runs automated tests for myStore-related functionality
- **Configuration**: Uses `ui-tests\myStore\nightwatch.conf.js`
- **Target**: My Store (multiformis.com) Web Services interfaces and workflows


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
├── .circleci/
│   └── config.yml                   # CircleCI CI/CD pipeline 
│
├── api-tests/
│   └── tests/                       # API test cases using Supertest
│       ├── authenticateUser.test.js
│       ├── createUser.test.js
│       ├── deleteAllUsers.test.js
│       ├── deleteUserByToken.test.js
│       ├── getUserByToken.test.js
│       ├── patchUserByToken.test.js
│       └── userUtils.js            # Helper functions for API tests
│
├── reports/                         # Test reports 
│   ├── junit.xml
│   └── test-report.html
│
├── tests_output/                    # Nightwatch test output (auto-generated)
│
├── ui-tests/
│   ├── amazonaws/                   # UI tests for AmazonAWS dummy site
│   ├── linkedinRegisterationPage/  # UI tests for LinkedIn registration 
│   └── myStore/                     # UI tests for MyStore app
│       ├── page-objects/           # Nightwatch Page Object Models
│       ├── tests/                  # UI test scripts
│       └── nightwatch.conf.js      # Project-specific Nightwatch config
│
├── .gitignore
├── .nvmrc
├── jest.config.js                  # Jest configuration for API tests
├── nightwatch.conf.js              # Root Nightwatch configuration
├── package.json
├── package-lock.json
└── README.md
```

## Running Tests

To run AWS tests:
```bash
npm run test:amazonaws
```
To run LinkedIn registration tests:
```bash
npm run test:linkedinRegisterationPage
```

To run My Store tests:
```bash
npm run test:myStore
```
To run API tests:
```bash
npm run test:api-tests
```
Start Mock API Server (for API tests)
```bash
npm run dev
```
Run All UI Tests

```bash
npm run test:ui-tests 
```
### Development Mode
For development and debugging, you can run tests with additional options:

```bash

# Run specific test file
npx nightwatch --config ui-tests/amazonaws/nightwatch.conf.js tests/specific-test.js

# Run in headless mode
npx nightwatch --config ui-tests/amazonaws/nightwatch.conf.js --headless
```

## Configuration

Each test suite has its own Nightwatch configuration file:

- **AWS Tests**: `ui-tests/amazonaws/nightwatch.conf.js`
- **LinkedIn Tests**: `ui-tests/linkedinRegisterationPage/nightwatch.conf.js`
- **My Store Tests**: `ui-tests\myStore\nightwatch.conf.js`
- **API Tests**: `jest.config.js`


These configurations define:
- Browser settings
- Test environments
- Page object models
- Custom commands
- Reporter settings


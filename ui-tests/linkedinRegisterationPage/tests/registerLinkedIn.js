const userData = require('../data/userData.json');

module.exports = {
  'LinkedIn Registration Test': function (browser) {
    const registerPage = browser.page.linkedinRegisterPage();

    // Step 1. Open the page and verify page loaded
    registerPage
      .navigate()
      .waitForElementVisible('body', 5000)
      .assert.titleContains('LinkedIn');

    // Step 2. Click on Join Now
    registerPage
      .click('@joinNowBtn')
      .waitForElementVisible('@emailInput', 5000);

    // Step 3. Enter Email & Password
    registerPage
      .setValue('@emailInput', userData.email)
      .setValue('@passwordInput', userData.password);

    // Step 4. Click Agree & Join
    registerPage
      .click('@agreeJoinBtn')
      .waitForElementVisible('@firstNameInput', 5000);

    // Step 5. Enter First and Last Name
    registerPage
      .setValue('@firstNameInput', userData.firstName)
      .setValue('@lastNameInput', userData.lastName);

    // Step 6. Click Continue and assert security verification is shown
    registerPage
      .click('@continueBtn')
      .waitForElementVisible('@securityCheck', 10000)
      .assert.visible('@securityCheck');

    browser.end();
  }
};

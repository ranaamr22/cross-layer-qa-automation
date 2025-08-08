module.exports = {
  'Website Navigation Test': function(browser) {
    const homeUrl = 'http://s3-design-sample-site.s3-website-us-west-2.amazonaws.com/index.html';
    
    browser
      // Step 1: Open the page and verify page loaded
      .url(homeUrl)
      .waitForElementVisible('body', 10000)
      .assert.urlContains('index.html')
      .assert.visible('body')
      .perform(function() {
        console.log('✓ Step 1: Home page loaded successfully');
      })
      
      // Step 2: Navigate to Contact and assert contact page loaded
      .click('img[src*="contact1.gif"]')
      .pause(2000)
      .assert.urlContains('contact')
      .waitForElementVisible('body', 5000)
      .perform(function() {
        console.log('✓ Step 2: Contact page loaded successfully');
      })
      
      // Step 3: Click Back from browser and assert user at home page
      .back()
      .pause(2000)
      .assert.urlContains('index.html')
      .waitForElementVisible('body', 5000)
      .perform(function() {
        console.log('✓ Step 3: Successfully navigated back to home page');
      })
      .end();
  }
};

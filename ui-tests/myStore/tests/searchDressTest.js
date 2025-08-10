module.exports = {
  'Search for "dress" and verify results': function (browser) {
    const homePage = browser.page.homepage();

    homePage
      .navigate()
      .searchFor('dress')
      .waitForElementVisible('@productList');

    // Grab all product title elements
    homePage.api.elements('css selector', homePage.elements.productTitle.selector, function (result) {
      result.value.forEach((element) => {
        // Get element ID for WebDriver
        const elementId = element.ELEMENT || element['element-6066-11e4-a52e-4f735466cecf'];

        browser.elementIdAttribute(elementId, 'title', function (attr) {
          const title = attr.value;
          browser.assert.ok(
            title.toLowerCase().includes('dress'),
            `Expected product title "${title}" to contain "dress"`
          );
        });
      });
    });

    browser.end();
  }
};

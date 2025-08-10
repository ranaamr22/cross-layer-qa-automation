module.exports = {
  url: 'http://automationpractice.multiformis.com/index.php', 

  elements: {
    searchInput: {
      selector: 'input[name="search_query"]'
    },
    searchButton: {
      selector: 'button[name="submit_search"]'
    },
    productList: {
      selector: '.product_list'
    },
    productItem: {
      selector: '.product_list .product-container'
    },
    productTitle: {
      selector: '.product_list a.product-name'
    }
  },

  commands: [{
    searchFor(query) {
      return this
        .waitForElementVisible('@searchInput')
        .setValue('@searchInput', query)
        .click('@searchButton');
    }
  }]
};

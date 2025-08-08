module.exports = {
  url: 'https://www.linkedin.com/',
  elements: {
    joinNowBtn: 'a.nav__button-tertiary',
    emailInput: 'input#email-address',
    passwordInput: 'input#password',
    agreeJoinBtn: 'button.join-form__form-body-submit-button',
    firstNameInput: 'input#first-name',
    lastNameInput: 'input#last-name',
    continueBtn: 'button.join-form__form-body-submit-button',
    securityCheck: {
      selector: "//h2[@id='challenge-dialog-modal-header' and text()='Security verification']",
      locateStrategy: 'xpath'
    }
  }
}

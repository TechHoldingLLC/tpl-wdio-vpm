import Page from "./page.js";

class ProfileCardPage extends Page {
  /**
   * @description Gets the iframe element for the card input section.
   * @returns {WebdriverIO.Element} The iframe element containing the card input fields.
   */
  public get cardIframe() {
    return $("[name$='instamed']");
  }

  /**
   * @description Gets the credit card number input field.
   * @returns {WebdriverIO.Element} The credit card number input field.
   */
  public get cardNumberInput() {
    return $('//input[@name="CreditCardNumber"]');
  }

  /**
   * @description Gets the expiration date input field for the credit card.
   * @returns {WebdriverIO.Element} The expiration date input field.
   */
  public get expirationDateInput() {
    return $('//input[@data-componentid="FormPatientPayment_ExpDate"]');
  }

  /**
   * @description Gets the submit button for submitting the card details form.
   * @returns {WebdriverIO.Element} The submit button element.
   */
  public get submitButton() {
    return $(
      '//div[@data-componentid="FormPatientPayment_container"]/div/div[3]'
    );
  }

  /**
   * @description Adds the credit card details (card number and expiration date) and submits the form.
   * @param {string} cardNumber - The credit card number to be entered.
   * @param {string} expirationDate - The expiration date of the credit card.
   * @returns {Promise<void>} A promise that resolves after the form is submitted.
   */
  public async addCardDetails(
    cardNumber: string,
    expirationDate: string
  ): Promise<void> {
    await this.cardNumberInput.waitForClickable();
    await this.cardNumberInput.setValue(cardNumber);
    await this.expirationDateInput.waitForClickable();
    await this.expirationDateInput.setValue(expirationDate);
    await this.submitButton.waitForClickable();
    await this.submitButton.click();
  }

  /**
   * @description Gets the message element that displays after a card is successfully added.
   * @returns {WebdriverIO.Element} The success message element displayed after card addition.
   */
  public get cardAddMessage() {
    return $(
      "//div[@class='Toastify__toast-container Toastify__toast-container--top-right']"
    );
  }
}

export default new ProfileCardPage();

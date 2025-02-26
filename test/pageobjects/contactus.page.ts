import { $ } from "@wdio/globals";
import Page from "./page.js";

class ContactUs extends Page {
  // ---------- Locators ----------

  /**
   * Returns the 'Contact Us' link element on the page.
   */
  public get contactUslink() {
    return $(
      "//li[contains(@class,'Header')]/a[text()='Contact Us' or text()='Contáctenos']"
    );
  }

  /**
   * Returns the dropdown element for selecting a question or category.
   */
  public get selectQuestion() {
    return $("select");
  }

  /**
   * Returns the input field for 'First Name'.
   */
  public get firstNameField() {
    return $("#firstName");
  }

  /**
   * Returns the input field for 'Last Name'.
   */
  public get lastNameField() {
    return $("#lastName");
  }

  /**
   * Returns the input field for 'Email'.
   */
  public get emailField() {
    return $("#email");
  }

  /**
   * Returns the input field for 'Phone Number'.
   */
  public get phoneField() {
    return $("#phone");
  }

  /**
   * Returns the input field for the 'Description' or message.
   */
  public get descriptionField() {
    return $("#description");
  }

  /**
   * Returns the 'Submit' button element.
   */
  public get submitButton() {
    return $("//button[@type='submit']");
  }

  /**
   * Returns the success toast message element after a successful form submission.
   */
  public get contactToastmessage() {
    return $(
      "[class$='Toastify__toast Toastify__toast-theme--colored Toastify__toast--success Toastify__toast--close-on-click']"
    );
  }

  /**
   * Returns the error toast message element after an unsuccessful form submission.
   */
  public get contacterrormessage() {
    return $(
      "[class$='Toastify__toast Toastify__toast-theme--colored Toastify__toast--error Toastify__toast--close-on-click']"
    );
  }

  /**
   * Returns the banner heading element on the 'Contact Us' page.
   */
  public get contactUsBanner() {
    return $("h2");
  }

  /**
   * Returns the element indicating a problem on the 'Contact Us' form.
   */
  public get contactUsForProblem() {
    return $("//div[contains(@class,'ContactUs_contact-title-wrapper')]/div");
  }

  // ---------- Methods ----------

  /**
   * Selects a random option from the question/category dropdown.
   *
   * @param options - An array of option strings to select from.
   */
  private async selectRandomOption(options: string[]): Promise<void> {
    const randomIndex = Math.floor(Math.random() * options.length);
    const selectedOption = options[randomIndex];
    console.log(`Selecting '${selectedOption}' option for Contact Us form`);
    const optionElement = $(`[value$='${selectedOption}']`);
    await optionElement.click();
  }

  /**
   * Fills out and submits the 'Contact Us' form with valid data.
   *
   * @param firstname - User's first name.
   * @param lastname - User's last name.
   * @param contactnumber - User's contact number.
   * @param description - Description or message from the user.
   * @param language - Language preference ('en' for English, others for Spanish).
   */
  public async contactUsPage(
    firstname: string,
    lastname: string,
    contactnumber: number,
    description: string,
    language: string
  ): Promise<void> {
    const options =
      language === "en"
        ? [
            "Cancel Subscription",
            "How it Works",
            "Manage Account",
            "Medical Question",
            "Orders and Shipping",
            "Products",
            "Other",
          ]
        : [
            "Cancelar suscripción",
            "Cómo funciona",
            "Administrar cuenta",
            "Pregunta médica",
            "Pedidos y envíos",
            "Productos",
            "Otro",
          ];

    await this.selectRandomOption(options);

    // Fill out the form
    await this.firstNameField.setValue(firstname);
    await this.lastNameField.setValue(lastname);
    await this.emailField.setValue(
      `test_wdio_auto${Math.floor(Math.random() * 1e6)}@gmail.com`
    );
    await this.phoneField.setValue(contactnumber);
    await this.descriptionField.scrollIntoView();
    await this.descriptionField.setValue(description);
    await browser.pause(1000);
    await this.submitButton.click();
  }

  /**
   * Fills out and submits the 'Contact Us' form with invalid email data.
   *
   * @param firstname - User's first name.
   * @param lastname - User's last name.
   * @param invalid_email - Invalid email address to test form validation.
   * @param contactnumber - User's contact number.
   * @param description - Description or message from the user.
   * @param language - Language preference ('en' for English, others for Spanish).
   */
  public async contactUsPage_invalid(
    firstname: string,
    lastname: string,
    invalid_email: string,
    contactnumber: number,
    description: string,
    language: string
  ): Promise<void> {
    const options =
      language === "en"
        ? [
            "Cancel Subscription",
            "How it Works",
            "Manage Account",
            "Medical Question",
            "Orders and Shipping",
            "Products",
            "Other",
          ]
        : [
            "Cancelar suscripción",
            "Cómo funciona",
            "Administrar cuenta",
            "Pregunta médica",
            "Pedidos y envíos",
            "Productos",
            "Otro",
          ];

    await this.selectRandomOption(options);

    // Fill out the form with invalid email
    await this.firstNameField.setValue(firstname);
    await this.lastNameField.setValue(lastname);
    await this.emailField.setValue(invalid_email);
    await this.phoneField.setValue(contactnumber);
    await this.descriptionField.scrollIntoView();
    await this.descriptionField.setValue(description);
    await browser.pause(1000);
    await this.submitButton.click();
  }
}

export default new ContactUs();

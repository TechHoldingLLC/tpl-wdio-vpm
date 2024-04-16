import { $ } from "@wdio/globals";
import Page from "./page.js";

class ContactUs extends Page {
  public get selectQuestion() {
    return $("select");
  }

  public get firstNameField() {
    return $("#firstName");
  }

  public get lastNameField() {
    return $("#lastName");
  }

  public get emailField() {
    return $("#email");
  }

  public get phoneField() {
    return $("#phone");
  }
  public get descriptionField() {
    return $("#description");
  }

  public get submitButton() {
    return $("[type$='submit']");
  }

  public get contactToastmessage() {
    return $(
      "[class$='Toastify__toast Toastify__toast-theme--colored Toastify__toast--success Toastify__toast--close-on-click']"
    );
  }

  get contacterrormessage() {
    return $(
      "[class$='Toastify__toast Toastify__toast-theme--colored Toastify__toast--error Toastify__toast--close-on-click']"
    );
  }
  public async contactUsPage(
    firstname: string,
    lastname: string,
    contactnumber: number,
    description: string
  ) {
    const options = [
      "Cancel Subscription",
      "How it Works",
      "Manage Account",
      "Medical Question",
      "Orders and Shipping",
      "Products",
      "Other",
    ];
    function performClick(option: string): void {
      console.log(`Selecting ${option} option for Contact us form`);
    }
    const randomIndex = Math.floor(Math.random() * options.length);
    const selectedOption = options[randomIndex];
    performClick(selectedOption);
    const cu_value = $(`[value$='${selectedOption}`);
    await cu_value.click();

    await this.firstNameField.setValue(firstname);
    await this.lastNameField.setValue(lastname);
    await this.emailField.setValue(
      `test_wdio_auto${Math.floor(Math.random() * 1e6)}@gmail.com`
    );
    await this.phoneField.setValue(contactnumber);
    await this.descriptionField.setValue(description);
    await this.submitButton.click();
  }

  public async contactUsPage_invalid(
    firstname: string,
    lastname: string,
    invalid_email: string,
    contactnumber: number,
    description: string
  ) {
    const options = [
      "Cancel Subscription",
      "How it Works",
      "Manage Account",
      "Medical Question",
      "Orders and Shipping",
      "Products",
      "Other",
    ];
    function performClick(option: string): void {
      console.log(`Selecting ${option} option for Contact us form`);
    }
    const randomIndex = Math.floor(Math.random() * options.length);
    const selectedOption = options[randomIndex];
    performClick(selectedOption);
    const cu_value = $(`[value$='${selectedOption}`);
    await cu_value.click();

    await this.firstNameField.setValue(firstname);
    await this.lastNameField.setValue(lastname);
    await this.emailField.setValue(invalid_email);
    await this.phoneField.setValue(contactnumber);
    await this.descriptionField.setValue(description);
    await this.submitButton.click();
  }

  public openContactus() {
    return super.open("/en/contactus");
  }
}

export default new ContactUs();

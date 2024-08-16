import { $ } from "@wdio/globals";
import Page from "./page.js";

class ContactUs extends Page {
  public get contactUslink() {
    return $("//li[contains(@class,'Header')]/a[text()='Contact Us' or text()='Contáctenos']");
  }
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

  private async selectRandomOption(options: string[]): Promise<void> {
    const randomIndex = Math.floor(Math.random() * options.length);
    const selectedOption = options[randomIndex];
    console.log(`Selecting '${selectedOption}' option for Contact us form`);
    const cu_value = $(`[value$='${selectedOption}']`);
    await cu_value.click();
  }
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
    // Filling the form
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
    // Filling the form
    await this.firstNameField.setValue(firstname);
    await this.lastNameField.setValue(lastname);
    await this.emailField.setValue(invalid_email);
    await this.phoneField.setValue(contactnumber);
    await this.descriptionField.setValue(description);
    await this.submitButton.click();
  }

  public get contactUsBanner() {
    return $("h2");
  }

  public get contactUsForProblem() {
    return $("//div[contains(@class,'ContactUs_contact-title-wrapper')]/div");
  }
}

export default new ContactUs();

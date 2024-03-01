import { $ } from "@wdio/globals";
import Page from "./page";

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
    option: string,
    firstname: string,
    lastname: string,
    email: string,
    contactnumber: number,
    description: string
  ) {
    // const questionOption = $(`[value$='${question}']`);
    // await this.selectQuestion.click();
    // for (let j = 0; j < (await questionOption.length); j++) {
    //   const questiontext = await (await questionOption[j]).getText();
    //   if (questiontext !== "") {
    //     console.log("Link Text ::: ", linktext);
    //   }
    // }
    // await questionOption.click();

    await this.selectQuestion.selectByVisibleText(option);
    await this.firstNameField.setValue(firstname);
    await this.lastNameField.setValue(lastname);
    await this.emailField.setValue(email);
    await this.phoneField.setValue(contactnumber);
    await this.descriptionField.setValue(description);
    await this.submitButton.click();
  }

  public openContactus() {
    return super.open("/en/contactus");
  }
}

export default new ContactUs();

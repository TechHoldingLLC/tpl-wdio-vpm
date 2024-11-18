import { $ } from "@wdio/globals";
import Page from "./page.js";

class Signup extends Page {

  public get signUpLink() {
    return $("//a[text()='Sign Up' or text()='Únete']");
  }

  public get emailInput() {
    return $("#email");
  }

  public get passwordInput() {
    return $("#password");
  }
  
  public get confirmPasswordInput() {
    return $("#confirmPassword");
  }

  public get continueButton() {
    return $(".btn-primary btn-sm text-uppercase");
  }

  public get firstNameInput() {
    return $("#firstName");
  }

  public get lastNameInput() {
    return $("#lastName");
  }

  public get genderMaleOption() {
    return $("//label[@for='Male']");
  }

  public get genderFemaleOption() {
    return $("//label[@for='Female']");
  }

  public get mobileNumberInput() {
    return $("#phone");
  }

  public async signUp(email: string, password: string, firstName: string, lastName: string, mobileNumber: number): Promise<void> {
    await this.signUpLink.waitForClickable();
    await this.signUpLink.click();
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
    await this.confirmPasswordInput.setValue(password);
    await this.continueButton.click();
    await this.firstNameInput.waitForDisplayed();
    await this.firstNameInput.setValue(firstName);
    await this.lastNameInput.setValue(lastName);
    await this.genderMaleOption.click();
    await this.mobileNumberInput.setValue(mobileNumber);
    await this.continueButton.click();
  }

}

export default new Signup();

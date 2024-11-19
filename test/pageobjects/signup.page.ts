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
    return $("//*[@type='submit']");
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

  public get otpInput1() {
    return $("//*[@name='otpText1']");
  }

  public get otpInput2() {
    return $("//*[@name='otpText2']");
  }

  public get otpInput3() {
    return $("//*[@name='otpText3']");
  }

  public get otpInput4() {
    return $("//*[@name='otpText4']");
  }

  public get verifyOTP() {
    return $("//*[@class='btn-primary btn-sm mw-100 text-uppercase']");
  }

  public async signUp(email: string, password: string, firstName: string, lastName: string, mobileNumber: number): Promise<void> {
    await this.signUpLink.waitForClickable();
    await this.signUpLink.click();
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
    await this.confirmPasswordInput.setValue(password);
    browser.pause(1500);
    await this.continueButton.click();
    await this.firstNameInput.waitForDisplayed();
    await this.firstNameInput.setValue(firstName);
    await this.lastNameInput.setValue(lastName);
    await this.genderMaleOption.click();
    await this.mobileNumberInput.setValue(mobileNumber);
    browser.pause(1500);
    await this.continueButton.click();
    browser.pause(1500);
    await this.otpInput1.setValue(1);
    await this.otpInput2.setValue(2);
    await this.otpInput3.setValue(3);
    await this.otpInput4.setValue(4);
    await this.verifyOTP.click();
  }
}

export default new Signup();

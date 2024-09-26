import { $ } from "@wdio/globals";
import Page from "./page.js";

class LoginPage extends Page {
  /**
   * @description Selector for the sign-in button on the login page.
   * @returns {WebdriverIO.Element} The sign-in button element.
   */
  get signinButton() {
    return $(
      "//a[@class='btn-primary text-uppercase btn-sm Header_btn-signin__3W_xI']"
    );
  }

  /**
   * @description Selector for the sign-out button on the page.
   * @returns {WebdriverIO.Element} The sign-out button element.
   */
  public get signOutButton() {
    return $(".btn-secondary.btn-sm.btn-square.Header_btn-logout__9iZ0I");
  }

  /**
   * @description Selector for the username input field.
   * @returns {WebdriverIO.Element} The username input element.
   */
  get inputUsername() {
    return $("#userName");
  }

  /**
   * @description Selector for the password input field.
   * @returns {WebdriverIO.Element} The password input element.
   */
  get inputPassword() {
    return $("#password");
  }

  /**
   * @description Selector for the submit button in the login form.
   * @returns {WebdriverIO.Element} The submit button element.
   */
  get btnSubmit() {
    return $("input[type='submit']");
  }

  /**
   * @description Selector for the alert message displayed on invalid login.
   * @returns {WebdriverIO.Element} The invalid alert element.
   */
  get invalidAlert() {
    return $(
      '//div[@class="Toastify__toast Toastify__toast-theme--colored Toastify__toast--error Toastify__toast--close-on-click"]'
    );
  }

  /**
   * @description Selector for the hamburger icon used for mobile navigation.
   * @returns {WebdriverIO.Element} The hamburger icon element.
   */
  get hamburgericon() {
    return $("//a[contains(@class, 'btn-rounded Header_btn-user')]");
  }

  /**
   * @description Selector for the profile name displayed after login.
   * @returns {WebdriverIO.Element} The profile name element.
   */
  get profile_name() {
    return $("//h4[contains(@class,'Header_user-name')]");
  }

  /**
   * @description Selector for the sign-up success message displayed as a toast notification.
   * @returns {WebdriverIO.Element} The success toast element.
   */
  get signupsuccess() {
    return $(
      "[class$='Toastify__toast Toastify__toast-theme--colored Toastify__toast--success Toastify__toast--close-on-click']"
    );
  }

  /**
   * @description Selector for all the links on the login page.
   * @returns {WebdriverIO.ElementArray} Array of link elements.
   */
  get links() {
    return $$("//a");
  }

  /**
   * @description Selector for the validation message displayed for the required mobile or email field.
   * @returns {WebdriverIO.Element} The validation message element.
   */
  public get requiredFieldvalidationMessageForMobileOrEmail() {
    return $(
      "(//div[contains(@class,'postal-code-error TextError_errorText')])[1]"
    );
  }

  /**
   * @description Selector for the validation message displayed for the required password field.
   * @returns {WebdriverIO.Element} The validation message element.
   */
  public get requiredFieldvalidationMessageForPassword() {
    return $(
      "(//div[contains(@class,'postal-code-error TextError_errorText')])[2]"
    );
  }

  /**
   * @description Performs login using the provided username and password.
   * @param {string} username - The username (email or mobile number).
   * @param {string} password - The password for the login.
   * @returns {Promise<void>}
   */
  public async login(username: string, password: string): Promise<void> {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await browser.pause(1000); // Optional pause to allow UI transition.
    await this.btnSubmit.click();
  }

  /**
   * @description Performs login using a cell number and password.
   * @param {number} cellNum - The cell number to be used for login.
   * @param {string} password - The password for the login.
   * @returns {Promise<void>}
   */
  public async login_with_cellnum(
    cellNum: number,
    password: string
  ): Promise<void> {
    await this.inputUsername.setValue(cellNum);
    await this.inputPassword.setValue(password);
    await browser.pause(2000); // Optional pause to allow UI transition.
    await this.btnSubmit.click();
  }
}

export default new LoginPage();

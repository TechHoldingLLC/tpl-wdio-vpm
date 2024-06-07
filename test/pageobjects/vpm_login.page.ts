import { $ } from "@wdio/globals";
import Page from "./page.js";

class LoginPage extends Page {
  get signinButton() {
    return $(".btn-primary.text-uppercase.btn-sm.Header_btn-signin__3W_xI");
  }

  public get signOutButton() {
    return $(".btn-secondary.btn-sm.btn-square.Header_btn-logout__9iZ0I");
  }

  get inputUsername() {
    return $("#userName");
  }

  get inputPassword() {
    return $("#password");
  }
  get btnSubmit() {
    return $("input[type='submit']");
  }
  get invalidAlert() {
    return $(".Toastify__toast-body");
  }
  get hamburgericon() {
    return $("//a[contains(@class, 'btn-rounded Header_btn-user')]");
  }

  get profile_name() {
    return $("//h4[contains(@class,'Header_user-name')]");
  }
  get signupsuccess() {
    return $(
      "[class$='Toastify__toast Toastify__toast-theme--colored Toastify__toast--success Toastify__toast--close-on-click']"
    );
  }
  get links() {
    return $$("//a");
  }

  public get requiredFieldvalidationMessageForMobileOrEmail() {
    return $(
      "(//div[contains(@class,'postal-code-error TextError_errorText')])[1]"
    );
  }

  public get requiredFieldvalidationMessageForPassword() {
    return $(
      "(//div[contains(@class,'postal-code-error TextError_errorText')])[2]"
    );
  }

  public async login(username: string, password: string, env?: string) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }

  public async login_with_cellnum(cellNum: number, password: string) {
    await this.inputUsername.setValue(cellNum);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }
}

export default new LoginPage();

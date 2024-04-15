import { $ } from "@wdio/globals";
import Page from "./page.js";

class LoginPage extends Page {
  get signinButton() {
    return $(
      '[class$="btn-primary text-uppercase btn-sm Header_btn-signin__3W_xI"]'
    );
  }

  get inputUsername() {
    return $("#userName");
  }
  get inputPassword() {
    return $("#password");
  }
  get btnSubmit() {
    return $('[value$="SIGN IN"]');
  }
  get invalidAlert() {
    return $(
      ".Toastify__toast-body"
      // "[style$='display: flex; flex-grow: 1; font-size: 15px; padding: 8px 12px;']""
    );
  }
  get hamburgericon() {
    //return $("[class$='btn-rounded Header_btn-user__RSRGo']");
    return $("//a[contains(@class, 'btn-rounded Header_btn-user')]")
  }

  get profile_name() {
    return $("//h4[@class='Header_user-name__61MdT']");
  }
  get signupsuccess() {
    return $(
      "[class$='Toastify__toast Toastify__toast-theme--colored Toastify__toast--success Toastify__toast--close-on-click']"
    );
  }
  get elements() {
    return $$("//a");
  }

  public async login(username: string, password: string) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }

  public async login_with_cellnum(cellNum: number, password: string) {
    await this.inputUsername.setValue(cellNum);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }

  public openSignin() {
    return super.open("/en/auth/signin");
  }
}

export default new LoginPage();

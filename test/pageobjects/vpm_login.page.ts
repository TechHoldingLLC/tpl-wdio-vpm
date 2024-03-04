import { $ } from "@wdio/globals";
import Page from "./page";

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
    return $('[value$="Sign In"]');
  }
  get invalidAlert() {
    return $(
      ".Toastify__toast-body"
      // "[style$='display: flex; flex-grow: 1; font-size: 15px; padding: 8px 12px;']""
    );
  }
  get hamburgericon() {
    return $("[class$='btn-rounded Header_btn-user__RSRGo']");
  }
  get signupsuccess() {
    return $(
      "[class$='Toastify__toast Toastify__toast-theme--colored Toastify__toast--success Toastify__toast--close-on-click']"
    );
  }
  get elements() {
    return $$("//a");
  }

  async login(username: string, password: string) {
    //await this.signinButton.click();
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }

  public openSignin() {
    return super.open("/en/auth/signin");
  }
}

export default new LoginPage();

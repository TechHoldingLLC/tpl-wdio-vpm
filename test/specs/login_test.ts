import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/vpm_login.page";
import logindata from "../data/login.json";

describe("VPM Login Feature", () => {
  beforeEach("Verify Sign In Page", async () => {
    await LoginPage.openSignin();
    await browser.maximizeWindow();
  });

  it("Verify Login with Invalid credentials - TC01", async () => {
    await expect(LoginPage.inputUsername).toBeDisplayed();
    await LoginPage.login(
      logindata.login_invalid.login_email,
      logindata.login_invalid.login_password
    );
    await browser.waitUntil(
      async () =>
        (await LoginPage.invalidAlert.getText()) ===
        logindata.login_toastMessage
    );
    await expect(LoginPage.invalidAlert).toHaveText(
      logindata.login_toastMessage
    );
  });

  it("Verify Login with Valid credentials - TC02", async () => {
    await expect(LoginPage.inputUsername).toBeDisplayed();
    await LoginPage.login(
      logindata.login_valid.login_email,
      logindata.login_valid.login_password
    );
    await expect(LoginPage.hamburgericon).toBeDisplayed();
  });
});

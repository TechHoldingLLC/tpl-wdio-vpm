import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/vpm_login.page";
import logindata from "../data/login.json";

describe("VPM Login Feature", () => {
  beforeEach("Open Sign In Page", async () => {
    await LoginPage.openSignin();
  });

  it("Login with Invalid credentials - TC01", async () => {
    await LoginPage.login(logindata.invalid.email, logindata.invalid.password);
    await browser.pause(3000);
    await browser.waitUntil(
      async () =>
        (await LoginPage.invalidAlert.getText()) === logindata.toastMessage
    );
    await browser.pause(3000);
    await expect(LoginPage.invalidAlert).toHaveText(logindata.toastMessage);
  });

  it("Login with Valid credentials - TC02", async () => {
    await LoginPage.login(logindata.valid.email, logindata.valid.password);
    await browser.pause(3000);
    // await expect(LoginPage.loginsuccess).toHaveText(logindata.successMessage);
    // await browser.pause(3000);
    await expect(LoginPage.hamburgericon).toBeDisplayed();
    await browser.pause(1000);
  });
});

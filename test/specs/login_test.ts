import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/vpm_login.page";
import logindata from "../data/login.json";

describe("VPM Login Feature", () => {
  beforeEach("Verify Sign In Page", async () => {
    await LoginPage.openSignin();
    await browser.maximizeWindow();
  });

  it("Verify Login with Invalid credentials - TC01", async () => {
    await browser.pause(3000);
    await LoginPage.login(logindata.invalid.email, logindata.invalid.password);
    await browser.waitUntil(
      async () =>
        (await LoginPage.invalidAlert.getText()) === logindata.toastMessage
    );
    await expect(LoginPage.invalidAlert).toHaveText(logindata.toastMessage);
  });

  it("Verify Login with Valid credentials - TC02", async () => {
    await browser.pause(3000);
    await LoginPage.login(logindata.valid.email, logindata.valid.password);
    await browser.pause(3000);
    await expect(LoginPage.hamburgericon).toBeDisplayed();
  });
});

import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/vpm_login.page.js";
import * as fs from 'fs';

describe("VPM Login Feature", () => {
  // Declare logindata variable with types
  let logindata: any

  beforeEach(async () => {
    await LoginPage.openSignin();
    await browser.maximizeWindow();
  });

  before(async ()=>{
    const rawData = fs.readFileSync('./test/data/login.json', 'utf-8');
    logindata = JSON.parse(rawData);
  })

  it("Verify Login with Invalid credentials - TC08", async () => {
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

  it("Verify Login with Valid Email - TC16", async () => {
    await expect(LoginPage.inputUsername).toBeDisplayed();
    await LoginPage.login(
      logindata.login_valid.login_email,
      logindata.login_valid.login_password
    );
    await expect(LoginPage.hamburgericon).toBeDisplayed();
    await LoginPage.hamburgericon.click();
    await expect(LoginPage.profile_name).toHaveText(logindata.login_userName);
  });

  it("Verify Login with Invalid Cell number - TC17", async () => {
    await expect(LoginPage.inputUsername).toBeDisplayed();
    await LoginPage.login_with_cellnum(
      logindata.login_invalid.login_invalid_phone_num,
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

  it("Verify Login with Valid Cell Number - TC18", async () => {
    await expect(LoginPage.inputUsername).toBeDisplayed();
    await LoginPage.login_with_cellnum(
      logindata.login_valid.login_valid_phone_num,
      logindata.login_valid.login_password
    );
    await expect(LoginPage.hamburgericon).toBeDisplayed();
    await LoginPage.hamburgericon.click();
    await expect(LoginPage.profile_name).toHaveText(logindata.login_userName);
  });
});

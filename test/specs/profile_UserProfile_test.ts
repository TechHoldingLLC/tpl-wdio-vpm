import LoginPage from "../pageobjects/vpm_login.page.js";
import fs from "fs";
import homePage from "../pageobjects/home.page.js";
import profilesidemenuPage from "../pageobjects/profilesidemenu.page.js";
import profilePage from "../pageobjects/profile.page.js";

describe("Customer Profile page", () => {
  before(async () => {
    await browser.url("");
    await browser.pause(2000);
    await LoginPage.signinButton.click();
    await browser.pause(2000);
  });

  it("C29663 Profile: Verify User Profile page has user detail", async () => {
    const logindata = JSON.parse(
      fs.readFileSync("./test/data/login.json", "utf-8")
    );
    const url: string = await browser.getUrl();

    let loginData: any;
    if (url.includes("qa")) {
      loginData = logindata.login_valid;
    } else if (url.includes("stage")) {
      loginData = logindata.stage_login_valid;
    } else {
      loginData = logindata.prod_login_valid;
    }
    await LoginPage.login(loginData.login_email, loginData.login_password);
    await homePage.aboutUs.waitForDisplayed();
    expect(await homePage.aboutUs.isDisplayed()).toBe(true);

    await browser.pause(2500);
    await profilesidemenuPage.profileOption.click();
    await browser.pause(2000);
    await profilePage.profileSettings.waitForDisplayed();
    await browser.pause(2000);

    // Verify Profile Settings page elements based on language
    const expectedProfileSettingsText = url.includes("en")
      ? "Profile Settings"
      : "Configuración de perfil";
    expect(await profilePage.profileSettings.getText()).toEqual(
      expectedProfileSettingsText
    );
    const expectedUserDetailsText = url.includes("en")
      ? "User Details"
      : "Detalles del Usuario";
    expect(await profilePage.userDetails.getText()).toEqual(
      expectedUserDetailsText
    );
    const expectedCredentialsText = url.includes("en")
      ? "Credentials"
      : "Credenciales";
    expect(await profilePage.credentials.getText()).toEqual(
      expectedCredentialsText
    );

    try {
      const expectedEmail = loginData.login_email;
      const emailValue: string = await profilePage.emailInput.getAttribute(
        "value"
      );
      expect(emailValue).toEqual(expectedEmail);
    } catch (error) {
      console.error("Error occurred while retrieving email value:", error);
      throw error;
    }
  });
});

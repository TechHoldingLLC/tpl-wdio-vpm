import LoginPage from "../pageobjects/vpm_login.page.js";
import fs from "fs";
import homePage from "../pageobjects/home.page.js";
import vpm_loginPage from "../pageobjects/vpm_login.page.js";
import profilesidemenuPage from "../pageobjects/profilesidemenu.page.js";
import profilePage from "../pageobjects/profile.page.js";

describe("Customer Profile page", () => {
  before(async () => {
    await LoginPage.openSignin();
  });

  it("C29663 Profile: Verify User Profile page has user detail", async () => {
    const logindata = JSON.parse(
      fs.readFileSync("./test/data/login.json", "utf-8")
    );
    const url: string = await browser.getUrl();
    const language: string = await profilePage.getLanguageFromUrl(url);
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
    await vpm_loginPage.hamburgericon.waitForClickable();
    await vpm_loginPage.hamburgericon.click();

    await browser.pause(2500);
    await profilesidemenuPage.profileOption.click();
    await browser.pause(3000);
    await profilePage.profileSettings.waitForDisplayed();

    // Verify Profile Settings page elements based on language
    const expectedProfileSettingsText =
      language === "en" ? "Profile Settings" : "Configuración de perfil";
    const expectedUserDetailsText =
      language === "en" ? "User Details" : "Detalles del Usuario";
    const expectedCredentialsText =
      language === "en" ? "Credentials" : "Credenciales";

    expect(await profilePage.profileSettings.getText()).toEqual(
      expectedProfileSettingsText
    );
    expect(await profilePage.userDetails.getText()).toEqual(
      expectedUserDetailsText
    );
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

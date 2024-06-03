import LoginPage from "../pageobjects/vpm_login.page.js";
import fs from "fs";
import homePage from "../pageobjects/home.page.js";
import vpm_loginPage from "../pageobjects/vpm_login.page.js";
import profilesidemenuPage from "../pageobjects/profilesidemenu.page.js";

describe("Customer Profile - Subscription menu redirection", () => {
  before(async () => {
    await LoginPage.openSignin();
  });

  it("C29661 Profile: Verify viewing Subscription Listing Details page", async () => {
    const loginDataPath: string = "./test/data/login.json";
    let selectedLoginData: any;

    try {
      const logindata = JSON.parse(fs.readFileSync(loginDataPath, "utf-8"));
      const url: string = await browser.getUrl();
      const language: string = await profilesidemenuPage.getLanguageFromUrl(
        url
      );

      // Select the appropriate login data based on the environment
      if (url.includes("qa")) {
        selectedLoginData = logindata.login_valid;
      } else if (url.includes("stage")) {
        selectedLoginData = logindata.stage_login_valid;
      } else {
        selectedLoginData = logindata.prod_login_valid;
      }
      await LoginPage.login(
        selectedLoginData.login_email,
        selectedLoginData.login_password
      );
      await browser.pause(2000);
      await homePage.aboutUs.waitForDisplayed();
      expect(await homePage.aboutUs.isDisplayed()).toBe(true);
      // await vpm_loginPage.hamburgericon.waitForClickable();
      // await vpm_loginPage.hamburgericon.click();

      await browser.pause(4000);
      await profilesidemenuPage.subscriptionOption.click();
      await browser.pause(12000);
      await expect(profilesidemenuPage.subscriptionPage).toBeDisplayed();
      const subscriptionPageText: string =
        await profilesidemenuPage.subscriptionPage.getText();
      console.log(`Subscription Page text is "${subscriptionPageText}"`);

      // Define the expected subscription page text based on the language
      const expectedSubscriptionText =
        language === "en" ? "Subscriptions" : "Suscripciones";

      // Verify that the subscription page text matches the expected text
      expect(subscriptionPageText).toEqual(expectedSubscriptionText);

      // Log the subscription count for the user
      const subscriptionCount =
        await profilesidemenuPage.getSubscriptionsCount();
      console.log(`Subscription Count for the user is: "${subscriptionCount}"`);
    } catch (error) {
      console.error(
        "Error occurred while verifying subscription menu redirection:",
        error
      );
      throw error;
    }
  });
});

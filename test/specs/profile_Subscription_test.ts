// Test Case: Profile: Verify viewing Subscription Listing Details page (C29661)
// Description: This test verifies the redirection to the subscription page from the profile menu and checks
// whether the subscription details and page title are displayed correctly based on the language setting.

import LoginPage from "../pageobjects/login.page.js";
import fs from "fs";
import homePage from "../pageobjects/home.page.js";
import profilesidemenuPage from "../pageobjects/profilesidemenu.page.js";

describe("Customer Profile - Subscription Menu Redirection", () => {
  let selectedLoginData: any; // Stores the appropriate login data based on environment

  // Pre-condition: Navigate to the homepage and prepare login before the tests
  before(async () => {
    // Open the application URL and perform initial steps to sign in
    await browser.url("");
    await browser.pause(2000); // Allow some time for the page to load
    await LoginPage.signinButton.click();
    await browser.pause(2000); // Wait for the sign-in process to be ready
  });

  // Test Case: Verify the subscription listing details page and redirection
  it("C29661 Profile: Verify viewing Subscription Listing Details page", async () => {
    const loginDataPath: string = "./test/data/loginData.json"; // Path to login data file

    try {
      // Load login data from the JSON file
      const logindata = JSON.parse(fs.readFileSync(loginDataPath, "utf-8"));
      const url: string = await browser.getUrl(); // Get the current URL
      const language: string = await profilesidemenuPage.getLanguageFromUrl(
        url
      ); // Get the language from the URL

      // Select login data based on the environment (QA, Stage, Prod)
      if (url.includes("qa")) {
        selectedLoginData = logindata.login_valid; // QA login credentials
      } else if (url.includes("stage")) {
        selectedLoginData = logindata.stage_login_valid; // Stage login credentials
      } else {
        selectedLoginData = logindata.prod_login_valid; // Production login credentials
      }

      // Perform login with the selected credentials
      await LoginPage.login(
        selectedLoginData.login_email,
        selectedLoginData.login_password
      );
      await browser.pause(2000); // Pause to ensure the login completes

      // Ensure the homepage is displayed after login
      await homePage.aboutUs.waitForDisplayed();
      expect(await homePage.aboutUs.isDisplayed()).toBe(true);

      // Navigate to the subscription page via the profile side menu
      await browser.pause(4000); // Pause for a smooth transition to the side menu
      await profilesidemenuPage.subscriptionOption.click();
      await browser.pause(50000); // Wait for the subscription page to load fully

      // Verify that the subscription page title is displayed
      await expect(profilesidemenuPage.pageTitle).toBeDisplayed();
      const subscriptionPageText: string =
        await profilesidemenuPage.pageTitle.getText();
      console.log(`Subscription Page text is "${subscriptionPageText}"`);

      // Define the expected subscription page text based on the language setting
      const expectedSubscriptionText =
        language === "en" ? "Subscriptions" : "Suscripciones";

      // Assert that the subscription page title matches the expected title
      expect(subscriptionPageText).toEqual(expectedSubscriptionText);

      // Log the number of subscriptions available for the user
      const subscriptionCount =
        await profilesidemenuPage.getSubscriptionsCount();
      console.log(`Subscription Count for the user is: "${subscriptionCount}"`);
    } catch (error) {
      // Catch and log any errors that occur during test execution
      console.error(
        "Error occurred while verifying subscription menu redirection:",
        error
      );
      throw error;
    }
  });
});

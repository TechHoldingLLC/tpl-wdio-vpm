// Test Case: Profile: Verify User Profile page has user details (C29663)
// Description: This test case verifies that the user profile page displays the correct user details such as profile settings, user details, and email credentials based on the language setting.

import LoginPage from "../pageobjects/login.page.js";
import fs from "fs";
import homePage from "../pageobjects/home.page.js";
import profilesidemenuPage from "../pageobjects/profilesidemenu.page.js";
import profilePage from "../pageobjects/profile.page.js";

describe("Customer Profile page", () => {
  // Pre-condition: Navigate to the application and login before executing the tests
  before(async () => {
    // Open the base URL and navigate to the login page
    await browser.url("");
    await browser.pause(2000); // Pause to allow page to load
    await LoginPage.signinButton.click(); // Click on the Sign In button
    await browser.pause(2000); // Pause for login modal to load
  });

  // Test Case: Verify the user details and profile settings on the Profile page
  it("C29663 Profile: Verify User Profile page has user detail", async () => {
    // Load login data from the JSON file
    const logindata = JSON.parse(
      fs.readFileSync("./test/data/loginData.json", "utf-8")
    );
    const url: string = await browser.getUrl(); // Retrieve the current URL

    // Select the appropriate login credentials based on the environment (QA, Stage, Prod)
    let loginData: any;
    if (url.includes("qa")) {
      loginData = logindata.login_valid;
    } else if (url.includes("stage")) {
      loginData = logindata.stage_login_valid;
    } else {
      loginData = logindata.prod_login_valid;
    }

    // Perform login using the selected credentials
    await LoginPage.login(loginData.login_email, loginData.login_password);
    await homePage.aboutUs.waitForDisplayed(); // Verify the home page is loaded post login
    expect(await homePage.aboutUs.isDisplayed()).toBe(true); // Assert the "About Us" section is displayed

    await browser.pause(2500); // Pause before navigating to Profile
    await profilesidemenuPage.profileOption.click(); // Navigate to Profile page via the side menu
    await browser.pause(2000); // Pause to load Profile page

    // Ensure Profile Settings section is displayed
    await profilePage.profileSettings.waitForDisplayed();
    await browser.pause(2000); // Pause to allow Profile Settings to load

    // Verify Profile Settings elements based on language preference
    const expectedProfileSettingsText = url.includes("en")
      ? "Profile Settings"
      : "Configuración de perfil";
    expect(await profilePage.profileSettings.getText()).toEqual(
      expectedProfileSettingsText
    );

    // Verify User Details section based on the language
    const expectedUserDetailsText = url.includes("en")
      ? "User Details"
      : "Detalles del Usuario";
    expect(await profilePage.userDetails.getText()).toEqual(
      expectedUserDetailsText
    );

    // Verify Credentials section based on the language
    const expectedCredentialsText = url.includes("en")
      ? "Credentials"
      : "Credenciales";
    expect(await profilePage.credentials.getText()).toEqual(
      expectedCredentialsText
    );

    // Verify if the displayed email matches the login email
    try {
      const expectedEmail = loginData.login_email; // Expected email from login data
      const emailValue: string = await profilePage.emailInput.getAttribute(
        "value"
      ); // Get the value of the email input field
      expect(emailValue).toEqual(expectedEmail); // Assert that email matches
    } catch (error) {
      // Handle any error during email retrieval and log it
      console.error("Error occurred while retrieving email value:", error);
      throw error; // Throw error to fail the test case if the check fails
    }
  });
});

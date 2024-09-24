// Test Case: Profile: Verify adding Shipping Address Flow (C29659)
// Description: This test case verifies the functionality of adding a new shipping address to the user's profile
// on the Shipping Address page. It checks if the correct toast message is displayed after successfully adding the address.

import ProfileShipping from "../pageobjects/ProfileShippingAddress.page.js";
import LoginPage from "../pageobjects/login.page.js";
import fs from "fs";

describe("Profile Features - Shipping Address", () => {
  let shippingData: any; // Stores shipping address test data
  let logindata: any; // Stores login credentials for different environments

  // Pre-condition: Load login data and shipping address data before tests
  before(async () => {
    // Navigate to the homepage and click on the sign-in button
    await browser.url("");
    await browser.pause(2000);
    await LoginPage.signinButton.click();
    await browser.pause(2000);

    // Read the shipping address data and login credentials from the respective JSON files
    shippingData = JSON.parse(
      fs.readFileSync("./test/data/profileShippingData.json", "utf-8")
    );
    logindata = JSON.parse(
      fs.readFileSync("./test/data/loginData.json", "utf-8")
    );
  });

  // Test Case: Verify adding a shipping address and validation of success message
  it("C29659 Profile: Verify adding Shipping Address Flow", async () => {
    // Get the current URL and determine the language setting from the URL
    const url: string = await browser.getUrl();
    const language: string = await ProfileShipping.getLanguageFromUrl(url);

    // Determine the login credentials based on the environment (QA, Stage, Production)
    let loginData: any;
    if (url.includes("qa")) {
      loginData = logindata.login_valid; // QA environment credentials
    } else if (url.includes("stage")) {
      loginData = logindata.stage_login_valid; // Stage environment credentials
    } else {
      loginData = logindata.prod_login_valid; // Production environment credentials
    }

    // Perform the login using the selected credentials
    await LoginPage.login(loginData.login_email, loginData.login_password);
    await browser.pause(5000); // Wait for the login process to complete

    // Call the function to add a new shipping address
    await ProfileShipping.addShippingAddress();

    // Define the expected success message based on the language setting
    const expectedSuccessToastMessage: string =
      language === "en"
        ? shippingData.shipping_address_success_message
        : shippingData.shipping_address_success_message_es;

    // Assert that the success toast message is displayed with the correct text
    expect(await ProfileShipping.ship_success_toast_message).toHaveText(
      expectedSuccessToastMessage
    );
  });
});

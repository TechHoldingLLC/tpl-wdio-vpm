// Test Case: Sign In: Verifying various login scenarios (C29652, C29650, C29651)
// Description: This test suite covers different Sign In scenarios for the application including invalid credentials (email, mobile, password) and successful login with valid credentials.

import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/login.page.js";
import fs from "fs";
import allureReporter from "@wdio/allure-reporter";

describe("VPM Sign In Features", () => {
  let logindata: any;

  // Pre-condition: Load the login data from a JSON file
  before(async () => {
    logindata = JSON.parse(
      fs.readFileSync("./test/data/loginData.json", "utf-8")
    );
    allureReporter.addFeature("Sign In Features");
    allureReporter.addStory("Load login data from JSON file");
    allureReporter.addStep("Loaded login data from JSON file");
  });

  // Pre-condition for each test: Navigate to login page and open Sign In modal
  beforeEach(async () => {
    await browser.url(""); // Open the base URL
    await browser.pause(4000);
    allureReporter.addStep("Navigated to the base URL");

    await LoginPage.signinButton.click(); // Click the Sign In button
    await browser.pause(2000); // Wait for login modal to appear
    allureReporter.addStep("Clicked the Sign In button and waited for the login modal to appear");
  });

  // Test Case: C29652 - Verify User unable to Sign In with invalid email, mobile, or password
  it("C29652 Sign In: Verify User unable to Sign In with invalid email, mobile, or password", async () => {
    // Ensure the input fields are displayed
    await expect(LoginPage.inputUsername).toBeDisplayed();
    allureReporter.addStep("Verified the input fields are displayed");

    // Get current URL and language preference from URL
    const url: string = await browser.getUrl();
    const language: string = await LoginPage.getLanguageFromUrl(url);
    allureReporter.addStep("Retrieved the current page URL and determined the language");

    // Expected validation messages based on language
    const expectedEmailFieldValidationMessage =
      language === "en"
        ? logindata.login_email_required_message
        : logindata.login_email_required_message_es;
    const expectedPasswordFieldValidationMessage =
      language === "en"
        ? logindata.login_password_required_message
        : logindata.login_password_required_message_es;
    await browser.pause(2000);

    // Attempt to login without entering username & password
    await LoginPage.btnSubmit.click();
    allureReporter.addStep("Attempted to login without entering username & password");

    const emailFieldValidationMessage: string =
      await LoginPage.requiredFieldvalidationMessageForMobileOrEmail.getText();
    const passwordFieldValidationMessage: string =
      await LoginPage.requiredFieldvalidationMessageForPassword.getText();
    expect(emailFieldValidationMessage).toEqual(
      expectedEmailFieldValidationMessage
    );
    expect(passwordFieldValidationMessage).toEqual(
      expectedPasswordFieldValidationMessage
    );
    allureReporter.addStep("Verified validation messages for email and password fields");

    // Attempt to login with invalid credentials
    const loginData = logindata.login_invalid;
    const expectedToastMessage: string =
      language === "en"
        ? logindata.login_toastMessage
        : logindata.login_toastMessage_es;

    await LoginPage.login(loginData.login_email, loginData.login_password);
    allureReporter.addStep("Attempted to login with invalid credentials");

    await LoginPage.invalidAlert.waitForDisplayed();
    const actualToastMessage = await LoginPage.invalidAlert.getText();
    expect(actualToastMessage).toEqual(expectedToastMessage);
    allureReporter.addStep("Verified the toast message for invalid credentials");

    // Refresh and verify toast message when logging in with invalid mobile number
    await browser.refresh();
    await expect(LoginPage.inputUsername).toBeDisplayed();
    await LoginPage.login_with_cellnum(
      loginData.login_invalid_phone_num,
      loginData.login_password
    );
    await LoginPage.invalidAlert.waitForDisplayed({ timeout: 3000 });
    const invalidMobileToastMessage = await LoginPage.invalidAlert.getText();
    expect(invalidMobileToastMessage).toEqual(expectedToastMessage);
    allureReporter.addStep("Verified the toast message for invalid mobile number");
  });

  // Test Case: C29650 - Verify User Sign In with valid email and password
  it("C29650 Sign In: Verify User Sign In with valid email and password", async () => {
    const url: string = await browser.getUrl();
    await expect(LoginPage.inputUsername).toBeDisplayed();
    allureReporter.addStep("Verified the input fields are displayed");

    // Select login credentials based on environment (QA, Stage, Prod)
    let loginData: any;
    let expectedUserName: string;
    if (url.includes("qa")) {
      loginData = logindata.login_valid;
      expectedUserName = logindata.login_userName;
    } else if (url.includes("stage")) {
      loginData = logindata.stage_login_valid;
      expectedUserName = logindata.stage_login_userName;
    } else {
      loginData = logindata.prod_login_valid;
      expectedUserName = logindata.prod_login_userName;
    }
    allureReporter.addStep("Selected login credentials based on environment");

    // Perform login and validate the displayed user name
    await LoginPage.inputUsername.waitForDisplayed({ timeout: 3000 });
    await LoginPage.login(loginData.login_email, loginData.login_password);
    allureReporter.addStep("Performed login with valid email and password");

    await expect(LoginPage.profile_name).toHaveText(expectedUserName);
    allureReporter.addStep("Verified the displayed user name after login");

    // Sign out after successful login
    await LoginPage.signOutButton.click();
    await browser.pause(2000);
    allureReporter.addStep("Signed out after successful login");
  });

  // Test Case: C29651 - Verify User Sign In with valid mobile number and password
  it("C29651 Sign In: Verify User Sign In with valid mobile and password", async () => {
    const url: string = await browser.getUrl();
    await expect(LoginPage.inputUsername).toBeDisplayed();
    allureReporter.addStep("Verified the input fields are displayed");

    // Select login credentials based on environment (QA, Stage, Prod)
    let loginData: any;
    let expectedUserName: string;
    if (url.includes("qa")) {
      loginData = logindata.login_valid;
      expectedUserName = logindata.login_userName;
    } else if (url.includes("stage")) {
      loginData = logindata.stage_login_valid;
      expectedUserName = logindata.stage_login_userName;
    } else {
      loginData = logindata.prod_login_valid;
      expectedUserName = logindata.prod_login_userName;
    }
    allureReporter.addStep("Selected login credentials based on environment");

    // Perform login with mobile number and validate the displayed user name
    await LoginPage.login_with_cellnum(
      loginData.login_valid_phone_num,
      loginData.login_password
    );
    allureReporter.addStep("Performed login with valid mobile number and password");

    await expect(LoginPage.profile_name).toHaveText(expectedUserName);
    allureReporter.addStep("Verified the displayed user name after login");

    // Sign out after successful login
    await LoginPage.signOutButton.click();
    allureReporter.addStep("Signed out after successful login");
  });
});

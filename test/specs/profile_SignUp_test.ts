// Test Case: Sign In: Verifying various login scenarios (C29652, C29650, C29651)
// Description: This test suite covers different Sign In scenarios for the application including invalid credentials (email, mobile, password) and successful login with valid credentials.

import SignUpPage from "../pageobjects/signup.page.js";
import LoginPage from "../pageobjects/login.page.js";

import fs from "fs";

describe("VPM Sign Up Features", () => {
  let signupdata: any;

  // Pre-condition: Load the signUp data from a JSON file
  before(async () => {
    signupdata = JSON.parse(
      fs.readFileSync("./test/data/signUpData.json", "utf-8")
    );
  });

  // Pre-condition for each test: Navigate to login page and open Sign In modal
  beforeEach(async () => {
    await browser.url(""); // Open the base URL
    await browser.pause(4000);
    await LoginPage.signinButton.click(); // Click the Sign In button
    await browser.pause(2000); // Wait for login modal to appear
  });

  it("SingUp Test", async () => {
    await SignUpPage.signUp(signupdata.email_value, signupdata.password_value, signupdata.firstname_value, signupdata.lastname_value, signupdata.mobilenumber_value);
    await browser.pause(5000);
    const url: string = await browser.getUrl(); 
    await expect(url).toContain("showAccountPanel=true");
  }); 

});
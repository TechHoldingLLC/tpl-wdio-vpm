import LoginPage from "../pageobjects/login.page.js";
import fs from "fs";
import profilesidemenuPage from "../pageobjects/profilesidemenu.page.js";
//import profileCardPage from "../pageobjects/profile.Card.page.js";

/**
 * Test Suite: Customer Profile - Saved Cards Page
 * This suite contains tests for the Saved Cards page functionality,
 * including adding a new card and verifying the success message.
 */
describe("Customer Profile - Saved Cards page", () => {
  /**
   * Precondition: Login to the application before running the tests.
   * This hook runs once before all the tests in this suite.
   */
  before(async () => {
    await browser.url(""); // Navigate to the base URL
    await browser.pause(2000); // Pause for 2 seconds to ensure the page loads

    // Click the sign-in button to navigate to the login page
    await LoginPage.signinButton.click();
    await browser.pause(2000); // Pause for 2 seconds to allow the login page to load

    // Load login data from JSON file
    const logindata = JSON.parse(
      fs.readFileSync("./test/data/loginData.json", "utf-8")
    );

    // Determine the appropriate login data based on the environment
    const url: string = await browser.getUrl();
    let selectedLoginData: any;
    if (url.includes("qa")) {
      selectedLoginData = logindata.login_valid;
    } else if (url.includes("stage")) {
      selectedLoginData = logindata.stage_login_valid;
    } else {
      selectedLoginData = logindata.prod_login_valid;
    }

    // Perform login with the selected credentials
    await LoginPage.login(
      selectedLoginData.login_email,
      selectedLoginData.login_password
    );
    await browser.pause(5000); // Pause to ensure login process completes
  });

  /**
   * Test Case: Verify adding a card to the Saved Card Listing Details page.
   */
  it("C29662 Profile: Verify adding card to Saved Card Listing Details page", async () => {
    await browser.pause(2000); // Pause to ensure the page is ready

    // Navigate to the Saved Cards page
    await profilesidemenuPage.savedCardOption.click();
    await profilesidemenuPage.pageTitle.waitForDisplayed();
    await browser.pause(3000); // Pause to ensure the page title is visible

    // Verify the page title
    expect(await profilesidemenuPage.pageTitle).toBeDisplayed();
    const savedCardsPageText: string =
      await profilesidemenuPage.pageTitle.getText();
    console.log(`Saved Cards Page text is ${savedCardsPageText}`);

    // Verify the page title text based on the language
    const url: string = await browser.getUrl();
    const expectedText = url.includes("en")
      ? "Saved Cards"
      : "Tarjetas Guardadas";
    expect(savedCardsPageText).toEqual(expectedText);

    // Commenting the below code as Instamed is not available in the application
    /*
    // Click the "Add Card" button
    await profilesidemenuPage.addCardButton.waitForClickable();
    await profilesidemenuPage.addCardButton.click();
    await browser.pause(2000); // Pause to ensure the card iframe is loaded

    // Switch to the card iframe
    await profileCardPage.cardIframe.waitForExist({ timeout: 10000 });
    await browser.switchToFrame(await profileCardPage.cardIframe);
    expect(await profileCardPage.cardIframe).toExist();
    await browser.pause(2000); // Pause to allow iframe content to load

    // Enter card details and submit
    await profileCardPage.addCardDetails("4111 1111 1111 1111", "12/28");
    await browser.pause(2500); // Pause to ensure card addition is processed
    await browser.switchToParentFrame(); // Switch back to the parent frame

    // Verify the success message
    try {
      await profileCardPage.cardAddMessage.waitForExist({ timeout: 10000 });
      await browser.pause(2000); // Pause to ensure message visibility
      const toastMessageText = await profileCardPage.cardAddMessage.getText();
      console.log("Toast Message:", toastMessageText);
      const expectedMessage = url.includes("en")
        ? "Card added"
        : "Tarjeta agregada con éxito.";
      expect(toastMessageText).toContain(expectedMessage);
    } 
      catch (error) {
      console.error("Error occurred while waiting for toast message:", error);
    }
    */
  });
});

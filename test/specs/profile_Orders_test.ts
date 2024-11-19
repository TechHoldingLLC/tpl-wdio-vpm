import LoginPage from "../pageobjects/login.page.js";
import fs from "fs";
import homePage from "../pageobjects/home.page.js";
import profilesidemenuPage from "../pageobjects/profilesidemenu.page.js";
import { expect } from "chai";

/**
 * Test Suite: Profile Menu Options and Redirection from Orders
 * This suite contains tests for verifying profile menu options and
 * viewing the Orders page within the profile section.
 */
describe("Profile Menu Options and Redirection from Orders", () => {
  /**
   * Precondition: Log in to the application before running the tests.
   * This hook runs once before all the tests in this suite.
   */
  before(async () => {
    await browser.url(""); // Navigate to the base URL
    await browser.pause(2000); // Pause to ensure the page loads

    // Click the sign-in button to navigate to the login page
    await LoginPage.signinButton.click();
    await browser.pause(2000); // Pause to allow the login page to load
  });

  /**
   * Test Case: Verify the profile menu options are displayed correctly.
   */
  it("C29953 Profile: Verify the profile menu options", async () => {
    const loginDataPath: string = "./test/data/loginData.json";
    let selectedLoginData: any;

    try {
      // Load login data from JSON file
      const logindata = JSON.parse(fs.readFileSync(loginDataPath, "utf-8"));

      // Determine the appropriate login data based on the environment
      const url: string = await browser.getUrl();
      const language: string = await profilesidemenuPage.getLanguageFromUrl(
        url
      );

      // Select login data based on the environment
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
      await browser.pause(2000); // Pause to ensure login process completes

      // Wait for "About Us" to be visible to confirm successful login
      await homePage.aboutUs.waitForDisplayed();
      expect(await homePage.aboutUs.isDisplayed()).to.be.true;
      await browser.pause(5000); // Pause for page stability

      // Define the expected profile sub-menu list based on the language
      let expectedProfileSubMenuList: string[] =
        language === "en"
          ? [
              "Orders",
              "Subscriptions",
              "Saved Cards",
              "Shipping Address",
              "Profile",
            ]
          : [
              "Órdenes",
              "Suscripciones",
              "Tarjetas Guardadas",
              "Dirección De Envío",
              "Perfil",
            ];

      // Validate that the profile sub-menu list matches the expected list
      const validateProfileSubMenus: boolean =
        await profilesidemenuPage.validateProfileSideMenuList(
          expectedProfileSubMenuList
        );
      expect(validateProfileSubMenus).to.be.true;
    } catch (error) {
      console.error(
        "Error occurred while verifying profile menu options:",
        error
      );
      throw error;
    }
  });

  /**
   * Test Case: Verify viewing the Order Listing Details page.
   */
  it("C29660 Profile: Verify viewing Order Listing Details page", async () => {
    await browser.pause(3000); // Pause to ensure the page is ready

    // Navigate to the Orders page
    await profilesidemenuPage.ordersOption.click();
    await profilesidemenuPage.pageTitle.waitForDisplayed();

    // Get text of orders page and list
    const ordersPageText: string =
      await profilesidemenuPage.pageTitle.getText();
    const ordersListText: string =
      await profilesidemenuPage.myOrderList.getText();

    // Get language from URL
    const url: string = await browser.getUrl();
    const language: string = await profilesidemenuPage.getLanguageFromUrl(url);

    // Define expected texts based on language
    const expectedOrderPageText: string =
      language === "en" ? "My Orders" : "Mis Pedidos";
    const expectedOrderListText: string =
      language === "en" ? "Orders list" : "Lista de Pedidos";

    // Log texts for debugging
    console.log(`Orders Page text is "${ordersPageText}"`);
    console.log(`Orders List text is "${ordersListText}"`);

    // Assert that the texts match the expected values
    expect(ordersPageText).to.be.equal(expectedOrderPageText);
    expect(ordersListText).to.be.equal(expectedOrderListText);
  });
});

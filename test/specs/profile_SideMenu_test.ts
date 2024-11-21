// Test Case: SideMenu: Verify side menu links are not broken (C29658)
// Description: This test case verifies that all links in the side menu, such as Orders, Subscriptions, Saved Cards, Shipping Address, and Profile, are functional and direct to the correct pages without broken links.

import SideMenuPage from "../pageobjects/sidemenu.page.js";
import LoginPage from "../pageobjects/login.page.js";
import fs from "fs";

describe("Side Menu Options", () => {
  let language: string;
  let loginData: any;

  // Pre-condition: Navigate to the application, login, and fetch the language from the URL
  before(async () => {
    // Open the base URL and navigate to the login page
    await browser.url("");
    await browser.pause(2000); // Pause to allow page to load
    await LoginPage.signinButton.click(); // Click the Sign In button
    await browser.pause(2000); // Pause for login modal to load

    // Load login data from the JSON file
    const logindata = JSON.parse(
      fs.readFileSync("./test/data/loginData.json", "utf-8")
    );

    // Retrieve the current URL to determine the environment (QA, Stage, Prod)
    const url: string = await browser.getUrl();
    if (url.includes("qa")) {
      loginData = logindata.login_valid;
    } else if (url.includes("stage")) {
      loginData = logindata.stage_login_valid;
    } else {
      loginData = logindata.prod_login_valid;
    }

    // Perform login with the selected credentials
    await LoginPage.login(loginData.login_email, loginData.login_password);

    // Get the language from the URL for later use in the test
    language = await SideMenuPage.getLanguageFromUrl(url);
  });

  // Test Case: Verify that all side menu links are functional and not broken
  it("C29658 SideMenu: Verify side menu links are not broken", async () => {
    // Define expected menu names based on the language (English or Spanish)
    const orderMenu: string = language === "en" ? "Orders" : "Órdenes";
    const subscriptionMenu: string =
      language === "en" ? "Subscriptions" : "Suscripciones";
    const savedCardsMenu: string =
      language === "en" ? "Saved Cards" : "Tarjetas Guardadas";
    const shippingAddressMenu: string =
      language === "en" ? "Shipping Address" : "Dirección De Envío";
    const profileMenu: string = language === "en" ? "Profile" : "Perfil";

    // Helper function to validate the side menu links
    const checkMenuLink = async (menuName: string, expectedUrlPart: string) => {
      await browser.pause(2000); // Pause before interacting with the menu
      await SideMenuPage.openMenu(menuName); // Open the specified menu
      await browser.pause(4000); // Wait for the page to load
      const currentUrl = await SideMenuPage.getCurrentUrl(); // Get the current URL
      await expect(currentUrl).toContain(expectedUrlPart); // Assert the URL contains the expected path
      await SideMenuPage.openSideMenu(); // Reopen the side menu after navigation
      await browser.pause(2000); // Pause before the next operation
    };

    // Validate each menu item and ensure the links are not broken
    await checkMenuLink(orderMenu, "orders");
    await checkMenuLink(subscriptionMenu, "subscription");
    await checkMenuLink(savedCardsMenu, "savedcards");
    await checkMenuLink(shippingAddressMenu, "shippingaddress");
    await checkMenuLink(profileMenu, "profile");
  });
});

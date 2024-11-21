import homePage from "../pageobjects/home.page.js";
import LoginPage from "../pageobjects/login.page.js";
import iConsultPage from "../pageobjects/iConsult.page.js";
import SideMenuPage from "../pageobjects/sidemenu.page.js";
import fs from "fs";

/**
 * Test Suite: HomePage Features
 * Description: This test suite verifies the Home Page functionality, including checking if the Home Page opens
 * without errors and validating the presence and accuracy of hyperlinks in different environments (QA, Staging, Production).
 */

describe("HomePage Features", () => {
  let pagetitle: any;
  let homePageData: any;

  /**
   * Hook: Before All Tests
   * Description: Load the Home Page, pause for 2 seconds, and retrieve the page title and data from external JSON files.
   */
  before(async () => {
    // Navigate to the homepage (base URL)
    await browser.url("");

    // Pause the browser for 2 seconds to allow the page to load
    await browser.pause(2000);

    // Load page titles and Home Page data from external JSON files for multilingual support
    pagetitle = JSON.parse(
      fs.readFileSync("./test/data/pageTitles.json", "utf-8")
    );
    homePageData = JSON.parse(
      fs.readFileSync("./test/data/homePageData.json", "utf-8")
    );
  });

  /**
   * Test Case: C29672 Verify Landing Page Opens Error-Free
   * Description: This test verifies that the Home Page opens without errors, checks the page title based on the detected language,
   * and ensures that all hyperlinks on the page are correct for various environments (QA, Stage, Production).
   */
  it("C29672 Website Main Pages: Verify Landing Page opens error-free", async () => {
    // Pause the browser for 5 seconds to allow the page content to load fully
    await browser.pause(5000);

    // Get the current URL of the Home Page and determine the language based on the URL structure
    const url: string = await browser.getUrl();
    const language: string = await homePage.getLanguageFromUrl(url);

    // Verify that the page title matches the expected title based on the detected language
    const expectedPageTitle: string =
      language === "en" ? pagetitle.pg_title_home : pagetitle.pg_title_home_es;
    expect(await browser.getTitle()).toEqual(expectedPageTitle);

    // Pause for 2 seconds before proceeding
    await browser.pause(2000);

    // Determine the environment (QA, Stage, or Production) and verify the links accordingly
    let expectedLinks: string[];
    let linkElements = await homePage.links;

    if (url.includes("qa")) {
      // Set expected links for the QA environment
      expectedLinks =
        language === "en"
          ? homePageData.englishLinks
          : homePageData.spanishLinks;
    } else if (url.includes("stage")) {
      // Set expected links for the Staging environment
      expectedLinks =
        language === "en"
          ? homePageData.englishLinks
          : homePageData.spanishLinks;
    } else {
      // Set expected links for the Production environment
      expectedLinks =
        language === "en"
          ? homePageData.englishLinks_prod
          : homePageData.spanishLinks_prod;
    }

    // Retrieve and validate the visible links on the page
    const actualLinks: string[] = [];
    for (const element of linkElements) {
      try {
        // Fetch the text of each link and trim any whitespace
        let linkText = await element.getText();
        linkText = linkText.trim();
        if (linkText) {
          actualLinks.push(linkText);
        }
      } catch (error) {
        // Log any errors that occur while fetching the link text
        console.error("Error occurred while fetching link text:", error);
      }
    }

    // Log the visible links on the Home Page and compare them with the expected links
    console.log("Visible Links on the HomePage are: " + actualLinks);
    expect(actualLinks).toEqual(expectedLinks); // Validate that the actual links match the expected ones
  });


  it("C29672 Website Main Pages: Verify Landing Page ED tile action - When iConsult user is logged-in", async () => {
    await LoginPage.signinButton.click(); // Click the sign-in button 
     // Read login & iConsult data from external JSON files
    const logindata = JSON.parse(
      fs.readFileSync("./test/data/loginData.json", "utf-8")
    );
    const iConsultEDData = JSON.parse(
      fs.readFileSync("./test/data/iConsultEDTData.json", "utf-8")
    );
    let loginData: any;

    // Get the current URL and set login credentials based on the environment (QA/Stage/Prod)
    let url;
    url = await browser.getUrl();
    const language: string = await LoginPage.getLanguageFromUrl(url);

    if (url.includes("qa")) {
      loginData = logindata.login_valid;
    } else if (url.includes("stage")) {
      loginData = logindata.stage_login_valid;
    } else {
      loginData = logindata.prod_login_valid;
    }

    // Log in using the determined credentials
    await LoginPage.login(loginData.login_email, loginData.login_password);
    await browser.pause(3000); // Wait for login to complete
    await SideMenuPage.sideMenuCloseButton.waitForDisplayed();
    await SideMenuPage.sideMenuCloseButton.click();
    browser.pause(3000);

    // Home page - tile verify
    await homePage.tileED.waitForClickable();
    await homePage.tileED.doubleClick();
    browser.pause(3000);
    await iConsultPage.consentCheckbox.waitForDisplayed();
    url = await browser.getUrl();
    await expect(url).toContain("start-iconsult");

    // Accept the iConsult consent form
    await iConsultPage.consentCheckbox.click();
    await iConsultPage.consentContinueButton.click();
    await browser.pause(5000);
    await iConsultPage.startNewiConsult.waitForDisplayed();

    // Ensure that problem selection question is skipped 
    if (await iConsultPage.startNewiConsult.isDisplayed()) {
      await iConsultPage.startNewiConsult.click();
      await browser.pause(2000);
    }
    await browser.pause(3000);
    let actualQuestionString = await iConsultPage.firstQuestion.getText();
    const expectedFirstQuestionString =
    language === "en"
      ? iConsultEDData.iConsultED_firstQuestionString_en
      : iConsultEDData.iConsultED_firstQuestionString_es

    expect(actualQuestionString).toEqual(expectedFirstQuestionString);
  });

it("Website Main Pages: Verify Landing Page ED tile - Start iConsult action - When iConsult user is logged-in", async () => {
  await LoginPage.signinButton.click(); // Click the sign-in button 
   // Read login & iConsult data from external JSON files
  const logindata = JSON.parse(
    fs.readFileSync("./test/data/loginData.json", "utf-8")
  );
  const iConsultEDData = JSON.parse(
    fs.readFileSync("./test/data/iConsultEDTData.json", "utf-8")
  );
  let loginData: any;

  // Get the current URL and set login credentials based on the environment (QA/Stage/Prod)
  let url;
  url = await browser.getUrl();
  const language: string = await LoginPage.getLanguageFromUrl(url);

  if (url.includes("qa")) {
    loginData = logindata.login_valid;
  } else if (url.includes("stage")) {
    loginData = logindata.stage_login_valid;
  } else {
    loginData = logindata.prod_login_valid;
  }

  // Log in using the determined credentials
  await LoginPage.login(loginData.login_email, loginData.login_password);
  await browser.pause(3000); // Wait for login to complete
  await SideMenuPage.sideMenuCloseButton.waitForDisplayed();
  await SideMenuPage.sideMenuCloseButton.click();
  browser.pause(3000);

  // Home page - tile verify
  await homePage.tileED.waitForDisplayed();
  await homePage.tileED.moveTo();
  await homePage.tileStart_iConsultButton.waitForDisplayed();
  await homePage.tileStart_iConsultButton.doubleClick();
  browser.pause(3000);
  await iConsultPage.consentCheckbox.waitForDisplayed();
  url = await browser.getUrl();
  await expect(url).toContain("start-iconsult");

  // Accept the iConsult consent form
  await iConsultPage.consentCheckbox.click();
  await iConsultPage.consentContinueButton.click();
  await browser.pause(5000);
  await iConsultPage.startNewiConsult.waitForDisplayed();

  // Ensure that problem selection question is skipped 
  if (await iConsultPage.startNewiConsult.isDisplayed()) {
    await iConsultPage.startNewiConsult.click();
    await browser.pause(2000);
  }
  await browser.pause(3000);
  let actualQuestionString = await iConsultPage.firstQuestion.getText();
  const expectedFirstQuestionString =
  language === "en"
    ? iConsultEDData.iConsultED_firstQuestionString_en
    : iConsultEDData.iConsultED_firstQuestionString_es

  expect(actualQuestionString).toEqual(expectedFirstQuestionString);
});

it("Website Main Pages: Verify Landing Page ED tile action - when user is not logged-in", async () => {
  await browser.pause(3000);
  await homePage.tileED.waitForClickable();
  await homePage.tileED.doubleClick();
  await browser.pause(3000);
  await iConsultPage.consentCheckbox.waitForDisplayed();
  const url = await browser.getUrl();
  await expect(url).toContain("start-iconsult");
  await iConsultPage.consentCheckbox.click();
  await iConsultPage.consentContinueButton.click();
  await browser.pause(5000);
  await iConsultPage.dobPage.waitForExist();
  const isDisplayed = await iConsultPage.dobPage.isDisplayed();
  await expect(isDisplayed).toBe(true);
});

it("Website Main Pages: Verify Landing Page ED tile - Start iConsult action - when user is not logged-in", async () => {
  await browser.pause(3000);
  await homePage.tileED.waitForDisplayed();
  await homePage.tileED.moveTo();
  await homePage.tileStart_iConsultButton.waitForDisplayed();
  await homePage.tileStart_iConsultButton.doubleClick();
  await browser.pause(3000);
  await iConsultPage.consentCheckbox.waitForDisplayed();
  const url = await browser.getUrl();
  await expect(url).toContain("start-iconsult");
  await iConsultPage.consentCheckbox.click();
  await iConsultPage.consentContinueButton.click();
  await browser.pause(5000);
  await iConsultPage.dobPage.waitForExist();
  const isDisplayed = await iConsultPage.dobPage.isDisplayed();
  await expect(isDisplayed).toBe(true);
});
});



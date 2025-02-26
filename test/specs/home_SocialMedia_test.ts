import homePage from "../pageobjects/home.page.js";
import { ChainablePromiseElement } from "webdriverio";
import fs from "fs";

/**
 * Test Suite: Home Page Footer - Social Media Link Verification
 * Description: This suite verifies the redirection of social media icons
 * (Facebook, YouTube, Instagram) from the home page footer and checks
 * if the correct page is loaded in a new browser window.
 */

describe("Home Page Footer - Social Media Link verification", () => {
  let pagetitle: any; // Object to hold page titles from external JSON
  let originalWindowHandle: string; // To store the original window handle

  /**
   * Precondition: Open the browser and load the homepage.
   * Load page titles from the external JSON file.
   * Store the current window handle to return after each test.
   */
  before(async () => {
    await browser.url(""); // Open the base URL
    await browser.pause(2000); // Wait for the page to load
    pagetitle = JSON.parse(
      fs.readFileSync("./test/data/pageTitles.json", "utf-8")
    ); // Load expected page titles
    originalWindowHandle = await browser.getWindowHandle(); // Store the original window handle
  });

  /**
   * Cleanup: After each test, close any new windows and switch back to the original window.
   */
  afterEach(async () => {
    const windowHandles = await browser.getWindowHandles();
    const newWindowHandles = windowHandles.filter(
      (handle) => handle !== originalWindowHandle
    );
    for (const handle of newWindowHandles) {
      await browser.switchToWindow(handle);
      await browser.closeWindow(); // Close any additional windows opened during the test
    }
    await browser.switchToWindow(originalWindowHandle); // Return to the original window
  });

  /**
   * Helper function to verify social media redirection.
   * @param {ChainablePromiseElement<WebdriverIO.Element>} linkElement - The social media link element to be clicked.
   * @param {string} pageTitleKey - Key to fetch the expected page title from the JSON file.
   * @param {string} urlContains - A substring expected in the URL of the social media page.
   */
  const verifySocialMediaRedirection = async (
    linkElement: ChainablePromiseElement<WebdriverIO.Element>,
    pageTitleKey: string,
    urlContains: string
  ) => {
    await linkElement.click(); // Click the social media link

    const windowHandles = await browser.getWindowHandles();
    if (windowHandles.length < 2) {
      throw new Error(`${pageTitleKey} page did not open in a new window.`);
    }
    await browser.switchToWindow(windowHandles[1]); // Switch to the new window

    // Verify the page title matches the expected title
    await expect(browser).toHaveTitle(pagetitle[pageTitleKey]);

    // Verify the URL contains the expected substring
    await expect(browser).toHaveUrl(expect.stringContaining(urlContains));
  };

  /**
   * Test Case: C29954 - Verify Facebook Redirection Page
   * Description: This test verifies that clicking the Facebook icon redirects
   * the user to the correct Facebook page in a new window.
   */
  it("C29954 Website Main Pages: Verify FB Redirection Page", async () => {
    await homePage.FBIcon.scrollIntoView(); // Scroll to the Facebook icon
    await verifySocialMediaRedirection(
      homePage.FBLink, // Facebook link element
      "pg_title_FB", // Expected page title for Facebook
      "facebook" // Expected URL substring
    );
    expect(browser).toHaveUrl(expect.stringContaining("viapromeds"));
  });

  /**
   * Test Case: C29955 - Verify YouTube Redirection Page
   * Description: This test verifies that clicking the YouTube icon redirects
   * the user to the correct YouTube page in a new window.
   */
  it("C29955 Website Main Pages: Verify YouTube Redirection Page", async () => {
    await homePage.FBIcon.scrollIntoView(); // Scroll to the YouTube icon (placed close to Facebook)
    await verifySocialMediaRedirection(
      homePage.YouTubeLink, // YouTube link element
      "pg_title_YouTube", // Expected page title for YouTube
      "youtube" // Expected URL substring
    );
    expect(browser).toHaveUrl(expect.stringContaining("viapromeds"));
  });

  /**
   * Test Case: C29956 - Verify Instagram Redirection Page
   * Description: This test verifies that clicking the Instagram icon redirects
   * the user to the correct Instagram page in a new window.
   */
  it("C29956 Website Main Pages: Verify Instagram Redirection Page", async () => {
    await homePage.FBIcon.scrollIntoView(); // Scroll to the Instagram icon
    await verifySocialMediaRedirection(
      homePage.InstaLink, // Instagram link element
      "pg_title_Instagram", // Expected page title for Instagram
      "instagram" // Expected URL substring
    );
    expect(browser).toHaveUrl(expect.stringContaining("viapromeds"));
  });
});

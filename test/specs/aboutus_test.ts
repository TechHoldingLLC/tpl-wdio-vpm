import { expect } from "@wdio/globals";
import aboutUsPage from "../pageobjects/aboutus.page.js";
import fs from "fs";
import allureReporter from "@wdio/allure-reporter";

/**
 * Test Suite: About Us Feature
 * Description: This test suite verifies that the About Us page functions as expected. It checks if the page loads
 * correctly without errors, validates the content in both English and Spanish, and ensures all elements are displayed properly.
 */

describe("About Us Feature", () => {
  /**
   * Hook: Before All Tests
   * Description: Navigate to the homepage and click on the "About Us" link to ensure the About Us page is loaded for each test case.
   */
  before(async () => {
    allureReporter.addFeature("About Us Feature");
    allureReporter.addStory("Navigate to About Us page");

    // Navigate to the homepage (base URL)
    await browser.url("");
    allureReporter.addStep("Navigated to the homepage");

    // Click on the 'About Us' link to open the About Us page
    await aboutUsPage.aboutUsLink.click();
    allureReporter.addStep("Clicked on the 'About Us' link");
  });

  /**
   * Test Case: C29680 Verify About Us Page Opens Error-Free
   * Description: Ensures that the About Us page loads without errors, verifies the page title, content, and other key sections
   * in both English and Spanish versions of the page.
   */
  it("C29680 Website Main Pages: Verify About Us page opens error-free", async () => {
    try {
      allureReporter.addFeature("About Us Page");
      allureReporter.addStory("Verify About Us page opens error-free");

      // Load page titles and About Us data from external JSON files for multilingual support
      const pageTitle = JSON.parse(
        fs.readFileSync("./test/data/pageTitles.json", "utf-8")
      );
      allureReporter.addStep("Loaded page titles from JSON file");

      const aboutUsData = JSON.parse(
        fs.readFileSync("./test/data/aboutUsData.json", "utf-8")
      );
      allureReporter.addStep("Loaded About Us data from JSON file");

      // Get the current page URL and determine the language based on the URL structure
      const currentUrl = await browser.getUrl();
      allureReporter.addStep("Retrieved current page URL");

      const language = await aboutUsPage.getLanguageFromUrl(currentUrl);
      allureReporter.addStep(`Determined language from URL: ${language}`);

      // Declare variables for storing expected headers and content based on the language
      let expectedHeaders: string[];
      let aboutVPMText: string;
      let doctorMissionText: string;

      // Set expected content for English or Spanish versions of the page
      if (language === "en") {
        expectedHeaders = [
          "Bridging the Healthcare Gap for Latinos",
          "Dr. Linares’ commitment & Platform holistic approach",
          "Respected Expert & Trusted Figure",
        ];
        aboutVPMText = aboutUsData.aboutVPM; // English content for About ViaProMeds
        doctorMissionText = aboutUsData.aboutUsDoctorMission; // English doctor's mission text

        // Verify that the page title matches the expected English title
        await expect(browser).toHaveTitle(pageTitle.pg_title_about_us);
        allureReporter.addStep("Verified page title for English version");
      } else {
        expectedHeaders = [
          "Mejorando las deficiencias en la atención médica para la comunidad latina",
          "El compromiso del Dr. Linares y el enfoque holístico de la plataforma",
          "Experto respetado y figura de confianza",
        ];
        aboutVPMText = aboutUsData.aboutVPM_spanish; // Spanish content for About ViaProMeds
        doctorMissionText = aboutUsData.aboutUsDoctorMission_spanish; // Spanish doctor's mission text

        // Verify that the page title matches the expected Spanish title
        await expect(browser).toHaveTitle(pageTitle.pg_title_about_us_spanish);
        allureReporter.addStep("Verified page title for Spanish version");
      }

      // Retrieve the text from the 'About ViaProMeds' section on the About Us page
      const aboutViaProMedsText = await aboutUsPage.aboutViaProMeds.getText();
      allureReporter.addStep("Retrieved text from 'About ViaProMeds' section");

      // Use regular expressions to handle flexible whitespace in the retrieved text
      const regexPattern = new RegExp(aboutVPMText.replace(/\s+/g, "\\s*"));

      // Assert that the retrieved text matches the expected regular expression pattern
      await expect(aboutViaProMedsText).toMatch(regexPattern);
      allureReporter.addStep("Verified 'About ViaProMeds' text content");

      // Verify that the Doctor's mission text matches the expected value
      expect(await aboutUsPage.aboutUsDoctorMission.getText()).toEqual(
        doctorMissionText
      );
      allureReporter.addStep("Verified Doctor's mission text content");

      // Verify that the main content of the About Us page is displayed correctly
      expect(await aboutUsPage.aboutUsContent).toBeDisplayed();
      allureReporter.addStep("Verified main content of the About Us page is displayed");

      // Validate that the header elements on the page match the expected content
      const isValidContent = await aboutUsPage.validateAboutUsItemContent(
        expectedHeaders
      );
      expect(isValidContent).toBeTruthy();
      allureReporter.addStep("Validated header elements on the About Us page");

      // Check if additional elements (icons, introductions) are displayed on the page
      await aboutUsPage.aboutUsPage();
      expect(await aboutUsPage.iConsultIntro).toBeDisplayed();
      allureReporter.addStep("Verified additional elements on the About Us page");
    } catch (error) {
      // Log any error that occurs during test execution
      console.error("An error occurred:", error);
      allureReporter.addAttachment("Error", error.message, "text/plain");
    }
  });
});

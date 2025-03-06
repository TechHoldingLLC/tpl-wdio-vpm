import { expect } from "@wdio/globals";
import aboutUsPage from "../pageobjects/aboutus.page.js";
import fs from "fs";

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
    // Navigate to the homepage (base URL)
    await browser.url("");

    // Click on the 'About Us' link to open the About Us page
    await aboutUsPage.aboutUsLink.click();
  });

  /**
   * Test Case: C29680 Verify About Us Page Opens Error-Free
   * Description: Ensures that the About Us page loads without errors, verifies the page title, content, and other key sections
   * in both English and Spanish versions of the page.
   */
  it("C29680 Website Main Pages: Verify About Us page opens error-free", async () => {
      try{
      // Load page titles and About Us data from external JSON files for multilingual support
      const pageTitle = JSON.parse(
        fs.readFileSync("./test/data/pageTitles.json", "utf-8")
      );
      const aboutUsData = JSON.parse(
        fs.readFileSync("./test/data/aboutUsData.json", "utf-8")
      );

      // Get the current page URL and determine the language based on the URL structure
      const currentUrl = await browser.getUrl();
      const language = await aboutUsPage.getLanguageFromUrl(currentUrl);

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
      }

      // Retrieve the text from the 'About ViaProMeds' section on the About Us page
      const aboutViaProMedsText = await aboutUsPage.aboutViaProMeds.getText();

      // Use regular expressions to handle flexible whitespace in the retrieved text
      const regexPattern = new RegExp(aboutVPMText.replace(/\s+/g, "\\s*"));

      // Assert that the retrieved text matches the expected regular expression pattern
      await expect(aboutViaProMedsText).toMatch(regexPattern);

      // Verify that the Doctor's mission text matches the expected value
      expect(await aboutUsPage.aboutUsDoctorMission.getText()).toEqual(
        doctorMissionText
      );

      // Verify that the main content of the About Us page is displayed correctly
      expect(await aboutUsPage.aboutUsContent).toBeDisplayed();

      // Validate that the header elements on the page match the expected content
      expect(await aboutUsPage.aboutUsContentItemHeaderList.map((i) => i.getText().then((text) => text.trim()))).toEqual(expectedHeaders);
    
      // Check if additional elements (icons, introductions) are displayed on the page
      await aboutUsPage.aboutUsPage();
      expect(await aboutUsPage.iConsultIntro).toBeDisplayed();
    }catch (error) {
      // Log any error that occurs during test execution
      console.error("An error occurred:", error);
      throw error;
    }
  });
});

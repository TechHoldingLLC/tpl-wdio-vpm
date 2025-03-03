import { expect } from "@wdio/globals";
import ContactUs from "../pageobjects/contactus.page.js";
import fs from "fs";
import allureReporter from "@wdio/allure-reporter";

/**
 * Test Suite: Contact Us Feature
 * Description: This suite covers the functionality of the Contact Us page, including verifying that the page loads correctly,
 * and testing the form submission with both valid and invalid inputs across multiple languages.
 */

describe("Contact Us Feature", () => {
  let pageTitle: any;
  let contactdata: any;

  /**
   * Hook: Before All Tests
   * Description: Navigates to the Contact Us page and loads necessary data (page titles and form data)
   * for multi-language support before executing the tests.
   */
  before(async () => {
    allureReporter.addFeature("Contact Us Feature");
    allureReporter.addStory("Navigate to Contact Us page");

    // Navigate to the homepage (base URL)
    await browser.pause(2000);
    await browser.url("");
    allureReporter.addStep("Navigated to the homepage");

    // Click the Contact Us link to navigate to the Contact Us page
    await ContactUs.contactUslink.click();
    await browser.pause(2000); // Pause to allow the page to fully load
    allureReporter.addStep("Clicked on the 'Contact Us' link");

    // Load data from external JSON files for multilingual support
    pageTitle = JSON.parse(
      fs.readFileSync("./test/data/pageTitles.json", "utf-8")
    );
    contactdata = JSON.parse(
      fs.readFileSync("./test/data/contactUsData.json", "utf-8")
    );
    allureReporter.addStep("Loaded page titles and contact data from JSON files");
  });

  /**
   * Test Case: C29673 Verify Contact Us Page Opens Error-Free
   * Description: Ensures that the Contact Us page loads without errors,
   * verifies the URL, page title, banner message, and problem message based on the selected language.
   */
  it("C29673 Website Main Pages: Verify Contact Us Page opens error-free", async () => {
    await browser.pause(2000); // Pause to ensure the page loads

    // Verify the URL contains "contactus"
    expect(await browser.getUrl()).toContain("contactus");
    allureReporter.addStep("Verified the URL contains 'contactus'");

    // Get the language from the current URL and assign the expected title and messages
    const language = await ContactUs.getLanguageFromUrl(await browser.getUrl());
    const title =
      language === "en"
        ? pageTitle.pg_title_contact_us
        : pageTitle.pg_title_contact_us_spanish;
    const bannerMessage =
      language === "en"
        ? contactdata.cu_bannerMessage
        : contactdata.cu_bannerMessage_spanish;
    const contactUsProblemText =
      language === "en"
        ? contactdata.cu_problemMessage
        : contactdata.cu_problemMessage_spanish;

    // Verify the page title matches the expected title
    await expect(browser).toHaveTitle(title);
    allureReporter.addStep("Verified the page title matches the expected title");

    // Verify the banner message is displayed correctly
    console.log(await ContactUs.contactUsBanner.getText());
    expect(await ContactUs.contactUsBanner.getText()).toContain(bannerMessage);
    allureReporter.addStep("Verified the banner message is displayed correctly");

    // Verify the "Contact Us for Problem" message is displayed correctly
    console.log(await ContactUs.contactUsForProblem.getText());
    expect(await ContactUs.contactUsForProblem.getText()).toContain(
      contactUsProblemText
    );
    allureReporter.addStep("Verified the 'Contact Us for Problem' message is displayed correctly");
  });

  /**
   * Test Case: C29675 Verify Submit Contact Us Form with Valid Details
   * Description: Tests the form submission on the Contact Us page using valid data,
   * verifying that the success message appears correctly based on the selected language.
   */
  it("C29675 Website Main Pages: Verify Submit Contact Us form with Valid details", async () => {
    // Get the language from the current URL
    const url: string = await browser.getUrl();
    const language = await ContactUs.getLanguageFromUrl(url);
    allureReporter.addStep("Retrieved the current page URL and determined the language");

    if (url.includes("qa") || url.includes("stage")) {
      // Verify the email field is displayed on the page
      expect(await ContactUs.emailField.isDisplayed()).toBeTruthy();
      allureReporter.addStep("Verified the email field is displayed on the page");

      if (language === "en") {
        // Submit the Contact Us form with valid details in English
        await ContactUs.contactUsPage(
          contactdata.cu_firstname,
          contactdata.cu_lastname,
          contactdata.cu_contactnumber,
          contactdata.cu_description,
          "en"
        );
        allureReporter.addStep("Submitted the Contact Us form with valid details in English");

        // Wait until the success message appears and verify it
        await browser.waitUntil(
          async () =>
            (await ContactUs.contactToastmessage.getText()) ===
            contactdata.cu_contactSuccessmessage
        );
        await expect(ContactUs.contactToastmessage).toHaveText(
          contactdata.cu_contactSuccessmessage
        );
        allureReporter.addStep("Verified the success message appears correctly in English");
      } else {
        // Submit the form with valid details in Spanish
        await ContactUs.contactUsPage(
          contactdata.cu_firstname,
          contactdata.cu_lastname,
          contactdata.cu_contactnumber,
          contactdata.cu_description,
          ""
        );
        allureReporter.addStep("Submitted the Contact Us form with valid details in Spanish");

        // Verify the success message appears in Spanish
        const message = await ContactUs.contactToastmessage;
        await expect(message).toHaveText(
          contactdata.cu_contactSuccessmessage_spanish
        );
        allureReporter.addStep("Verified the success message appears correctly in Spanish");
      }
    } else {
      console.log("Test is executable only on QA & Stage Environments");
      allureReporter.addStep("Test is executable only on QA & Stage Environments");
    }
  });

  /**
   * Test Case: C29674 Verify Submit Contact Us Form with Invalid Details
   * Description: Tests form submission with invalid data (invalid email) and verifies that
   * the correct error message appears, based on the selected language.
   */
  it("C29674 Website Main Pages: Verify Submit Contact Us form with Invalid details", async () => {
    // Get the language from the current URL
    const language = await ContactUs.getLanguageFromUrl(await browser.getUrl());
    allureReporter.addStep("Retrieved the current page URL and determined the language");

    // Refresh the page to reset the form
    await browser.refresh();
    allureReporter.addStep("Refreshed the page to reset the form");

    // Verify the email field is displayed
    expect(await ContactUs.emailField.isDisplayed()).toBeTruthy();
    allureReporter.addStep("Verified the email field is displayed on the page");

    if (language === "en") {
      // Submit the form with invalid details in English
      await ContactUs.contactUsPage_invalid(
        contactdata.cu_firstname,
        contactdata.cu_lastname,
        contactdata.cu_invalid_email,
        contactdata.cu_contactnumber,
        contactdata.cu_description,
        "en"
      );
      allureReporter.addStep("Submitted the Contact Us form with invalid details in English");

      // Wait for the error message and verify it appears
      await browser.waitUntil(
        async () =>
          (await ContactUs.contacterrormessage.getText()) ===
          contactdata.cu_errorMessage
      );
      await expect(ContactUs.contacterrormessage).toHaveText(
        contactdata.cu_errorMessage
      );
      allureReporter.addStep("Verified the error message appears correctly in English");
    } else {
      // Submit the form with invalid details in Spanish
      await ContactUs.contactUsPage_invalid(
        contactdata.cu_firstname,
        contactdata.cu_lastname,
        contactdata.cu_invalid_email,
        contactdata.cu_contactnumber,
        contactdata.cu_description,
        ""
      );
      allureReporter.addStep("Submitted the Contact Us form with invalid details in Spanish");

      // Wait for and verify the error message in Spanish
      await browser.waitUntil(
        async () =>
          (await ContactUs.contacterrormessage.getText()) ===
          contactdata.cu_errorMessage_spanish
      );
      await expect(ContactUs.contacterrormessage).toHaveText(
        contactdata.cu_errorMessage_spanish
      );
      allureReporter.addStep("Verified the error message appears correctly in Spanish");
    }
  });
});

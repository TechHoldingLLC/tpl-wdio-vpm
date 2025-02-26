// Test Suite: iConsult Feature - End to End Flow
// This test suite verifies the iConsult feature's behavior with valid and invalid age inputs.
// It checks if the correct messages are displayed for users based on their age and validates the end-to-end iConsult flow.

import iConsult from "../pageobjects/iConsult.page.js";
import { Key } from "webdriverio";
import fs from "fs";

describe("iConsult feature - End to End flow", () => {
  // Setup: Opens the iConsult page and pauses for the page to load before each test case
  beforeEach(async () => {
    await browser.url(""); // Open iConsult homepage
    await browser.pause(2000); // Pause for the page to fully load
  });

  // Test Case C29979: iConsult flow with Invalid Age
  // This test verifies that the iConsult flow displays the correct message when a user under 25 years old attempts to proceed.
  it("C29979 iConsult: Verify iConsult flow with Invalid Age", async () => {
    const iConsultEDData = JSON.parse(
      fs.readFileSync("./test/data/iConsultEDTData.json", "utf-8")
    );

    const url: string = await browser.getUrl();
    const language: string = await iConsult.getLanguageFromUrl(url);

    // Start iConsult flow
    await iConsult.startFreeiConsultButton.waitForClickable({ timeout: 3000 });
    await iConsult.startFreeiConsultButton.click();
    await browser.pause(2000);

    // Consent page actions
    await iConsult.consentCheckbox.click();
    await browser.pause(2000);
    await iConsult.consentContinueButton.click();
    await browser.pause(5000);

    // Age input: Set a date of birth less than 25 years ago
    await iConsult.iConsultEDSelection.click();
    await browser.pause(2000);
    await iConsult.insertAge.click();
    await browser.keys([Key.Ctrl, "Left arrow"]);
    await browser.pause(2000);

    // Calculate date of birth for age less than 25 years
    const dobLessThan25Years = new Date(
      new Date().setFullYear(
        new Date().getFullYear() - 18,
        new Date().getMonth(),
        new Date().getDate() + 1
      )
    )
      .toISOString()
      .split("T")[0];

    // Convert date format to match input format
    const convertDateFormat = (date: string): string =>
      date.split("-").reverse().slice(0, 2).reverse().join("-") +
      "-" +
      date.split("-")[0];
    const myDate = convertDateFormat(dobLessThan25Years);

    // Input the date of birth
    const arrValue = [...myDate];
    for (let i = 0; i < arrValue.length; i++) {
      await browser.keys(arrValue[i]);
      await browser.pause(50);
    }
    await browser.pause(1000);
    await iConsult.ageContinue.click();
    await browser.pause(2000);

    // Verify the invalid age message
    const invalidAgeMsg =
      language === "en"
        ? iConsultEDData.iConsultED_InvalidAgeMessage_en
        : iConsultEDData.iConsultED_InvalidAgeMessage_es;
    expect(await iConsult.ageTitleMessage.getText()).toEqual(invalidAgeMsg);
    await browser.pause(2000);

    // Return to home page
    await iConsult.backToHomeBtn.click();
    await browser.pause(2000);
  });

  // Test Case C29980: iConsult flow with Valid Age
  // This test verifies that the iConsult flow displays the correct message when a user older than 25 years old proceeds.
  it("C29980 iConsult: Verify iConsult flow with Valid Age", async () => {
    const iConsultEDData = JSON.parse(
      fs.readFileSync("./test/data/iConsultEDTData.json", "utf-8")
    );

    const url: string = await browser.getUrl();
    const language: string = await iConsult.getLanguageFromUrl(url);

    // Start iConsult flow
    await iConsult.startFreeiConsultButton.click();
    await iConsult.consentCheckbox.waitForClickable();
    await iConsult.consentCheckbox.click();
    await iConsult.consentContinueButton.click();
    await browser.pause(5000);

    // Age input: Set a date of birth for age greater than 25 years
    await iConsult.iConsultEDSelection.click();
    await browser.pause(5000);
    await iConsult.insertAge.click();
    await browser.keys([Key.Ctrl, "Left arrow"]);
    await browser.pause(2000);

    // Calculate date of birth for age greater than 25 years
    const dobMoreThan25Years = new Date(
      new Date().setFullYear(
        new Date().getFullYear() - 26,
        new Date().getMonth(),
        new Date().getDate() + 1
      )
    )
      .toISOString()
      .split("T")[0];

    // Convert date format to match input format
    const convertDateFormat = (date: string): string =>
      date.split("-").reverse().slice(0, 2).reverse().join("-") +
      "-" +
      date.split("-")[0];
    const myDate = convertDateFormat(dobMoreThan25Years);
    console.log(`Date of birth More than 25 Years: ${myDate}`);
    await browser.pause(2000);

    // Input the date of birth
    const arrValue = [...myDate];
    for (let i = 0; i < arrValue.length; i++) {
      await browser.keys(arrValue[i]);
      await browser.pause(50);
    }
    await browser.pause(1000);
    await iConsult.ageContinue.click();
    await browser.pause(2000);

    // Verify the valid age message
    const validAgeMsg =
      language === "en"
        ? iConsultEDData.iConsultED_ValidAgeMessage_en
        : iConsultEDData.iConsultED_ValidAgeMessage_es;
    expect(await iConsult.ageTitleMessage.getText()).toEqual(validAgeMsg);
    await browser.pause(2000);
    await iConsult.ageSuccessContinueBtn.click();
    await browser.pause(5000);

    // Verify the "Let's Get Started" message
    const letsStartMsg =
      language === "en"
        ? iConsultEDData.letsGetStarted_en
        : iConsultEDData.letsGetStarted_es;
    expect(await iConsult.ageTitleMessage.getText()).toEqual(letsStartMsg);
    await browser.pause(2000);
  });
});

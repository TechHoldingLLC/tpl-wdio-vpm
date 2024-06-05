import { expect } from "@wdio/globals";
import ContactUs from "../pageobjects/contactus.page.js";
import fs from "fs";

describe("Contact Us Feature", () => {
  let pageTitle: any;
  let contactdata: any;

  before(async () => {
    await browser.url("");
    await ContactUs.contactUslink.click();
    await browser.pause(2000);
    pageTitle = JSON.parse(
      fs.readFileSync("./test/data/pageTitles.json", "utf-8")
    );
    contactdata = JSON.parse(
      fs.readFileSync("./test/data/contactus.json", "utf-8")
    );
  });

  it("C29673 Website Main Pages: Verify Contact Us Page opens error-free", async () => {
    await browser.pause(2000);
    expect(await browser.getUrl()).toContain("contactus");
    const language = await ContactUs.getLanguageFromUrl(await browser.getUrl());

    const title: string =
      language === "en"
        ? pageTitle.pg_title_contact_us
        : pageTitle.pg_title_contact_us_spanish;
    const bannerMessage: string =
      language === "en"
        ? contactdata.cu_bannerMessage
        : contactdata.cu_bannerMessage_spanish;
    const contactUsProblemText: string =
      language === "en"
        ? contactdata.cu_problemMessage
        : contactdata.cu_problemMessage_spanish;

    await expect(browser).toHaveTitle(title);
    console.log(await ContactUs.contactUsBanner.getText());
    expect(await ContactUs.contactUsBanner.getText()).toContain(bannerMessage);
    console.log(await ContactUs.contactUsForProblem.getText());
    expect(await ContactUs.contactUsForProblem.getText()).toContain(
      contactUsProblemText
    );
  });

  it("C29675 Website Main Pages: Verify Submit Contact Us form with Valid details", async () => {
    const language = await ContactUs.getLanguageFromUrl(await browser.getUrl());
    expect(await ContactUs.emailField.isDisplayed()).toBeTruthy();

    if (language === "en") {
      await ContactUs.contactUsPage(
        contactdata.cu_firstname,
        contactdata.cu_lastname,
        contactdata.cu_contactnumber,
        contactdata.cu_description,
        "en"
      );
      await browser.waitUntil(
        async () =>
          (await ContactUs.contactToastmessage.getText()) ===
          contactdata.cu_contactSuccessmessage
      );
      await expect(ContactUs.contactToastmessage).toHaveText(
        contactdata.cu_contactSuccessmessage
      );
    } else {
      await ContactUs.contactUsPage(
        contactdata.cu_firstname,
        contactdata.cu_lastname,
        contactdata.cu_contactnumber,
        contactdata.cu_description,
        ""
      );
      await browser.pause(2000);
      const message = await ContactUs.contactToastmessage;
      await expect(message).toHaveText(
        contactdata.cu_contactSuccessmessage_spanish
      );
    }
  });

  it("C29674 Website Main Pages: Verify Submit Contact Us form with Invalid details", async () => {
    const language = await ContactUs.getLanguageFromUrl(await browser.getUrl());
    expect(await ContactUs.emailField.isDisplayed()).toBeTruthy();
    if (language === "en") {
      await ContactUs.contactUsPage_invalid(
        contactdata.cu_firstname,
        contactdata.cu_lastname,
        contactdata.cu_invalid_email,
        contactdata.cu_contactnumber,
        contactdata.cu_description,
        "en"
      );
      await browser.waitUntil(
        async () =>
          (await ContactUs.contacterrormessage.getText()) ===
          contactdata.cu_errorMessage
      );
      await expect(ContactUs.contacterrormessage).toHaveText(
        contactdata.cu_errorMessage
      );
    } else {
      await ContactUs.contactUsPage_invalid(
        contactdata.cu_firstname,
        contactdata.cu_lastname,
        contactdata.cu_invalid_email,
        contactdata.cu_contactnumber,
        contactdata.cu_description,
        ""
      );
      await browser.waitUntil(
        async () =>
          (await ContactUs.contacterrormessage.getText()) ===
          contactdata.cu_errorMessage_spanish
      );
      await expect(ContactUs.contacterrormessage).toHaveText(
        contactdata.cu_errorMessage_spanish
      );
    }
  });
});

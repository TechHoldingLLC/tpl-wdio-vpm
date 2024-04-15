import { expect } from "@wdio/globals";
import ContactUs from "../pageobjects/contactus.page";
import contactdata from "../data/contactus.json";
import pagetitle from "../data/pageTitles.json";

describe("Contact Us Feature", () => {
  before("Verify Contact Us Page", async () => {
    await ContactUs.openContactus();
    await browser.maximizeWindow();
  });

  it("Verify Submit Contact Us form with Valid details - TC02", async () => {
    await expect(ContactUs.emailField.isDisplayed());
    await expect(browser).toHaveTitle(pagetitle.pg_title_contact_us);
    await ContactUs.contactUsPage(
      contactdata.cu_firstname,
      contactdata.cu_lastname,
      contactdata.cu_contactnumber,
      contactdata.cu_description
    );

    await browser.waitUntil(
      async () =>
        (await ContactUs.contactToastmessage.getText()) ===
        contactdata.cu_contactSuccessmessage
    );
    await expect(ContactUs.contactToastmessage).toHaveText(
      contactdata.cu_contactSuccessmessage
    );
  });

  it("Verify Submit Contact Us form with Invalid details - TC03", async () => {
    await expect(ContactUs.emailField.isDisplayed());
    await ContactUs.contactUsPage_invalid(
      contactdata.cu_firstname,
      contactdata.cu_lastname,
      contactdata.cu_invalid_email,
      contactdata.cu_contactnumber,
      contactdata.cu_description
    );

    await browser.waitUntil(
      async () =>
        (await ContactUs.contacterrormessage.getText()) ===
        contactdata.cu_errorMessage
    );
    await expect(ContactUs.contacterrormessage).toHaveText(
      contactdata.cu_errorMessage
    );
  });
});

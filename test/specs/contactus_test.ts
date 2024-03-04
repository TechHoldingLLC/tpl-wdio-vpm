import { expect } from "@wdio/globals";
import ContactUs from "../pageobjects/contactus.page";
import contactdata from "../data/contactus.json";
import pagetitle from "../data/pageTitles.json";

describe("Contact Us Feature", () => {
  before("Verify Contact Us Page", async () => {
    await ContactUs.openContactus();
    await browser.maximizeWindow();
  });

  it("Verify Submit Contact Us form with Valid details - TC03", async () => {
    await browser.pause(7000);
    await expect(browser).toHaveTitle(pagetitle.pg_title_contact_us);
    await ContactUs.contactUsPage(
      contactdata.option,
      contactdata.firstname,
      contactdata.lastname,
      contactdata.email,
      contactdata.contactnumber,
      contactdata.description
    );

    await browser.pause(5000);

    await browser.waitUntil(
      async () =>
        (await ContactUs.contactToastmessage.getText()) ===
        contactdata.contactSuccessmessage
    );
    await expect(ContactUs.contactToastmessage).toHaveText(
      contactdata.contactSuccessmessage
    );
  });

  it("Verify Submit Contact Us form with Invalid details - TC04", async () => {
    await browser.pause(7000);
    await ContactUs.contactUsPage(
      contactdata.option,
      contactdata.firstname,
      contactdata.lastname,
      contactdata.invalid_email,
      contactdata.contactnumber,
      contactdata.description
    );

    await browser.pause(5000);

    await browser.waitUntil(
      async () =>
        (await ContactUs.contacterrormessage.getText()) ===
        contactdata.errorMessage
    );
    await expect(ContactUs.contacterrormessage).toHaveText(
      contactdata.errorMessage
    );
  });
});

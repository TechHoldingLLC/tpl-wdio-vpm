import { expect } from "@wdio/globals";
import ContactUs from "../pageobjects/contactus.page";
import contactdata from "../data/contactus.json";

describe("Contact Us Feature", () => {
  before("Open Contact Us Page", async () => {
    await ContactUs.openContactus();
  });

  it("Submit Contact Us Page - TC03", async () => {
    await browser.pause(5000);
    await expect(browser).toHaveTitle("Contact Us | Viapromeds");
    await ContactUs.contactUsPage(
      contactdata.option,
      contactdata.firstname,
      contactdata.lastname,
      contactdata.email,
      contactdata.contactnumber,
      contactdata.description
    );

    await browser.pause(3000);

    await browser.waitUntil(
      async () =>
        (await ContactUs.contactToastmessage.getText()) ===
        contactdata.contactSuccessmessage
    );
    await expect(ContactUs.contactToastmessage).toHaveText(
      contactdata.contactSuccessmessage
    );
  });

  it("Submit Contact Us form with Invalid details - TC04", async () => {
    await browser.pause(5000);
    await ContactUs.contactUsPage(
      contactdata.option,
      contactdata.firstname,
      contactdata.lastname,
      contactdata.invalid_email,
      contactdata.contactnumber,
      contactdata.description
    );

    await browser.pause(3000);

    await browser.waitUntil(
      async () =>
        (await ContactUs.contacterrormessage.getText()) ===
        contactdata.errorMessage
    );
    await expect(ContactUs.contacterrormessage).toHaveText(
      contactdata.errorMessage
    );
    await browser.pause(3000);
  });
});

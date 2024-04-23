import { expect } from "@wdio/globals"
import ContactUs from "../pageobjects/contactus.page.js"
import fs from 'fs'

describe("Contact Us Feature", () => {
  before(async () => {
    await ContactUs.openContactus()
    await browser.maximizeWindow()
  });

  it("Verify Submit Contact Us form with Valid details - TC02", async () => {
    const pageTitle = JSON.parse(fs.readFileSync('./test/data/pageTitles.json', 'utf-8'))
    const contactdata = JSON.parse(fs.readFileSync('./test/data/contactus.json', 'utf-8'))
    const currentUrl = await browser.getUrl()
    const language = await ContactUs.getLanguageFromUrl(currentUrl)
    expect(await ContactUs.emailField.isDisplayed())
    if(language === 'en'){
      await expect(browser).toHaveTitle(pageTitle.pg_title_contact_us)
    console.log(await ContactUs.contactUsBanner.getText())
    expect(await ContactUs.contactUsBanner.getText()).toHaveText(contactdata.cu_bannerMessage)
    console.log(await ContactUs.contactUsForProblem.getText())
    expect(await ContactUs.contactUsForProblem.getText()).toHaveText(contactdata.cu_problemMessage)
    await ContactUs.contactUsPage(
      contactdata.cu_firstname,
      contactdata.cu_lastname,
      contactdata.cu_contactnumber,
      contactdata.cu_description, "en"
    )
    await browser.waitUntil(
      async () =>
        (await ContactUs.contactToastmessage.getText()) ===
        contactdata.cu_contactSuccessmessage
    )
    await expect(ContactUs.contactToastmessage).toHaveText(
      contactdata.cu_contactSuccessmessage)
    } else{
      console.log(await browser.getTitle())
      expect(await browser.getTitle()).toEqual(pageTitle.pg_title_contact_us_spanish)
      console.log(await ContactUs.contactUsBanner.getText())
      expect(await ContactUs.contactUsBanner.getText()).toHaveText(contactdata.cu_bannerMessage_spanish)
      expect(await ContactUs.contactUsForProblem.getText()).toHaveText(contactdata.cu_problemMessage_spanish)
      await ContactUs.contactUsPage(
        contactdata.cu_firstname,
        contactdata.cu_lastname,
        contactdata.cu_contactnumber,
        contactdata.cu_description,
        ''
      )
      await browser.pause(2000)
      const message = await ContactUs.contactToastmessage
      await expect(message).toHaveText(
        contactdata.cu_contactSuccessmessage_spanish)
    }
  })

  it("Verify Submit Contact Us form with Invalid details - TC03", async () => {
    const raw = fs.readFileSync('./test/data/contactus.json', 'utf-8')
    const contactdata = JSON.parse(raw)
    const currentUrl = await browser.getUrl()
    const language = await ContactUs.getLanguageFromUrl(currentUrl)
    expect(await ContactUs.emailField.isDisplayed())
    if(language === 'en'){
      await ContactUs.contactUsPage_invalid(
        contactdata.cu_firstname,
        contactdata.cu_lastname,
        contactdata.cu_invalid_email,
        contactdata.cu_contactnumber,
        contactdata.cu_description, "en"
      )
      await browser.waitUntil(
        async () =>
          (await ContactUs.contacterrormessage.getText()) ===
          contactdata.cu_errorMessage
      )
      await expect(ContactUs.contacterrormessage).toHaveText(
        contactdata.cu_errorMessage
      )
    }else{
      await ContactUs.contactUsPage_invalid(
        contactdata.cu_firstname,
        contactdata.cu_lastname,
        contactdata.cu_invalid_email,
        contactdata.cu_contactnumber,
        contactdata.cu_description, "")
        await browser.waitUntil(
          async () =>
            (await ContactUs.contacterrormessage.getText()) ===
            contactdata.cu_errorMessage_spanish
        )
        await expect(ContactUs.contacterrormessage).toHaveText(
          contactdata.cu_errorMessage_spanish
        )
    }
    
  })
})

import homePage from "../pageobjects/home.page.js"
import LoginPage from "../pageobjects/vpm_login.page.js"
import fs from 'fs'

describe("HomePage Features", () => {
  let pagetitle: any
  let homePageData: any

  before(async () => {
    await homePage.openHomepage()
    const rawData2 = fs.readFileSync('./test/data/pageTitles.json', 'utf-8')
    pagetitle = JSON.parse(rawData2)
    const rawData3 = fs.readFileSync('./test/data/homePage.json', 'utf-8')
    homePageData = JSON.parse(rawData3)
    await browser.maximizeWindow()
  })

  it("Verify all hyperlinks on the Homepage - TC04", async () => {
    expect(await homePage.aboutUs.isDisplayed()).toBe(true)
    await expect(browser).toHaveTitle(pagetitle.pg_title_home)

    for (let i = 0; i < (await LoginPage.elements.length); i++) {
      const linktext = await (await LoginPage.elements[i]).getText()
      if (linktext !== "") {
        console.log("Link Text: ", linktext)
      }
    }
  })

  it("Verify FAQ Page - TC05", async () => {
    await homePage.faqLink.scrollIntoView()
    expect(await homePage.aboutUs.isDisplayed()).toBe(true)
    await homePage.faqLink.click()
    await browser.pause(1000)
    await expect(browser).toHaveTitle(pagetitle.pg_title_faq)
    const faqBannerText = await homePage.faqBanner.getText()
    expect(faqBannerText).toHaveText("FAQs")

    await homePage.faq_iConsult_link.click()
    await browser.pause(1000)
    expect(await homePage.faq_iConsult_link).toHaveText(homePageData.faq_iConsult)
    expect(await homePage.faq_iConsult_header.getText()).toEqual(homePageData.faq_iConsult)
    expect(await homePage.iConsultFAQsInfo()).toBeTruthy()
    
    await homePage.faq_General_Questions_link.click()
    await browser.pause(1000)
    expect(await homePage.faq_General_Questions_link).toHaveText(homePageData.faq_General_Que)
    expect(await homePage.faq_gq_header.getText()).toEqual(homePageData.faq_General_Que)
    expect(await homePage.generalFAQsInfo()).toBeTruthy()

    await homePage.faq_General_Medical_Questions_link.click()
    await browser.pause(1000)
    expect(await homePage.faq_General_Medical_Questions_link).toHaveText(homePageData.faq_General_Medical_Questions)
    expect(await homePage.faq_general_medical_questions_header.getText()).toEqual(homePageData.faq_General_Medical_Questions)
    expect(await homePage.generalMedicalQuestionsFAQsInfo()).toBeTruthy()

    await homePage.faq_ED_link.click()
    await browser.pause(1000)
    expect(await homePage.faq_ED_link).toHaveText(homePageData.faq_ED)
    expect(await homePage.faq_ED_header.getText()).toEqual(homePageData.faq_ED)
    expect(await homePage.EDFAQsInfo()).toBeTruthy()

    await homePage.faq_PE_link.click()
    await browser.pause(1000)
    expect(await homePage.faq_PE_link).toHaveText(homePageData.faq_PE)
    expect(await homePage.faq_PE_header.getText()).toEqual(homePageData.faq_PE)
    expect(await homePage.PEFAQsInfo()).toBeTruthy()

    await homePage.faq_HL_link.click()
    await browser.pause(1000)
    expect(await homePage.faq_HL_link).toHaveText(homePageData.faq_HL)
    expect(await homePage.faq_HL_header.getText()).toEqual(homePageData.faq_HL)
    expect(await homePage.HLFAQsInfo()).toBeTruthy()

    await homePage.faq_GH_link.click()
    await browser.pause(1000)
    expect(await homePage.faq_GH_link).toHaveText(homePageData.faq_GH)
    expect(await homePage.faq_GH_header.getText()).toEqual(homePageData.faq_GH)
    expect(await homePage.GHFAQsInfo()).toBeTruthy()
  })

  it("Verify How it Works Page - TC06", async () => {
    await homePage.howitworksLink.scrollIntoView()
    expect(await homePage.howitworksLink.isDisplayed()).toBe(true)
    await homePage.howitworksLink.click()
    await expect(browser).toHaveTitle(pagetitle.pg_title_howitworks)
    const howitworksHeaderText = await homePage.howitworksHeader.getText()
    expect(howitworksHeaderText).toHaveText(pagetitle.pg_title_howitworks)
    const validateHowItWorksOptions = await homePage.validateHowItWorksItems()
    expect(validateHowItWorksOptions).toBeTruthy()
  })

  it("Verify Terms of Use Page - TC07", async () => {
    await homePage.TermsOfUseLink.scrollIntoView()
    await homePage.TermsOfUseLink.click()
    const l = await browser.getWindowHandles()
    console.log(l)
    await browser.switchToWindow(l[1])
    const url = await browser.getUrl()
    expect(url).toHaveText("terms-conditions")
    await expect(browser).toHaveTitle(pagetitle.pg_title_TermsOfUse)
    await expect(await homePage.title).toHaveText(
      homePageData.terms_of_use_title
    )
  })

  it("Verify Telehealth Consent Page - TC08", async () => {
    await homePage.TeleHealthConsentLink.scrollIntoView()
    await homePage.TeleHealthConsentLink.click()
    const l = await browser.getWindowHandles()
    console.log(l)
    await browser.switchToWindow(l[2])
    const url = await browser.getUrl()
    expect(url).toHaveText("telehealth-consent")
    await expect(browser).toHaveTitle(pagetitle.pg_title_Telehealth_Consent)
    expect(await homePage.title).toHaveText(homePageData.telehealth_consent_title)
  })

  it("Verify Privacy Policy Page- TC09", async () => {
    await homePage.PrivacyPolicyLink.scrollIntoView()
    await homePage.PrivacyPolicyLink.click()
    const l = await browser.getWindowHandles()
    console.log(l)
    await browser.switchToWindow(l[3])
    const url = await browser.getUrl()
    expect(url).toHaveText("privacy-policy")
    await expect(browser).toHaveTitle(pagetitle.pg_title_PrivacyPolicy)
    expect(await homePage.title).toHaveText(homePageData.privacy_policy_title)
  })

  it("Verify FB Redirection Page - TC10", async () => {
    await homePage.FBLink.scrollIntoView()
    await homePage.FBLink.click()
    const l = await browser.getWindowHandles()
    console.log(l)
    await browser.switchToWindow(l[4])
    await expect(browser).toHaveTitle(pagetitle.pg_title_FB)
    const url = await browser.getUrl()
    expect(url).toHaveText("facebook")
    await browser.switchToWindow(l[3])
  })

  it("Verify Youtube Redirection Page - TC11", async () => {
    await homePage.YouTubeLink.scrollIntoView()
    await homePage.YouTubeLink.click()
    const l = await browser.getWindowHandles()
    console.log(l)
    await browser.switchToWindow(l[5])
    await expect(browser).toHaveTitle(pagetitle.pg_title_YouTube)
    const url = browser.getUrl()
    expect(url).toHaveText("youtube")
    await browser.switchToWindow(l[3])
  })

  it("Verify Instagram Redirection Page - TC12", async () => {
    await homePage.InstaLink.scrollIntoView()
    await homePage.InstaLink.click()
    const l = await browser.getWindowHandles()
    console.log(l)
    await browser.switchToWindow(l[6])
    await expect(browser).toHaveTitle(pagetitle.pg_title_Instagram)
    const url = browser.getUrl()
    expect(url).toHaveText("instagram")
    await browser.switchToWindow(l[3])
  })
})

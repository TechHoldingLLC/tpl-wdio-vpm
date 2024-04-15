import homePage from "../pageobjects/home.page";
import LoginPage from "../pageobjects/vpm_login.page";
import pagetitle from "../data/pageTitles.json";
import homePageData from "../data/homePage.json";

describe("HomePage Features", () => {
  before("Verify VPM Homepage", async () => {
    await homePage.openHomepage();
  });

  it("Verify all hyperlinks on the Homepage - TC04", async () => {
    await expect(homePage.aboutUs.isDisplayed());
    await expect(browser).toHaveTitle(pagetitle.pg_title_home);
    for (let i = 0; i < (await LoginPage.elements.length); i++) {
      const linktext = await (await LoginPage.elements[i]).getText();
      if (linktext !== "") {
        console.log("Link Text: ", linktext);
      }
    }
  });

  it("Verify FAQ Page - TC05", async () => {
    await homePage.faqLink.scrollIntoView();
    await expect((await homePage.aboutUs).isDisplayed());
    await homePage.faqLink.click();
    await browser.pause(1000);
    await expect(browser).toHaveTitle(pagetitle.pg_title_faq);
    await homePage.faq_iConsult_link.click();
    await browser.pause(1000);
    await expect(homePage.faq_iConsult_link).toHaveText(
      homePageData.faq_iConsult
    );
    await homePage.faq_iconsult_last_que.click();
    await browser.pause(1000);
    await expect(homePage.faq_iconsult_last_que).toHaveText(
      homePageData.faq_iConsult_last_que
    );
    await homePage.faq_General_Que_link.click();
    await browser.pause(1000);
    await expect(homePage.faq_General_Que_link).toHaveText(
      homePageData.faq_General_Que
    );
    await homePage.faq_General_Que_last_que.click();
    await browser.pause(1000);
    await expect(homePage.faq_General_Que_last_que).toHaveText(
      homePageData.faq_General_Que_last_question
    );
    await homePage.faq_General_Medi_link.click();
    await browser.pause(1000);
    await expect(homePage.faq_General_Medi_link).toHaveText(
      homePageData.faq_General_Medi
    );
    await homePage.faq_General_Medi_last_que.click();
    await browser.pause(1000);
    await expect(homePage.faq_General_Medi_last_que).toHaveText(
      homePageData.faq_General_Medi_last_que
    );
    await homePage.faq_ED_link.click();
    await browser.pause(1000);
    await expect(homePage.faq_ED_link).toHaveText(homePageData.faq_ED);
    await homePage.faq_ED_last_que.click();
    await browser.pause(1000);
    await expect(homePage.faq_ED_last_que).toHaveText(
      homePageData.faq_ED_last_que
    );
    await homePage.faq_PE_link.click();
    await browser.pause(1000);
    await expect(homePage.faq_PE_link).toHaveText(homePageData.faq_PE);
    await homePage.faq_PE_last_que.click();
    await browser.pause(1000);
    await expect(homePage.faq_PE_last_que).toHaveText(
      homePageData.faq_PE_last_que
    );
    await homePage.faq_HL_link.click();
    await browser.pause(1000);
    await expect(homePage.faq_HL_link).toHaveText(homePageData.faq_HL);
    await homePage.faq_HL_last_que.click();
    await browser.pause(1000);
    await expect(homePage.faq_HL_last_que).toHaveText(
      homePageData.faq_HL_last_que
    );
    await homePage.faq_GH_link.click();
    await browser.pause(1000);
    await expect(homePage.faq_GH_link).toHaveText(homePageData.faq_GH);
    await homePage.faq_GH_last_que.click();
    await browser.pause(1000);
    await expect(homePage.faq_GH_last_que).toHaveText(
      homePageData.faq_GH_last_que
    );
  });

  it("Verify How it Works Page - TC06", async () => {
    await homePage.howitworksLink.scrollIntoView();
    await expect((await homePage.howitworksLink).isDisplayed());
    await homePage.howitworksLink.click();
    await expect(browser).toHaveTitle(pagetitle.pg_title_howitworks);
  });

  it("Verify Terms of Use Page - TC07", async () => {
    await homePage.TermsOfUseLink.scrollIntoView();
    await homePage.TermsOfUseLink.click();
    const l = await browser.getWindowHandles();
    await console.log(l);
    await browser.switchToWindow(l[1]);
    await expect(browser).toHaveTitle(pagetitle.pg_title_TermsOfUse);
    await expect(await homePage.title).toHaveText(
      homePageData.terms_of_use_title
    );
  });
  it("Verify Telehealth Consent Page - TC08", async () => {
    await homePage.TeleHealthConsentLink.scrollIntoView();
    await homePage.TeleHealthConsentLink.click();
    const l = await browser.getWindowHandles();
    await console.log(l);
    await browser.switchToWindow(l[2]);
    await expect(browser).toHaveTitle(pagetitle.pg_title_Telehealth_Consent);
    await expect(await homePage.title).toHaveText(
      homePageData.telehealth_consent_title
    );
  });
  it("Verify Privacy Policy Page- TC09", async () => {
    await homePage.PrivacyPolicyLink.scrollIntoView();
    await homePage.PrivacyPolicyLink.click();
    const l = await browser.getWindowHandles();
    await console.log(l);
    await browser.switchToWindow(l[3]);
    await expect(browser).toHaveTitle(pagetitle.pg_title_PrivacyPolicy);
    await expect(await homePage.title).toHaveText(
      homePageData.privacy_policy_title
    );
  });
  it("Verify FB Redirection Page - TC10", async () => {
    await homePage.FBLink.scrollIntoView();
    await homePage.FBLink.click();
    const l = await browser.getWindowHandles();
    await console.log(l);
    await browser.switchToWindow(l[4]);
    await expect(browser).toHaveTitle(pagetitle.pg_title_FB);
    await browser.switchToWindow(l[3]);
  });
  it("Verify Youtube Redirection Page - TC11", async () => {
    await homePage.YouTubeLink.scrollIntoView();
    await homePage.YouTubeLink.click();
    const l = await browser.getWindowHandles();
    await console.log(l);
    await browser.switchToWindow(l[5]);
    await expect(browser).toHaveTitle(pagetitle.pg_title_YouTube);
    await browser.switchToWindow(l[3]);
  });
  it("Verify Instagram Redirection Page - TC12", async () => {
    await homePage.InstaLink.scrollIntoView();
    await homePage.InstaLink.click();
    const l = await browser.getWindowHandles();
    await console.log(l);
    await browser.switchToWindow(l[6]);
    await expect(browser).toHaveTitle(pagetitle.pg_title_Instagram);
    await browser.switchToWindow(l[3]);
  });
});

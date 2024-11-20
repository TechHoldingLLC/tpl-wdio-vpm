import { $ } from "@wdio/globals";
import Page from "./page.js";
import pkg from "lodash";
const { isEqual } = pkg;

class HomePage extends Page {
  // ---------- Navigation Links ----------

  /**
   * Returns the 'Contact Us' link element.
   */
  public get contactUs() {
    return $(
      "//a[contains(@class, 'Header_nav-link') and contains(@href, '/contactus')]"
    );
  }

  /**
   * Returns the 'About Us' link element.
   */
  public get aboutUs() {
    return $(
      "//a[contains(@class, 'Header_nav-link') and contains(@href, '/aboutus')]"
    );
  }

  /**
   * Returns the 'Sign In' button element.
   */
  public get btnSubmit() {
    return $('[value$="Sign In"]');
  }

  // ---------- FAQ Section ----------

  /**
   * Returns the 'FAQ' link element.
   */
  public get faqLink() {
    return $("//a[text() = 'FAQ' or text() = 'Preguntas Frecuentes']");
  }

  /**
   * Returns the banner element for 'FAQ'.
   */
  public get faqBanner() {
    return $("section[class='aboutus-banner'] div h2");
  }

  /**
   * Returns the 'iConsult' FAQ link element.
   */
  public get faq_iConsult_link() {
    return $("[href='#box-1']");
  }

  /**
   * Returns the header for 'iConsult' FAQ section.
   */
  public get faq_iConsult_header() {
    return $("(//section[@class='faq-content']/h2)[1]");
  }

  /**
   * Validates FAQs in the 'iConsult' section.
   *
   * @returns {Promise<boolean>} - Returns true if all FAQs have non-empty text, otherwise false.
   */
  public async iConsultFAQsInfo(): Promise<boolean> {
    const FAQs = await browser.$$(
      "//section[@id='box-1']/div/div[@class='accordion-item']"
    );
    for (let i = 0; i < FAQs.length; i++) {
      const collapse = FAQs[i];
      await collapse.scrollIntoView();
      await collapse.click();
      await browser.pause(2000);
      const text = await $$("//div[@class='answer-content ']/p[1]");
      if (text.length === 0) {
        console.error(`No text found for FAQ ${i + 1}`);
        return false;
      }
      const faqText = await text[i].getText();
      console.log("Text is: " + faqText);
      if (faqText.trim() === "") {
        return false;
      }
    }
    return true;
  }

  /**
   * Returns the last question in the 'iConsult' FAQ section.
   */
  public get faq_iconsult_last_que() {
    return $(
      "//p[contains(text(),'What does it mean if I can no longer proceed throu')]"
    );
  }

  /**
   * Returns the 'General Questions' FAQ link element.
   */
  public get faq_General_Questions_link() {
    return $("[href='#box-2']");
  }

  /**
   * Returns the header for 'General Questions' FAQ section.
   */
  public get faq_gq_header() {
    return $("(//section[@class='faq-content']/h2)[2]");
  }

  /**
   * Validates FAQs in the 'General Questions' section.
   *
   * @returns {Promise<boolean>} - Returns true if all FAQs have non-empty text, otherwise false.
   */
  public async generalFAQsInfo(): Promise<boolean> {
    const generalFAQsQuestions = await browser.$$(
      "//section[@id='box-2']/div/div[@class='accordion-item']"
    );
    for (let i = 0; i < generalFAQsQuestions.length; i++) {
      const collapse = generalFAQsQuestions[i];
      await collapse.scrollIntoView();
      await collapse.click();
      await browser.pause(2000);
      const text = await $$("//div[@class='answer-content ']/p[1]");
      if (text.length === 0) {
        console.error(`No text found for FAQ ${i + 1}`);
        return false;
      }
      const faqText = await text[i].getText();
      console.log("Text is: " + faqText);
      if (faqText.trim() === "") {
        return false;
      }
    }
    return true;
  }

  /**
   * Returns the last question in the 'General Questions' FAQ section.
   */
  public get faq_General_Que_last_que() {
    return $(
      "//p[contains(text(),'What if I want to change or cancel my subscription')]"
    );
  }

  /**
   * Returns the 'General Medical Questions' FAQ link element.
   */
  public get faq_General_Medical_Questions_link() {
    return $("[href='#box-3']");
  }

  /**
   * Returns the header for 'General Medical Questions' FAQ section.
   */
  public get faq_general_medical_questions_header() {
    return $("(//section[@class='faq-content']/h2)[3]");
  }

  /**
   * Validates FAQs in the 'General Medical Questions' section.
   *
   * @returns {Promise<boolean>} - Returns true if all FAQs have non-empty text, otherwise false.
   */
  public async generalMedicalQuestionsFAQsInfo(): Promise<boolean> {
    const generalMedicalFAQsQuestions = await browser.$$(
      "//section[@id='box-3']/div/div[@class='accordion-item']"
    );
    for (let i = 0; i < generalMedicalFAQsQuestions.length; i++) {
      const collapse = generalMedicalFAQsQuestions[i];
      await collapse.scrollIntoView();
      await collapse.click();
      await browser.pause(2000);
      const text = await $$("//div[@class='answer-content ']/p[1]");
      if (text.length === 0) {
        console.error(`No text found for FAQ ${i + 1}`);
        return false;
      }
      const faqText = await text[i].getText();
      console.log("Text is: " + faqText);
      if (faqText.trim() === "") {
        return false;
      }
    }
    return true;
  }

  /**
   * Returns the last question in the 'General Medical Questions' FAQ section.
   */
  public get faq_General_Medi_last_que() {
    return $("//p[normalize-space()='Can I increase my dosage?']");
  }

  /**
   * Returns the 'ED Treatment' FAQ link element.
   */
  public get faq_ED_link() {
    return $("[href='#box-4']");
  }

  /**
   * Returns the header for 'ED Treatment' FAQ section.
   */
  public get faq_ED_header() {
    return $("(//section[@class='faq-content']/h2)[4]");
  }

  /**
   * Validates FAQs in the 'ED Treatment' section.
   *
   * @returns {Promise<boolean>} - Returns true if all FAQs have non-empty text, otherwise false.
   */
  public async EDFAQsInfo(): Promise<boolean> {
    const EDFAQsQuestions = await browser.$$(
      "//section[@id='box-4']/div/div[@class='accordion-item']"
    );
    for (let i = 0; i < EDFAQsQuestions.length; i++) {
      const collapse = EDFAQsQuestions[i];
      await collapse.scrollIntoView();
      await collapse.click();
      await browser.pause(2000);
      const text = await $$("//div[@class='answer-content ']/p[1]");
      if (text.length === 0) {
        console.error(`No text found for FAQ ${i + 1}`);
        return false;
      }
      const faqText = await text[i].getText();
      console.log("Text is: " + faqText);
      if (faqText.trim() === "") {
        return false;
      }
    }
    return true;
  }

  /**
   * Returns the last question in the 'ED Treatment' FAQ section.
   */
  public get faq_ED_last_que() {
    return $(
      "//p[contains(text(),'What is the difference between Sildenafil and Tada')]"
    );
  }

  /**
   * Returns the 'PE Treatment' FAQ link element.
   */
  public get faq_PE_link() {
    return $("[href='#box-5']");
  }

  /**
   * Returns the header for 'PE Treatment' FAQ section.
   */
  public get faq_PE_header() {
    return $("(//section[@class='faq-content']/h2)[5]");
  }

  /**
   * Validates FAQs in the 'PE Treatment' section.
   *
   * @returns {Promise<boolean>} - Returns true if all FAQs have non-empty text, otherwise false.
   */
  public async PEFAQsInfo(): Promise<boolean> {
    const PEFAQsQuestions = await browser.$$(
      "//section[@id='box-5']/div/div[@class='accordion-item']"
    );
    for (let i = 0; i < PEFAQsQuestions.length; i++) {
      const collapse = PEFAQsQuestions[i];
      await collapse.scrollIntoView();
      await collapse.click();
      await browser.pause(2000);
      const text = await $$("//div[@class='answer-content ']/p[1]");
      if (text.length === 0) {
        console.error(`No text found for FAQ ${i + 1}`);
        return false;
      }
      const faqText = await text[i].getText();
      console.log("Text is: " + faqText);
      if (faqText.trim() === "") {
        return false;
      }
    }
    return true;
  }

  /**
   * Returns the last question in the 'PE Treatment' FAQ section.
   */
  public get faq_PE_last_que() {
    return $(
      "//p[contains(text(),'Can I take erectile dysfunction medications togeth')]"
    );
  }

  /**
   * Returns the 'HL Treatment' FAQ link element.
   */
  public get faq_HL_link() {
    return $("[href='#box-6']");
  }

  /**
   * Returns the header for 'HL Treatment' FAQ section.
   */
  public get faq_HL_header() {
    return $("(//section[@class='faq-content']/h2)[6]");
  }

  /**
   * Validates FAQs in the 'HL Treatment' section.
   *
   * @returns {Promise<boolean>} - Returns true if all FAQs have non-empty text, otherwise false.
   */
  public async HLFAQsInfo(): Promise<boolean> {
    const HLFAQsQuestions = await browser.$$(
      "//section[@id='box-6']/div/div[@class='accordion-item']"
    );
    for (let i = 0; i < HLFAQsQuestions.length; i++) {
      const collapse = HLFAQsQuestions[i];
      await collapse.scrollIntoView();
      await collapse.click();
      await browser.pause(2000);
      const text = await $$("//div[@class='answer-content ']/p[1]");
      if (text.length === 0) {
        console.error(`No text found for FAQ ${i + 1}`);
        return false;
      }
      const faqText = await text[i].getText();
      console.log("Text is: " + faqText);
      if (faqText.trim() === "") {
        return false;
      }
    }
    return true;
  }

  /**
   * Returns the last question in the 'HL Treatment' FAQ section.
   */
  public get faq_HL_last_que() {
    return $(
      "//p[contains(text(),'How long does it take for hair loss treatment to w')]"
    );
  }

  /**
   * Returns the 'GH Treatment' FAQ link element.
   */
  public get faq_GH_link() {
    return $("[href='#box-7']");
  }

  /**
   * Returns the header for 'GH Treatment' FAQ section.
   */
  public get faq_GH_header() {
    return $("(//section[@class='faq-content']/h2)[7]");
  }

  /**
   * Validates FAQs in the 'GH Treatment' section.
   *
   * @returns {Promise<boolean>} - Returns true if all FAQs have non-empty text, otherwise false.
   */
  public async GHFAQsInfo(): Promise<boolean> {
    const GHFAQsQuestions = await browser.$$(
      "//section[@id='box-7']/div/div[@class='accordion-item']"
    );
    for (let i = 0; i < GHFAQsQuestions.length; i++) {
      const collapse = GHFAQsQuestions[i];
      await collapse.scrollIntoView();
      await collapse.click();
      await browser.pause(2000);
      const text = await $$("//div[@class='answer-content ']/p[1]");
      if (text.length === 0) {
        console.error(`No text found for FAQ ${i + 1}`);
        return false;
      }
      const faqText = await text[i].getText();
      console.log("Text is: " + faqText);
      if (faqText.trim() === "") {
        return false;
      }
    }
    return true;
  }

  /**
   * Returns the last question in the 'GH Treatment' FAQ section.
   */
  public get faq_GH_last_que() {
    return $(
      "//p[contains(text(),'What type of genital herpes medication is availabl')]"
    );
  }

  // ---------- Footer Links ----------

  /**
   * Returns the 'Terms of Use' link element.
   */
  public get TermsOfUseLink() {
    return $(
      "//a[contains(@class, 'Footer_footer-link') and contains(@href, 'terms-conditions')]"
    );
  }

  /**
   * Returns the 'TeleHealth Consent' link element.
   */
  public get TeleHealthConsentLink() {
    return $(
      "//a[contains(@class, 'Footer_footer-link') and contains(@href, 'telehealth-consent')]"
    );
  }

  /**
   * Returns the 'Privacy Policy' link element.
   */
  public get PrivacyPolicyLink() {
    return $(
      "//a[contains(@class, 'Footer_footer-link') and contains(@href, 'privacy-policy')]"
    );
  }

  // ---------- Social Media Links ----------

  /**
   * Returns the Facebook link element.
   */
  public get FBLink() {
    return $("[href$='https://www.facebook.com/Viapromeds']");
  }

  /**
   * Returns the Facebook icon element.
   */
  public get FBIcon() {
    return $("div[class='Footer_copyright-social__LiYrl'] p");
  }

  /**
   * Returns the YouTube link element.
   */
  public get YouTubeLink() {
    return $("[href$='https://www.youtube.com/@DrDanielLinares']");
  }

  /**
   * Returns the Instagram link element.
   */
  public get InstaLink() {
    return $(
      "[href$='https://www.instagram.com/doctor_linares/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA%3D%3D']"
    );
  }

  // ---------- How It Works Section ----------

  /**
   * Returns the 'How It Works' link element.
   */
  public get howitworksLink() {
    return $(
      "//a[contains(@class, 'Footer_footer-link') and contains(@href, 'howitworks')]"
    );
  }

  /**
   * Returns the header for 'How It Works' section.
   */
  public get howitworksHeader() {
    return $('//section[@class="how-it-works-sec"]/div/h2');
  }

  /**
   * Returns the list of items in the 'How It Works' section.
   */
  public get howitworksItemList() {
    return $$('//div[@class="how-it-works-list"]/div/h6');
  }

  /**
   * Validates the items in the 'How It Works' section.
   *
   * @param {string[]} expectedHowItWorksListItems - The expected list of items.
   * @returns {Promise<boolean>} - Returns true if the actual items match the expected items, otherwise false.
   */
  public async validateHowItWorksItems(
    expectedHowItWorksListItems: string[]
  ): Promise<boolean> {
    const howItWorksItemList = await this.howitworksItemList;

    if (howItWorksItemList.length === 0) {
      console.error("How It Works options are not found.");
      return false;
    }
    const actualHowItWorksListItems: string[] = [];

    for (let i = 0; i < howItWorksItemList.length; i++) {
      await howItWorksItemList[i].waitForDisplayed();
      const howItWorkItemText = await howItWorksItemList[i].getText();
      console.log(howItWorkItemText);
      actualHowItWorksListItems.push(howItWorkItemText);
    }
    console.log(
      `Actual How It Works List Items: "${actualHowItWorksListItems}"`
    );
    return isEqual(
      actualHowItWorksListItems.sort(),
      expectedHowItWorksListItems.sort()
    );
  }

  // ---------- Other Elements ----------

  /**
   * Returns the hamburger icon element.
   */
  public get hamburgericon() {
    return $("[class$='btn-rounded Header_btn-user__RSRGo']");
  }

  /**
   * Returns the list of all links on the page.
   */
  public get links() {
    return $$("//a");
  }

  /**
   * Returns the language selection dropdown element.
   */
  public get languageSelection() {
    return $(
      "//span[contains(@class,'Header_lang-item')]//span[contains(@class, 'Header_ic-arrow')]"
    );
  }

  /**
   * Returns the 'ED Treatment' product element.
   */
  public get edTreatmentProduct() {
    return $('(//div[@class="treatment-list"]/div/a)[1]');
  }

  /**
   * Returns the 'PE Treatment' product element.
   */
  public get peTreatmentProduct() {
    return $('(//div[@class="treatment-list"]/div/a)[2]');
  }

  /**
   * Returns the 'HL Treatment' product element.
   */
  public get hlTreatmentProduct() {
    return $('(//div[@class="treatment-list"]/div/a)[3]');
  }

  /**
   * Returns the 'GH Treatment' product element.
   */
  public get ghTreatmentProduct() {
    return $('(//div[@class="treatment-list"]/div/a)[4]');
  }

  /**
   * Returns the 'Get Started iConsult' button element.
   */
  public get getStartediConsultButton() {
    return $(
      "//div[contains(@class, 'Landing_btn-group')]/a[contains(@href, 'start-iconsult')]"
    );
  }

  public get footerHeaders() {
    return $$("//div[contains(@class, 'menu')]/descendant::h5");
  }

  public get productList() {
    return $$(
      "//h5[contains(text(), 'PRODUCTS') or contains(text(), 'PRODUCTOS')]/parent::div/ul/li"
    );
  }

  public get legalList() {
    return $$("//h5[contains(text(), 'LEGAL')]/parent::div/ul/li");
  }

  public get supportList() {
    return $$(
      "//h5[contains(text(), 'SUPPORT') or contains(text(), 'APOYO')]/parent::div/ul/li"
    );
  }

  /**
   * Returns the footer menu element.
   */
  public get footerMenu() {
    return $("//div[contains(@class, 'Footer_footer-top')]");
  }

  /**
   * Returns the list of footer menu items.
   */
  public get footerMenuItemList() {
    return $$(
      "//div[contains(@class, 'Footer_footer-top')]//div[contains(@class, 'Footer_footer-menu-item')]"
    );
  }

  /**
   * Validates the footer menu items.
   *
   * @param {string[]} expectedFooterMenuItems - The expected list of footer menu items.
   * @returns {Promise<boolean>} - Returns true if the actual items match the expected items, otherwise false.
   */
  public async validateFooterMenuItems(
    expectedFooterMenuItems: string[]
  ): Promise<boolean> {
    const footerMenuItemList = await this.footerMenuItemList;

    if (footerMenuItemList.length === 0) {
      console.error("Footer menu items are not found.");
      return false;
    }

    const actualFooterMenuItems: string[] = [];

    for (let i = 0; i < footerMenuItemList.length; i++) {
      const footerMenuItemText = await footerMenuItemList[i].getText();
      console.log(footerMenuItemText);
      actualFooterMenuItems.push(footerMenuItemText);
    }

    console.log(`Actual Footer Menu Items: "${actualFooterMenuItems}"`);
    return isEqual(
      actualFooterMenuItems.sort(),
      expectedFooterMenuItems.sort()
    );
  }

  // ---------- Miscellaneous ----------

  /**
   * Returns the 'Get Started' button element.
   */
  public get getStarted() {
    return $("//div[@class='Landing_btn-group']//a[@href='/get-started']");
  }

  /**
   * Returns the page header element.
   */
  public get pageHeader() {
    return $("header h1");
  }

  public async navigateToFooter(): Promise<void> {
    await browser.pause(1500);
  }

  public get tileED() {
    return $("//*[@class='treatment-list']/div[1]/a");
  }

}

export default new HomePage();

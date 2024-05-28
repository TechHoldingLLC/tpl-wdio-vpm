import { $ } from "@wdio/globals";
import Page from "./page.js";
import pkg from "lodash";
const { isEqual } = pkg;

class HomePage extends Page {
  public get contactUs() {
    return $(
      "//a[contains(@class, 'Header_nav-link') and contains(@href, '/contactus')]"
    );
  }

  public get aboutUs() {
    return $(
      "//a[contains(@class, 'Header_nav-link') and contains(@href, '/aboutus')]"
    );
  }

  public get btnSubmit() {
    return $('[value$="Sign In"]');
  }

  public get faqLink() {
    return $(
      "//a[contains(@class, 'Footer_footer-link') and contains(@href, 'faq')]"
    );
  }

  public get faqBanner() {
    return $("section[class='aboutus-banner'] div h2");
  }

  public get faq_iConsult_link() {
    return $("[href='#box-1']");
  }

  public get faq_iConsult_header() {
    return $("(//section[@class='faq-content']/h2)[1]");
  }

  public async iConsultFAQsInfo() {
    const FAQs = await browser.$$(
      "//section[@id='box-1']/div/div[@class='accordion-item']"
    );
    for (let i = 0; i < FAQs.length; i++) {
      const collapse = FAQs[i];
      await collapse.click();
      await browser.pause(2000);
      const text = await $$("//div[@class='answer-content ']/p[1]");
      if (text.length === 0) {
        console.error(`No text found for FAQ ${i + 1}`);
        return false;
      }
      let faqText = await text[i].getText();
      console.log("Text is: " + faqText);
      if (faqText.trim() == "") {
        return false;
      }
    }
    return true;
  }

  public get faq_iconsult_last_que() {
    return $(
      "//p[contains(text(),'What does it mean if I can no longer proceed throu')]"
    );
  }
  public get faq_General_Questions_link() {
    return $("[href='#box-2']");
  }

  public get faq_gq_header() {
    return $("(//section[@class='faq-content']/h2)[2]");
  }

  public async generalFAQsInfo() {
    const generalFAQsQuestions = await browser.$$(
      "//section[@id='box-2']/div/div[@class='accordion-item']"
    );
    for (let i = 0; i < generalFAQsQuestions.length; i++) {
      const collapse = generalFAQsQuestions[i];
      await collapse.click();
      await browser.pause(2000);
      const text = await $$("//div[@class='answer-content ']/p[1]");
      if (text.length === 0) {
        console.error(`No text found for FAQ ${i + 1}`);
        return false;
      }
      let faqText = await text[i].getText();
      console.log("Text is: " + faqText);
      if (faqText.trim() == "") {
        return false;
      }
    }
    return true;
  }

  public get faq_General_Que_last_que() {
    return $(
      "//p[contains(text(),'What if I want to change or cancel my subscription')]"
    );
  }

  public get faq_General_Medical_Questions_link() {
    return $("[href='#box-3']");
  }

  public get faq_general_medical_questions_header() {
    return $("(//section[@class='faq-content']/h2)[3]");
  }

  public async generalMedicalQuestionsFAQsInfo() {
    const generalMedicalFAQsQuestions = await browser.$$(
      "//section[@id='box-3']/div/div[@class='accordion-item']"
    );
    for (let i = 0; i < generalMedicalFAQsQuestions.length; i++) {
      const collapse = generalMedicalFAQsQuestions[i];
      await collapse.click();
      await browser.pause(2000);
      const text = await $$("//div[@class='answer-content ']/p[1]");
      if (text.length === 0) {
        console.error(`No text found for FAQ ${i + 1}`);
        return false;
      }
      let faqText = await text[i].getText();
      console.log("Text is: " + faqText);
      if (faqText.trim() == "") {
        return false;
      }
    }
    return true;
  }

  public get faq_General_Medi_last_que() {
    return $("//p[normalize-space()='Can I increase my dosage?']");
  }

  public get faq_ED_link() {
    return $("[href='#box-4']");
  }

  public get faq_ED_header() {
    return $("(//section[@class='faq-content']/h2)[4]");
  }

  public async EDFAQsInfo() {
    const EDFAQsQuestions = await browser.$$(
      "//section[@id='box-4']/div/div[@class='accordion-item']"
    );
    for (let i = 0; i < EDFAQsQuestions.length; i++) {
      const collapse = EDFAQsQuestions[i];
      await collapse.click();
      await browser.pause(2000);
      const text = await $$("//div[@class='answer-content ']/p[1]");
      if (text.length === 0) {
        console.error(`No text found for FAQ ${i + 1}`);
        return false;
      }
      let faqText = await text[i].getText();
      console.log("Text is: " + faqText);
      if (faqText.trim() == "") {
        return false;
      }
    }
    return true;
  }

  public get faq_ED_last_que() {
    return $(
      "//p[contains(text(),'What is the difference between Sildenafil and Tada')]"
    );
  }
  public get faq_PE_link() {
    return $("[href='#box-5']");
  }

  public get faq_PE_header() {
    return $("(//section[@class='faq-content']/h2)[5]");
  }

  public async PEFAQsInfo() {
    const PEFAQsQuestions = await browser.$$(
      "//section[@id='box-5']/div/div[@class='accordion-item']"
    );
    for (let i = 0; i < PEFAQsQuestions.length; i++) {
      const collapse = PEFAQsQuestions[i];
      await collapse.click();
      await browser.pause(2000);
      const text = await $$("//div[@class='answer-content ']/p[1]");
      if (text.length === 0) {
        console.error(`No text found for FAQ ${i + 1}`);
        return false;
      }
      let faqText = await text[i].getText();
      console.log("Text is: " + faqText);
      if (faqText.trim() == "") {
        return false;
      }
    }
    return true;
  }

  public get faq_PE_last_que() {
    return $(
      "//p[contains(text(),'Can I take erectile dysfunction medications togeth')]"
    );
  }
  public get faq_HL_link() {
    return $("[href='#box-6']");
  }

  public get faq_HL_header() {
    return $("(//section[@class='faq-content']/h2)[6]");
  }

  public async HLFAQsInfo() {
    const HLFAQsQuestions = await browser.$$(
      "//section[@id='box-6']/div/div[@class='accordion-item']"
    );
    for (let i = 0; i < HLFAQsQuestions.length; i++) {
      const collapse = HLFAQsQuestions[i];
      await collapse.click();
      await browser.pause(2000);
      const text = await $$("//div[@class='answer-content ']/p[1]");
      if (text.length === 0) {
        console.error(`No text found for FAQ ${i + 1}`);
        return false;
      }
      let faqText = await text[i].getText();
      console.log("Text is: " + faqText);
      if (faqText.trim() == "") {
        return false;
      }
    }
    return true;
  }

  public get faq_HL_last_que() {
    return $(
      "//p[contains(text(),'How long does it take for hair loss treatment to w')]"
    );
  }

  public get faq_GH_link() {
    return $("[href='#box-7']");
  }

  public get faq_GH_header() {
    return $("(//section[@class='faq-content']/h2)[7]");
  }

  public async GHFAQsInfo() {
    const HLFAQsQuestions = await browser.$$(
      "//section[@id='box-7']/div/div[@class='accordion-item']"
    );
    for (let i = 0; i < HLFAQsQuestions.length; i++) {
      const collapse = HLFAQsQuestions[i];
      await collapse.click();
      await browser.pause(2000);
      const text = await $$("//div[@class='answer-content ']/p[1]");
      if (text.length === 0) {
        console.error(`No text found for FAQ ${i + 1}`);
        return false;
      }
      let faqText = await text[i].getText();
      console.log("Text is: " + faqText);
      if (faqText.trim() == "") {
        return false;
      }
    }
    return true;
  }

  public get faq_GH_last_que() {
    return $(
      "//p[contains(text(),'What type of genital herpes medication is availabl')]"
    );
  }

  public get TermsOfUseLink() {
    return $(
      "//a[contains(@class, 'Footer_footer-link') and contains(@href, 'terms-conditions')]"
    );
  }

  public get TeleHealthConsentLink() {
    return $(
      "//a[contains(@class, 'Footer_footer-link') and contains(@href, 'telehealth-consent')]"
    );
  }

  public get PrivacyPolicyLink() {
    return $(
      "//a[contains(@class, 'Footer_footer-link') and contains(@href, 'privacy-policy')]"
    );
  }

  public get FBLink() {
    return $("[href$='https://www.facebook.com/Viapromeds']");
  }

  public get YouTubeLink() {
    return $("[href$='https://www.youtube.com/@DrDanielLinares']");
  }

  public get InstaLink() {
    return $(
      "[href$='https://www.instagram.com/doctor_linares/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA%3D%3D']"
    );
  }

  public get title() {
    return $("h2");
  }

  public get howitworksLink() {
    return $(
      "//a[contains(@class, 'Footer_footer-link') and contains(@href, 'howitworks')]"
    );
  }

  public get howitworksHeader() {
    return $('//section[@class="how-it-works-sec"]/div/h2');
  }

  public get howitworksItemList() {
    return $$('//div[@class="how-it-works-list"]/div/h6');
  }

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
    if (
      isEqual(
        actualHowItWorksListItems.sort(),
        expectedHowItWorksListItems.sort()
      )
    ) {
      return true;
    }
    return false;
  }

  get hamburgericon() {
    return $("[class$='btn-rounded Header_btn-user__RSRGo']");
  }

  get links() {
    return $$("//a");
  }

  public get languageSelection() {
    return $(
      "//span[contains(@class,'Header_lang-item')]//span[contains(@class, 'Header_ic-arrow')]"
    );
  }

  public get edTreatmentProduct() {
    return $('(//div[@class="treatment-list"]/div/a)[1]');
  }

  public get peTreatmentProduct() {
    return $('(//div[@class="treatment-list"]/div/a)[2]');
  }

  public get hlTreatmentProduct() {
    return $('(//div[@class="treatment-list"]/div/a)[3]');
  }

  public get ghTreatmentProduct() {
    return $('(//div[@class="treatment-list"]/div/a)[4]');
  }

  public get getStartediConsultButton() {
    return $(
      "//div[contains(@class, 'Landing_btn-group')]/a[contains(@href, 'start-iconsult')]"
    );
  }

  public get footerMenu() {
    return $("//div[contains(@class, 'Footer_footer-top')]");
  }

  public get footerHeaders() {
    return $$("//div[contains(@class, 'Footer_footer-menu')]/h5");
  }

  public async navigateToFooter(): Promise<void> {
    await browser.pause(1500);
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

  public openHomepage() {
    return super.open("");
  }
}

export default new HomePage();

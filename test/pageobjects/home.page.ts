import { $ } from "@wdio/globals";
import Page from "./page";

class HomePage extends Page {
  public get contactUs() {
    return $("[href$='/en/contactus']");
  }

  public get aboutUs() {
    return $("[href$='/en/aboutus']");
  }

  public get btnSubmit() {
    return $('[value$="Sign In"]');
  }

  public get faqLink() {
    return $("[href*='/en/faq']");
  }

  public get faq_iConsult_link() {
    return $("[href='#box-1']");
  }
  public get faq_iconsult_last_que() {
    return $(
      "//p[contains(text(),'What does it mean if I can no longer proceed throu')]"
    );
  }
  public get faq_General_Que_link() {
    return $("[href='#box-2']");
  }
  public get faq_General_Que_last_que() {
    return $(
      "//p[contains(text(),'What if I want to change or cancel my subscription')]"
    );
  }
  public get faq_General_Medi_link() {
    return $("[href='#box-3']");
  }
  public get faq_General_Medi_last_que() {
    return $("//p[normalize-space()='Can I increase my dosage?']");
  }
  public get faq_ED_link() {
    return $("[href='#box-4']");
  }
  public get faq_ED_last_que() {
    return $(
      "//p[contains(text(),'What is the difference between Sildenafil and Tada')]"
    );
  }
  public get faq_PE_link() {
    return $("[href='#box-5']");
  }
  public get faq_PE_last_que() {
    return $(
      "//p[contains(text(),'Can I take erectile dysfunction medications togeth')]"
    );
  }
  public get faq_HL_link() {
    return $("[href='#box-6']");
  }
  public get faq_HL_last_que() {
    return $(
      "//p[contains(text(),'How long does it take for hair loss treatment to w')]"
    );
  }
  public get faq_GH_link() {
    return $("[href='#box-7']");
  }

  public get faq_GH_last_que() {
    return $(
      "//p[contains(text(),'What type of genital herpes medication is availabl')]"
    );
  }
  public get TermsOfUseLink() {
    return $("[href$='/en/terms-conditions']");
  }
  public get TeleHealthConsentLink() {
    return $("[href$='/en/telehealth-consent']");
  }
  public get PrivacyPolicyLink() {
    return $("[href$='/en/privacy-policy']");
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
    return $("[href$='/en/howitworks']");
  }

  get hamburgericon() {
    return $("[class$='btn-rounded Header_btn-user__RSRGo']");
  }

  public openHomepage() {
    return super.open("/en");
  }
}

export default new HomePage();

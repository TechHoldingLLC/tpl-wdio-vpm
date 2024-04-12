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
    return $("[href$='/en/faq']");
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

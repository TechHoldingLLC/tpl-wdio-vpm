import { $ } from "@wdio/globals";
import Page from "./page.js";

class AboutUsPage extends Page {
  public get productthumbnail() {
    return $("[class$='treatment-product']");
  }

  get aboutusContent() {
    return $('[class$="AboutUs_about-us-item-content__el7q2"]');
  }

  public get iconsultIntro() {
    return $('[class$="title"]');
  }

  public async aboutUsPage() {
    await this.productthumbnail.click();
  }

  public openAboutus() {
    return super.open("/en/aboutus");
  }
}

export default new AboutUsPage();

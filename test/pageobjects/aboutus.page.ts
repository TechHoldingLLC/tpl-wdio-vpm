import { $ } from "@wdio/globals";
import Page from "./page.js";

class AboutUsPage extends Page {
  // ---------- Locators ----------

  /**
   * Locator for the product thumbnail on the About Us page.
   */
  public get productThumbnail() {
    return $("[class$='treatment-product']");
  }

  /**
   * Locator for the About Us content section.
   */
  public get aboutUsContent() {
    return $("//div[contains(@class,'AboutUs_about-us-item-content')]");
  }

  /**
   * Locator for the main heading (h2) in the About Us section.
   */
  public get aboutViaProMeds() {
    return $("//h2");
  }

  /**
   * Locator for the list of headers (h3) inside the About Us content section.
   */
  public get aboutUsContentItemHeaderList() {
    return $$("//div[contains(@class, 'AboutUs_about-us-item-content')]/h3");
  }

  /**
   * Locator for the doctor's mission content in the About Us section.
   */
  public get aboutUsDoctorMission() {
    return $('//div[contains(@class,"AboutUs_about-doctor-content")]/p/p');
  }

  /**
   * Locator for the iConsult introduction title on the About Us page.
   */
  public get iConsultIntro() {
    return $('[class$="title"]');
  }

  /**
   * Locator for the About Us link in the navigation bar.
   */
  public get aboutUsLink() {
    return $(
      "body > div:nth-child(2) > nav:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(2) > a:nth-child(1)"
    );
  }

  // ---------- Methods ----------

  /**
   * Clicks on the product thumbnail to navigate to the About Us section.
   */
  public async aboutUsPage() {
    try {
      await this.productThumbnail.click();
    } catch (error) {
      throw new Error(
        "Failed to navigate to the About Us page: " + error.message
      );
    }
  }

}

export default new AboutUsPage();

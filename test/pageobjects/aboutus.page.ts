import { $ } from "@wdio/globals";
import Page from "./page.js";
import pkg from "lodash";
const { isEqual } = pkg;

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

  /**
   * Validates the content headers within the About Us section.
   *
   * @param expectedHeaders - Array of expected header texts.
   * @returns Boolean - True if the actual headers match the expected headers.
   */
  public async validateAboutUsItemContent(
    expectedHeaders: string[]
  ): Promise<boolean> {
    try {
      const aboutUsContentHeaderList = await this.aboutUsContentItemHeaderList;

      // Check if header list is available
      if (aboutUsContentHeaderList.length === 0) {
        throw new Error("No content headers found.");
      }

      const actualAboutUsItemContentHeaders: string[] = [];

      // Extract and store all header texts
      for (let i = 0; i < aboutUsContentHeaderList.length; i++) {
        await aboutUsContentHeaderList[i].waitForDisplayed();
        const headerText = await aboutUsContentHeaderList[i].getText();
        console.log(headerText);
        actualAboutUsItemContentHeaders.push(headerText);
      }

      console.log(
        `Actual About Us Content Header List: "${actualAboutUsItemContentHeaders}"`
      );

      // Compare actual headers with expected headers
      return isEqual(
        actualAboutUsItemContentHeaders.sort(),
        expectedHeaders.sort()
      );
    } catch (error) {
      console.error(
        "Error during About Us content validation: " + error.message
      );
      return false;
    }
  }
}

export default new AboutUsPage();

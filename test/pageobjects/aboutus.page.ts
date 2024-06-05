import { $ } from "@wdio/globals";
import Page from "./page.js";
import pkg from "lodash";
const { isEqual } = pkg;

class AboutUsPage extends Page {
  public get productthumbnail() {
    return $("[class$='treatment-product']");
  }

  get aboutusContent() {
    return $("//div[contains(@class,'AboutUs_about-us-item-content')]");
  }

  public get aboutViaProMeds() {
    return $("//h2");
  }

  public get aboutUsContentItemHeaderList() {
    return $$("//div[contains(@class, 'AboutUs_about-us-item-content')]/h3");
  }

  public async validateAboutUsItemContent(
    expectedHeaders: string[]
  ): Promise<boolean> {
    const aboutUsContentHeaderList = await this.aboutUsContentItemHeaderList;
    if (aboutUsContentHeaderList.length === 0) {
      console.error("Content Header List options not found.");
      return false;
    }
    const actualAboutUsItemContentHeaders: string[] = [];
    for (let i = 0; i < aboutUsContentHeaderList.length; i++) {
      await aboutUsContentHeaderList[i].waitForDisplayed();
      const aboutUsContentHeaderText = await aboutUsContentHeaderList[
        i
      ].getText();
      console.log(aboutUsContentHeaderText);
      actualAboutUsItemContentHeaders.push(aboutUsContentHeaderText);
    }

    console.log(
      `Actual About Us Content Header List "${actualAboutUsItemContentHeaders}"`
    );
    if (
      isEqual(actualAboutUsItemContentHeaders.sort(), expectedHeaders.sort())
    ) {
      return true;
    }

    return false;
  }

  public get aboutUsDoctorMission() {
    return $('//div[contains(@class,"AboutUs_about-doctor-content")]/p/p');
  }

  public get iconsultIntro() {
    return $('[class$="title"]');
  }

  public async aboutUsPage() {
    await this.productthumbnail.click();
  }

  public get aboutUslink() {
    return $(
      "body > div:nth-child(2) > nav:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(2) > a:nth-child(1)"
    );
  }
}

export default new AboutUsPage();

import { expect } from "@wdio/globals";
import AboutUsPage from "../pageobjects/aboutus.page";

describe("About Us Feature", () => {
  before("Open About Us Page", async () => {
    await AboutUsPage.openAboutus();
  });

  it("About Us Page - TC06", async () => {
    await browser.pause(5000);
    await expect(browser).toHaveTitle("About Us | Viapromeds");
    await expect(AboutUsPage.aboutusContent).toBeDisplayed();
    await browser.pause(3000);
    await AboutUsPage.aboutUs();
    await browser.pause(3000);
    await expect(AboutUsPage.iconsultIntro).toBeDisplayed();
  });
});

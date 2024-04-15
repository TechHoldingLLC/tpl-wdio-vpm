import { expect } from "@wdio/globals";
import AboutUsPage from "../pageobjects/aboutus.page";
import pagetitle from "../data/pageTitles.json";

describe("About Us Feature", () => {
  before("Verify About Us Page", async () => {
    await AboutUsPage.openAboutus();
    await browser.maximizeWindow();
  });

  it("Verify About Us Page - TC01", async () => {
    await expect(browser).toHaveTitle(pagetitle.pg_title_about_us);
    await expect(AboutUsPage.aboutusContent).toBeDisplayed();
    await AboutUsPage.aboutUsPage();
    await expect(AboutUsPage.iconsultIntro).toBeDisplayed();
  });
});

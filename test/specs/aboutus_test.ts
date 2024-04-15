import { expect } from "@wdio/globals";
import aboutUsPage from "../pageobjects/aboutus.page.js";
import * as fs from 'fs'

describe("About Us Feature", () => {
  before(async () => {
    await aboutUsPage.openAboutus();
    await browser.maximizeWindow();
  });

  it("Verify About Us Page - TC01", async () => {
    const rawdata = fs.readFileSync('./test/data/pageTitles.json', 'utf-8')
    const pageTitle = JSON.parse(rawdata)
    await expect(browser).toHaveTitle(pageTitle.pg_title_about_us);
    await expect(aboutUsPage.aboutusContent).toBeDisplayed();
    await aboutUsPage.aboutUsPage();
    await expect(aboutUsPage.iconsultIntro).toBeDisplayed();
  });
});

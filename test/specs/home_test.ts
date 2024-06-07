import homePage from "../pageobjects/home.page.js";
import fs from "fs";

describe("HomePage Features", () => {
  let pagetitle: any;
  let homePageData: any;

  before(async () => {
    await browser.url("");
    await browser.pause(2000);
    pagetitle = JSON.parse(
      fs.readFileSync("./test/data/pageTitles.json", "utf-8")
    );
    homePageData = JSON.parse(
      fs.readFileSync("./test/data/homePage.json", "utf-8")
    );
  });

  it("C29672 Website Main Pages: Verify Landing Page opens error-free", async () => {
    //Verify all hyperlinks on the Homepage
    await browser.pause(5000);
    const url: string = await browser.getUrl();
    const language: string = await homePage.getLanguageFromUrl(url);

    const expectedPageTitle: string =
      language === "en" ? pagetitle.pg_title_home : pagetitle.pg_title_home_es;
    expect(await browser.getTitle()).toEqual(expectedPageTitle);
    await browser.pause(2000);
    if (url.includes("qa")) {
      const linkElements = await homePage.links;
      const expectedLinks: string[] =
        language === "en"
          ? homePageData.englishLinks
          : homePageData.spanishLinks;

      const actualLinks: string[] = [];
      for (const element of linkElements) {
        try {
          let linkText = await element.getText();
          linkText = linkText.trim();
          if (linkText) {
            actualLinks.push(linkText);
          }
        } catch (error) {
          console.error("Error occurred while fetching link text:", error);
        }
      }
      console.log("Visible Links on the HomePage are: " + actualLinks);
      expect(await actualLinks).toEqual(expectedLinks);
    } else if (url.includes("stage")) {
      const linkElements = await homePage.links;
      const expectedLinks: string[] =
        language === "en"
          ? homePageData.englishLinks
          : homePageData.spanishLinks;

      const actualLinks: string[] = [];
      for (const element of linkElements) {
        try {
          let linkText = await element.getText();
          linkText = linkText.trim();
          if (linkText) {
            actualLinks.push(linkText);
          }
        } catch (error) {
          console.error("Error occurred while fetching link text:", error);
        }
      }
      console.log("Visible Links on the HomePage are: " + actualLinks);
      expect(await actualLinks).toEqual(expectedLinks);
    } else {
      const linkElements = await homePage.links;
      const expectedLinks: string[] =
        language === "en"
          ? homePageData.englishLinks_prod
          : homePageData.spanishLinks_prod;

      const actualLinks: string[] = [];
      for (const element of linkElements) {
        try {
          let linkText = await element.getText();
          linkText = linkText.trim();
          if (linkText) {
            actualLinks.push(linkText);
          }
        } catch (error) {
          console.error("Error occurred while fetching link text:", error);
        }
      }
      console.log("Visible Links on the HomePage are: " + actualLinks);
      expect(await actualLinks).toEqual(expectedLinks);
    }
  });
});

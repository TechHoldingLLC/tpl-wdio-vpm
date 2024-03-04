import homePage from "../pageobjects/home.page";
import LoginPage from "../pageobjects/vpm_login.page";
import pagetitle from "../data/pageTitles.json";

describe("HomePage Features", () => {
  before("Verify VPM Homepage", async () => {
    await homePage.openHomepage();
  });

  it("Verify all hyperlinks on the Homepage - TC05", async () => {
    await browser.pause(3000);
    await expect(browser).toHaveTitle(pagetitle.pg_title_home);
    for (let i = 0; i < (await LoginPage.elements.length); i++) {
      const linktext = await (await LoginPage.elements[i]).getText();
      if (linktext !== "") {
        console.log("Link Text: ", linktext);
      }
    }
  });

  it("Verify FAQ Page - TC06", async () => {
    await browser.pause(7000);
    await homePage.faqLink.click();
    await browser.pause(7000);
    await expect(browser).toHaveTitle(pagetitle.pg_title_faq);
  });

  it("Verify How it Works Page - TC07", async () => {
    await browser.pause(5000);
    await homePage.howitworksLink.click();
    await browser.pause(7000);
    await expect(browser).toHaveTitle(pagetitle.pg_title_howitworks);
  });
});

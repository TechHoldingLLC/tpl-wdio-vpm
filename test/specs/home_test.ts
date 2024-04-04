import homePage from "../pageobjects/home.page";
import LoginPage from "../pageobjects/vpm_login.page";
import pagetitle from "../data/pageTitles.json";

describe("HomePage Features", () => {
  before("Verify VPM Homepage", async () => {
    await homePage.openHomepage();
  });

  it("Verify all hyperlinks on the Homepage - TC04", async () => {
    await expect(homePage.aboutUs.isDisplayed());
    await expect(browser).toHaveTitle(pagetitle.pg_title_home);
    for (let i = 0; i < (await LoginPage.elements.length); i++) {
      const linktext = await (await LoginPage.elements[i]).getText();
      if (linktext !== "") {
        console.log("Link Text: ", linktext);
      }
    }
  });

  it("Verify FAQ Page - TC05", async () => {
    await homePage.faqLink.scrollIntoView();
    await expect((await homePage.aboutUs).isDisplayed());
    await homePage.faqLink.click();
    await expect(browser).toHaveTitle(pagetitle.pg_title_faq);
  });

  it("Verify How it Works Page - TC06", async () => {
    await homePage.howitworksLink.scrollIntoView();
    await expect((await homePage.howitworksLink).isDisplayed());
    await homePage.howitworksLink.click();
    await expect(browser).toHaveTitle(pagetitle.pg_title_howitworks);
  });
});

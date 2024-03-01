import homePage from "../pageobjects/home.page";
import LoginPage from "../pageobjects/vpm_login.page";

describe("HomePage Features", () => {
  before("Open VPM Site", async () => {
    await homePage.openHomepage();
  });

  it("Fetch all hyperlinks from Homepage - TC05", async () => {
    await browser.pause(5000);
    // await expect(browser).toHaveTitle(
    // "Pioneering Latino Health through Cultural Relevance - ViaproMeds"
    // );
    for (let i = 0; i < (await LoginPage.elements.length); i++) {
      const linktext = await (await LoginPage.elements[i]).getText();
      if (linktext !== "") {
        console.log("Link Text: ", linktext);
      }
    }
  });

  it("Open FAQ Page - TC06", async () => {
    await homePage.faqLink.click();
    await browser.pause(5000);
    await expect(browser).toHaveTitle("FAQ | Viapromeds");
  });

  it("How it Works - TC07", async () => {
    await homePage.howitworksLink.click();
    await browser.pause(5000);
    await expect(browser).toHaveTitle("How It Works | Viapromeds");
  });
});

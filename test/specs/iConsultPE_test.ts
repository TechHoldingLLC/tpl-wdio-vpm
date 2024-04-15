import iConsultPEFlow from "../pageobjects/iconsult.PE.page";
import LoginPage from "../pageobjects/vpm_login.page";
import logindata from "../data/login.json";
import homePage from "../pageobjects/home.page";

describe("iConsult Features", () => {
  before("Login to the site for iConsult", async () => {
    await LoginPage.openSignin();
    await browser.maximizeWindow();
  });

  it("Verify iConsult PE Flow - Paroxetine - TC14", async () => {
    await LoginPage.login(
      logindata.login_valid.login_email,
      logindata.login_valid.login_password
    );
    await expect(homePage.aboutUs.isDisplayed());
    await iConsultPEFlow.iConsultPE();
  });
});

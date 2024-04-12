import iConsultEDFlow from "../pageobjects/iconsult.ED.page";
import LoginPage from "../pageobjects/vpm_login.page";
import logindata from "../data/login.json";
import homePage from "../pageobjects/home.page";

describe("iConsult Features", () => {
  before("Open iConsult", async () => {
    await LoginPage.openSignin();
    await browser.maximizeWindow();
  });

  it("Verify iConsult ED Flow - Tadalafil - TC07", async () => {
    await LoginPage.login(
      logindata.login_valid.login_email,
      logindata.login_valid.login_password
    );
    await expect(homePage.aboutUs.isDisplayed());
    await iConsultEDFlow.iConsultED();
  });
});

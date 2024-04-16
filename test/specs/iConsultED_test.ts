import iConsultEDFlow from "../pageobjects/iconsult.ED.page.js";
import LoginPage from "../pageobjects/vpm_login.page.js";
import homePage from "../pageobjects/home.page.js";
import * as fs from 'fs';

describe("iConsult Features", () => {
  before("Open iConsult", async () => {
    await LoginPage.openSignin();
    await browser.maximizeWindow();
  });

  it("Verify iConsult ED Flow - Tadalafil - TC07", async () => {
    const rawdata = fs.readFileSync('./test/data/login.json', 'utf-8');
    const logindata = JSON.parse(rawdata);
    await LoginPage.login(
      logindata.login_valid.login_email,
      logindata.login_valid.login_password
    );
    await expect(homePage.aboutUs.isDisplayed());
    await iConsultEDFlow.iConsultED();
  });
});

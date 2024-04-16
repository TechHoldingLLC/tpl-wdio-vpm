import iConsultPEFlow from "../pageobjects/iconsult.PE.page.js";
import LoginPage from "../pageobjects/vpm_login.page.js";
import homePage from "../pageobjects/home.page.js";
import * as fs from 'fs'

describe("iConsult Features", () => {
  before("Login to the site for iConsult", async () => {
    await LoginPage.openSignin();
    await browser.maximizeWindow();
  });

  it("Verify iConsult PE Flow - Paroxetine - TC14", async () => {
    const rawdata = fs.readFileSync('./test/data/login.json', 'utf-8');
    const logindata = JSON.parse(rawdata);
    await LoginPage.login(
      logindata.login_valid.login_email,
      logindata.login_valid.login_password
    );
    await expect(homePage.aboutUs.isDisplayed());
    await iConsultPEFlow.iConsultPE();
  });
});

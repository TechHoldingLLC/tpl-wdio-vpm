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
    const rawdata = fs.readFileSync('./test/data/login.json', 'utf-8')
    const logindata = JSON.parse(rawdata)
    const url= await browser.getUrl()
    if(url.includes('qa')){
      await LoginPage.login(
        logindata.login_valid.login_email,
        logindata.login_valid.login_password
      )
    }
    else{
      await LoginPage.login(
        logindata.stage_login_valid.login_email,
        logindata.stage_login_valid.login_password
      )
    }
    await browser.pause(3000)
    await expect(await homePage.aboutUs.isDisplayed()).toBe(true)
    await iConsultPEFlow.iConsultPE()
  })
})

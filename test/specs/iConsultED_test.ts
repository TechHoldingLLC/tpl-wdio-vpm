import iConsultEDFlow from "../pageobjects/iconsult.ED.page.js"
import LoginPage from "../pageobjects/vpm_login.page.js"
import homePage from "../pageobjects/home.page.js"
import fs from 'fs'

describe("iConsult Features", () => {
  before("Open iConsult", async () => {
    await LoginPage.openSignin()
    await browser.maximizeWindow()
  });

  it("Verify iConsult ED Flow - Tadalafil - TC07", async () => {
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
    await homePage.aboutUs.waitForDisplayed()
    await expect(await homePage.aboutUs.isDisplayed()).toBe(true)
    await iConsultEDFlow.iConsultED()
  });
});

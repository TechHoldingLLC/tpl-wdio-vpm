import LoginPage from "../pageobjects/vpm_login.page.js"
import fs from 'fs'
import homePage from "../pageobjects/home.page.js"
import vpm_loginPage from "../pageobjects/vpm_login.page.js"
import profilesidemenuPage from "../pageobjects/profilesidemenu.page.js"
import profilePage from "../pageobjects/profile.page.js"

describe('Customer Profile - Saved Cards page', () => {

    before(async () => {
      await LoginPage.openSignin()
      await browser.maximizeWindow()
      const rawdata = fs.readFileSync('./test/data/login.json', 'utf-8')
      const logindata = JSON.parse(rawdata)
      const url: string = await browser.getUrl()
      if(url.includes('qa')){
        await LoginPage.login(
          logindata.login_valid.login_email,
          logindata.login_valid.login_password)
      } else{
        await LoginPage.login(
          logindata.stage_login_valid.login_email,
          logindata.stage_login_valid.login_password)
      }
      expect(await homePage.aboutUs.isDisplayed())
      await vpm_loginPage.hamburgericon.waitForClickable()
      await vpm_loginPage.hamburgericon.click()
    })

    it('Verify the redirection from the Profile to Profile Settings page', async () => {
        await browser.pause(1000)
        await profilesidemenuPage.profileOption.click()
        await profilePage.profileSettings.waitForExist()
        expect(await profilePage.profileSettings).toHaveText("Profile Settings")
        expect(await profilePage.userDetails).toHaveText("User Details")
        expect(await profilePage.credentials).toHaveText("Credentials")
  
        try {
            const rawdata = fs.readFileSync('./test/data/login.json', 'utf-8')
            const userData = JSON.parse(rawdata)
            const url: string = await browser.getUrl()
            if(url.includes('qa')){
                const emailValue: string = await profilePage.emailInput.getAttribute('value')
                expect(emailValue).toEqual(userData.login_valid.login_email)
            } else{
                const emailValue: string = await profilePage.emailInput.getAttribute('value')
                expect(emailValue).toEqual(userData.stage_login_valid.login_email)
            }
        } catch (error) {
            console.error("Error occurred while retrieving email value:", error)
            throw error
        }
    })
})

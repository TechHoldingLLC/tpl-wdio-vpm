import LoginPage from "../pageobjects/vpm_login.page.js"
import fs from 'fs'
import homePage from "../pageobjects/home.page.js"
import vpm_loginPage from "../pageobjects/vpm_login.page.js"
import profilesidemenuPage from "../pageobjects/profilesidemenu.page.js"

describe('Customer Profile - Subscription menu redirection', () => {

    before(async () => {
      await LoginPage.openSignin()
      await browser.maximizeWindow()
      const rawdata = fs.readFileSync('./test/data/login.json', 'utf-8')
      const logindata = JSON.parse(rawdata)
      const url: string= await browser.getUrl()
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

    it('Verify the redirection from the Profile Subscriptions to Subscription Listing details page', async() => {
      await browser.pause(4000)
      await profilesidemenuPage.subscriptionOption.click()
      await browser.pause(4000)
      await expect(profilesidemenuPage.subscriptionPage).toBeDisplayed()
      await browser.pause(3000)
      // Verify the text of the Subscription page
      const subscriptionPageText:string = await profilesidemenuPage.subscriptionPage.getText()
      console.log(`Subscription Page text is "${subscriptionPageText}"`)
      expect(subscriptionPageText).toEqual('Subscriptions')

      // Log the subscription count for the user
      const subscriptionCount = await profilesidemenuPage.getSubscriptionsCount()
      console.log(`Subscription Count for the user is: "${subscriptionCount}"`)
    })
})

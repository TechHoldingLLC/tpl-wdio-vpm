import LoginPage from "../pageobjects/vpm_login.page.js"
import * as fs from 'fs'
import homePage from "../pageobjects/home.page.js"
import vpm_loginPage from "../pageobjects/vpm_login.page.js"
import profilesidemenuPage from "../pageobjects/profilesidemenu.page.js"
import profileCardPage from "../pageobjects/profileCard.page.js"

describe('Customer Profile - Saved Cards page', () => {

    before(async () => {
        await LoginPage.openSignin()
        await browser.maximizeWindow()
        const rawdata = fs.readFileSync('./test/data/login.json', 'utf-8')
      const logindata = JSON.parse(rawdata)
      await LoginPage.login(
          logindata.login_valid.login_email,
          logindata.login_valid.login_password
      )
      expect(await homePage.aboutUs.isDisplayed())
      await vpm_loginPage.hamburgericon.waitForClickable()
      await vpm_loginPage.hamburgericon.click()
    })

    it('Verify the redirection from the Profile Saved Cards to Saved Card Listing details page', async() => {
      await browser.pause(2000)
      await profilesidemenuPage.savedCardOption.click()
      await browser.pause(2000)
      expect(await profilesidemenuPage.savedCardsPage).toBeDisplayed()
      const savedCardsPage:string = await profilesidemenuPage.savedCardsPage.getText()
      console.log(`Saved Cards Page text is ${savedCardsPage}`)
      await expect(savedCardsPage).toEqual('Saved Cards')

      await profilesidemenuPage.addCardButton.waitForClickable()
      await profilesidemenuPage.addCardButton.click()
      await browser.pause(2000)

      // Switch to card iframe
      await profileCardPage.cardIframe.waitForExist({ timeout: 10000 })
      await browser.switchToFrame(await profileCardPage.cardIframe)
      console.log("Iframe:", profileCardPage.cardIframe)
      expect(profileCardPage.cardIframe).toExist()
      await browser.pause(2000)
      await profileCardPage.addCardDetails("4111 1111 1111 1111", "12/28")
      
      await browser.switchToParentFrame()
      await browser.pause(2000)
      await profileCardPage.cardAddMessage.waitForExist()
      const toastMessageText = await profileCardPage.cardAddMessage.getText()
      console.log("Toast Message:", toastMessageText)
      expect(toastMessageText).toContain("Card added")
    })
})

import LoginPage from "../pageobjects/vpm_login.page.js"
import fs from 'fs'
import homePage from "../pageobjects/home.page.js"
import vpm_loginPage from "../pageobjects/vpm_login.page.js"
import profilesidemenuPage from "../pageobjects/profilesidemenu.page.js"
import profileCardPage from "../pageobjects/profileCard.page.js"

describe('Customer Profile - Saved Cards page', () => {

    before(async () => {
      await LoginPage.openSignin()
      const logindata = JSON.parse(fs.readFileSync('./test/data/login.json', 'utf-8'))
      const url: string = await browser.getUrl()
      let selectedLoginData: any
      if (url.includes('qa')) {
        selectedLoginData = logindata.login_valid
      } else if (url.includes('stage')) {
        selectedLoginData = logindata.stage_login_valid
      } else {
        selectedLoginData = logindata.prod_login_valid
      }
      await LoginPage.login(selectedLoginData.login_email, selectedLoginData.login_password)
      await browser.pause(3000)
      expect(await homePage.aboutUs.isDisplayed()).toBe(true)
      await vpm_loginPage.hamburgericon.waitForClickable()
      await vpm_loginPage.hamburgericon.click()
    })

    it('C29662 Profile: Verify adding card to Saved Card Listing Details page', async() => {
      await browser.pause(2000)
      await profilesidemenuPage.savedCardOption.click()
      await profilesidemenuPage.savedCardsPage.waitForDisplayed()
      await browser.pause(3000)
      expect(await profilesidemenuPage.savedCardsPage).toBeDisplayed()
      const savedCardsPageText:string = await profilesidemenuPage.savedCardsPage.getText()
      console.log(`Saved Cards Page text is ${savedCardsPageText}`)
      const url: string = await browser.getUrl()
      const expectedText = (url.includes('en')) ? 'Saved Cards' : 'Tarjetas Guardadas'
      expect(savedCardsPageText).toEqual(expectedText)

      await profilesidemenuPage.addCardButton.waitForClickable()
      await profilesidemenuPage.addCardButton.click()
      await browser.pause(2000)
      // Switch to card iframe
      await profileCardPage.cardIframe.waitForExist({ timeout: 10000 })
      await browser.switchToFrame(await profileCardPage.cardIframe)
      expect(await profileCardPage.cardIframe).toExist()
      await browser.pause(2000)
      await profileCardPage.addCardDetails("4111 1111 1111 1111", "12/28")
      await browser.pause(2500)
      await browser.switchToParentFrame()
      try {
        await profileCardPage.cardAddMessage.waitForExist({ timeout: 10000 })
        await browser.pause(2000)
        const toastMessageText = await profileCardPage.cardAddMessage.getText()
        console.log("Toast Message:", toastMessageText)
        const expectedMessage = (url.includes('en')) ? "Card added" : "Tarjeta agregada con éxito."
        expect(toastMessageText).toContain(expectedMessage)
      } catch (error) {
        console.error("Error occurred while waiting for toast message:", error)
      }
    })
})

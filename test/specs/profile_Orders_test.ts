import LoginPage from "../pageobjects/vpm_login.page.js"
import fs from 'fs'
import homePage from "../pageobjects/home.page.js"
import vpm_loginPage from "../pageobjects/vpm_login.page.js"
import profilesidemenuPage from "../pageobjects/profilesidemenu.page.js"
import { expect } from 'chai'

describe('Profile Menu Options and Redirection from Orders', () => {

    before(async () => {
        await LoginPage.openSignin()
        await browser.maximizeWindow()
    })

    it('Verify the profile menu options', async() => {
      const rawdata = fs.readFileSync('./test/data/login.json', 'utf-8')
      const logindata = JSON.parse(rawdata)
      const url: string= await browser.getUrl()
      if(url.includes('qa')){
        await LoginPage.login(
          logindata.login_valid.login_email,
          logindata.login_valid.login_password)
      } else {
        await LoginPage.login(
          logindata.stage_login_valid.login_email,
          logindata.stage_login_valid.login_password)
      }
      expect(await homePage.aboutUs.isDisplayed())
      await vpm_loginPage.hamburgericon.waitForClickable()
      await vpm_loginPage.hamburgericon.click()
      await browser.pause(5000)
      const validateProfileSubMenus = await profilesidemenuPage.validateProfileSideMenuList()
      expect(validateProfileSubMenus).to.be.true
    })

    it('Verify the redirection from the Profile Orders to Order Listing details page', async() => {
      // Click on the Orders option in the profile side menu
      await profilesidemenuPage.ordersOption.click()

      // Wait for the My Orders page to be displayed and verify its text
      await profilesidemenuPage.myOrdersPage.waitForDisplayed()
      const ordersPageText:string = await profilesidemenuPage.myOrdersPage.getText()
      console.log(`Orders Page text is "${ordersPageText}"`)
      expect(ordersPageText).to.be.equal('My Orders')

      // Wait for the Order List to be displayed and verify its text
      await profilesidemenuPage.myOrderList.waitForDisplayed()
      const ordersListText:string = await profilesidemenuPage.myOrderList.getText()
      console.log(`Orders List text is "${ordersListText}"`)
      expect(ordersListText).to.be.equal('Orders list')
    })
})

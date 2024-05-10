import LoginPage from "../pageobjects/vpm_login.page.js"
import fs from 'fs'
import homePage from "../pageobjects/home.page.js"
import vpm_loginPage from "../pageobjects/vpm_login.page.js"
import profilesidemenuPage from "../pageobjects/profilesidemenu.page.js"
import { expect } from 'chai'

describe('Profile Menu Options and Redirection from Orders', () => {

    before(async () => {
        await LoginPage.openSignin()
    })

    it('C29953 Profile: Verify the profile menu options', async() => {
      const loginDataPath: string = './test/data/login.json'
      let selectedLoginData: any

      try{
        const logindata = JSON.parse(fs.readFileSync(loginDataPath, 'utf-8'))
        const url: string = await browser.getUrl()
        const language: string = await profilesidemenuPage.getLanguageFromUrl(url)
        
        // Select the appropriate login data based on the environment
        if (url.includes('qa')) {
          selectedLoginData = logindata.login_valid
        } else if (url.includes('stage')) {
          selectedLoginData = logindata.stage_login_valid
        } else {
          selectedLoginData = logindata.prod_login_valid
        }

        // Perform login with the selected credentials
        await LoginPage.login(selectedLoginData.login_email, selectedLoginData.login_password)
        await browser.pause(2000)
        await homePage.aboutUs.waitForDisplayed()
        expect(await homePage.aboutUs.isDisplayed())
        await vpm_loginPage.hamburgericon.waitForClickable()
        await vpm_loginPage.hamburgericon.click()
        await browser.pause(5000)
        
        // Define the expected profile sub-menu list based on the language
        let expectedProfileSubMenuList: string[] = language === 'en' ?
        ['Orders', 'Subscriptions', 'Saved Cards', 'Shipping Address', 'Profile'] :
        ['Órdenes', 'Suscripciones', 'Tarjetas Guardadas', 'Dirección De Envío', 'Perfil']
  
        // Validate that the profile sub-menu list matches the expected list
        const validateProfileSubMenus: boolean = await profilesidemenuPage.validateProfileSideMenuList(expectedProfileSubMenuList)
        expect(validateProfileSubMenus).to.be.true
      } catch (error) {
        console.error("Error occurred while verifying profile menu options:", error)
        throw error
      }
      
    })

    it('C29660 Profile: Verify viewing Order Listing Details page', async() => {
      await browser.pause(3000)
      await profilesidemenuPage.ordersOption.click()
      await profilesidemenuPage.myOrdersPage.waitForDisplayed()

      // Get text of orders page and list
      const ordersPageText:string = await profilesidemenuPage.myOrdersPage.getText()
      const ordersListText:string = await profilesidemenuPage.myOrderList.getText()

      // Get language from URL
      const url = await browser.getUrl()
      const language: string = await profilesidemenuPage.getLanguageFromUrl(url)
      
      // Define expected texts based on language
      const expectedOrderPageText: string= language === 'en' ? 'My Orders' : 'Mis Pedidos'
      const expectedOrderListText: string= language === 'en' ? 'Orders list' : 'Lista de Pedidos'
      
      // Log texts
      console.log(`Orders Page text is "${ordersPageText}"`)
      console.log(`Orders List text is "${ordersListText}"`)

      // Assert expected texts
      expect(ordersPageText).to.be.equal(expectedOrderPageText)
      expect(ordersListText).to.be.equal(expectedOrderListText)
    })
})

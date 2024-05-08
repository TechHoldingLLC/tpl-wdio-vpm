import SideMenuPage from "../pageobjects/sidemenu.page.js"
import LoginPage from "../pageobjects/vpm_login.page.js"
import fs from 'fs'

describe("Side Menu Options", () => {

  let language: string
  let loginData: any

  before(async () => {
    await LoginPage.openSignin()
    const logindata = JSON.parse(fs.readFileSync('./test/data/login.json', 'utf-8'))
    const url: string = await browser.getUrl()
    if (url.includes('qa')) {
      loginData = logindata.login_valid
    } else if (url.includes('stage')) {
      loginData = logindata.stage_login_valid
    } else {
      loginData = logindata.prod_login_valid
    }
    await LoginPage.login(loginData.login_email, loginData.login_password)
    language = await SideMenuPage.getLanguageFromUrl(url)
  })

  it("C29658 SideMenu: Verify side menu links are not broken", async () => {
    const orderMenu: string = language === 'en' ? "Orders" : "Órdenes"
    const subscriptionMenu: string = language === 'en' ? "Subscriptions" : "Suscripciones"
    const savedCardsMenu: string = language === 'en' ? "Saved Cards" : "Tarjetas Guardadas"
    const shippingAddressMenu: string = language === 'en' ? "Shipping Address" : "Dirección De Envío"
    const profileMenu: string = language === 'en' ? "Profile" : "Perfil"
    
    const checkMenuLink = async (menuName: string, expectedUrlPart: string) => {
      await SideMenuPage.openSideMenu()
      await SideMenuPage.openMenu(menuName)
      await browser.pause(2000)
      const currentUrl = await SideMenuPage.getCurrentUrl()
      await expect(currentUrl).toContain(expectedUrlPart)
      await browser.back()
      await browser.pause(4000)
    }

    await checkMenuLink(orderMenu, 'orders')
    await checkMenuLink(subscriptionMenu, 'subscription')
    await checkMenuLink(savedCardsMenu, 'savedcards')
    await checkMenuLink(shippingAddressMenu, 'shippingaddress')
    await checkMenuLink(profileMenu, 'profile')
  })

})

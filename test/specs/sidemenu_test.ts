import SideMenuPage from "../pageobjects/sidemenu.page.js"
import LoginPage from "../pageobjects/vpm_login.page.js"
import fs from 'fs'

describe("Side Menu Options", () => {

  beforeEach(async () => {
    await LoginPage.openSignin()
    await browser.maximizeWindow()
    const rawData = fs.readFileSync('./test/data/login.json', 'utf-8')
    const logindata = JSON.parse(rawData)
    const url: string = await browser.getUrl()
    if(url.includes('qa')){
      await LoginPage.login(
        logindata.login_valid.login_email,
        logindata.login_valid.login_password)  
    }
    else{
      await LoginPage.login(
        logindata.stage_login_valid.login_email, 
        logindata.stage_login_valid.login_password)  
    }
      await browser.pause(2000)
      await SideMenuPage.openSideMenu()
      await browser.pause(2000)
  });

  it("Verify Side Menu - Orders Link", async () => {
    await SideMenuPage.openOrdersMenu()
    await browser.pause(2000)
    const url = await SideMenuPage.getCurrentUrl();
    await expect(url).toContain('orders')
  });

  it("Verify Side Menu - Subscriptions Link", async () => {
    await SideMenuPage.openSubscriptionsMenu()
    await browser.pause(2000)
    const url = await SideMenuPage.getCurrentUrl()
    await expect(url).toContain('subscription')
   })
   
  it("Verify Side Menu - Saved Cards Link", async () => {
    await SideMenuPage.openSavedCardsMenu()
    await browser.pause(2000)
    const url = await SideMenuPage.getCurrentUrl()
    await expect(url).toContain('savedcards')
   })

  it("Verify Side Menu - Shipping Address Link", async () => {
    await SideMenuPage.openShippingAddressMenu()
    await browser.pause(2000)
    const url = await SideMenuPage.getCurrentUrl()
    await expect(url).toContain('shippingaddress')
   })

  it("Verify Side Menu - Profile Link", async () => {
    await SideMenuPage.openProfileMenu()
    await browser.pause(2000)
    const url = await SideMenuPage.getCurrentUrl()
    await expect(url).toContain('profile')
   })
})

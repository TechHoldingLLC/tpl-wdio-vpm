import profile_shipping from "../pageobjects/profile_ShippingAddress.page.js"
import LoginPage from "../pageobjects/vpm_login.page.js"
import homePage from "../pageobjects/home.page.js"
import fs from 'fs'

describe("Profile Features", () => {
  let shippingData: any
  let logindata: any

  before(async () => {
    await LoginPage.openSignin();
    await browser.maximizeWindow();
    const rawData2 = fs.readFileSync('./test/data/profile_shipping.json', 'utf-8');
    shippingData = JSON.parse(rawData2);
    const rawData = fs.readFileSync('./test/data/login.json', 'utf-8');
    logindata = JSON.parse(rawData);
  })

  it("Verify Profile - Shipping Address Flow - TC25", async () => {
    const url: string = await browser.getUrl()
    if(url.includes('qa')){
      await LoginPage.login(
        logindata.login_valid.login_email,
        logindata.login_valid.login_password)
    } else {
        await LoginPage.login(
          logindata.stage_login_valid.login_email,
          logindata.stage_login_valid.login_password)
      }
    await browser.pause(2000)
    expect(await homePage.hamburgericon.isDisplayed()).toBe(true)
    await browser.pause(2000)
    await homePage.hamburgericon.click()
    await browser.pause(2000)
    await profile_shipping.addShippingAddress()
    expect(await profile_shipping.ship_success_toast_message).toHaveText(
      shippingData.shipping_address_success_message)
  })
})

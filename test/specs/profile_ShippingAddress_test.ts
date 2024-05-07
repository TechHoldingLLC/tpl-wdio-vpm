import ProfileShipping from "../pageobjects/ProfileShippingAddress.page.js"
import LoginPage from "../pageobjects/vpm_login.page.js"
import homePage from "../pageobjects/home.page.js"
import fs from 'fs'

describe("Profile Features", () => {
  let shippingData: any
  let logindata: any

  before(async () => {
    await LoginPage.openSignin()
    shippingData = JSON.parse(fs.readFileSync('./test/data/profile_shipping.json', 'utf-8'))
    logindata = JSON.parse(fs.readFileSync('./test/data/login.json', 'utf-8'))
  })

  it("C29659 Verify Profile - Shipping Address Flow", async () => {
    const url: string = await browser.getUrl()
    const language: string = await ProfileShipping.getLanguageFromUrl(url)
    let loginData: any
    if (url.includes('qa')) {
        loginData = logindata.login_valid
    } else if (url.includes('stage')) {
        loginData = logindata.stage_login_valid
    } else {
        loginData = logindata.prod_login_valid
    }
    await LoginPage.login(loginData.login_email, loginData.login_password)
    await homePage.hamburgericon.waitForDisplayed()
    expect(await homePage.hamburgericon.isDisplayed()).toBe(true)
    await homePage.hamburgericon.click()
    await browser.pause(2000)
    await ProfileShipping.addShippingAddress()
    const expectedSuccessToastMessage: string = language === 'en' ? shippingData.shipping_address_success_message : shippingData.shipping_address_success_message_es
    await ProfileShipping.ship_success_toast_message.waitForDisplayed()
    expect(await ProfileShipping.ship_success_toast_message).toHaveText(
      expectedSuccessToastMessage)
  })
})

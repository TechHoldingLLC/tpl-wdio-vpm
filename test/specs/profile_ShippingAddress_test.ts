import profile_shipping from "../pageobjects/profile_ShippingAddress.page.js";
import LoginPage from "../pageobjects/vpm_login.page.js";
import homePage from "../pageobjects/home.page.js";
import * as fs from 'fs'

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
  });

  it("Verify Profile - Shipping Address Flow - TC25", async () => {
    await LoginPage.login(
      logindata.login_valid.login_email,
      logindata.login_valid.login_password
    );
    await browser.pause(2000);
    await expect(homePage.hamburgericon.isDisplayed());
    await browser.pause(2000);
    await homePage.hamburgericon.click();
    await browser.pause(2000);
    await profile_shipping.addShippingAddress();
    await expect(await profile_shipping.ship_success_toast_message).toHaveText(
      shippingData.shipping_address_success_message
    );
  });
});

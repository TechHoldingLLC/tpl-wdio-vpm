import SideMenuPage from "../pageobjects/sidemenu.page.js";
import LoginPage from "../pageobjects/vpm_login.page.js";
import * as fs from 'fs'

describe("Side Menu Options", () => {

  beforeEach(async () => {
    await LoginPage.openSignin();
    await browser.maximizeWindow();
    const rawData = fs.readFileSync('./test/data/login.json', 'utf-8');
    const logindata = JSON.parse(rawData);
    await LoginPage.login(
      logindata.login_valid.login_email,
      logindata.login_valid.login_password)  
      await browser.pause(2000)
      await SideMenuPage.openSideMenu();
      await browser.pause(2000)
  });

  it("Verify Side Menu - Orders Link", async () => {
   await SideMenuPage.openOrdersMenu();
   await browser.pause(2000)
   await expect(browser).toHaveUrl('https://qa.viapromeds.com/en/orders');
  });

  it("Verify Side Menu - Subscriptions Link", async () => {
    await SideMenuPage.openSubscriptionsMenu();
    await browser.pause(2000)
    await expect(browser).toHaveUrl('https://qa.viapromeds.com/en/subscription');
   });
   
  it("Verify Side Menu - Saved Cards Link", async () => {
    await SideMenuPage.openSavedCardsMenu();
    await browser.pause(2000)
    await expect(browser).toHaveUrl('https://qa.viapromeds.com/en/savedcards');
   });

  it("Verify Side Menu - Shipping Address Link", async () => {
    await SideMenuPage.openShippingAddressMenu();
    await browser.pause(2000)
    await expect(browser).toHaveUrl('https://qa.viapromeds.com/en/shippingaddress');
   });

  it("Verify Side Menu - Profile Link", async () => {
    await SideMenuPage.openProfileMenu();
    await browser.pause(2000)
    await expect(browser).toHaveUrl('https://qa.viapromeds.com/en/profile');
   });
});

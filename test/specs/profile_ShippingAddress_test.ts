import profile_shipping from "../pageobjects/profile_ShippingAddress.page";
import LoginPage from "../pageobjects/vpm_login.page";
import logindata from "../data/login.json";
import homePage from "../pageobjects/home.page";

describe("Profile Features", () => {
  before("login to site for adding Shipping Address", async () => {
    await LoginPage.openSignin();
    await browser.maximizeWindow();
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
    await expect(profile_shipping.ship_success_toast_message).toHaveText(
      "Address added successfully"
    );
  });
});

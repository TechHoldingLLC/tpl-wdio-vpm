import Page from "./page.js";
import pkg from "lodash";
const { isEqual } = pkg;

class ProfileSideMenuPage extends Page {
  /**
   * @description Gets all profile menu options in the side menu.
   * @returns {Promise<WebdriverIO.ElementArray>} A list of elements representing the profile side menu options.
   */
  public get profileMenuOptions() {
    return $$(
      "//div[contains(@class,'Header_sidebar-body')]/div[3]/a/div/div/span[1]"
    );
  }

  /**
   * @description Validates the actual profile side menu list against the expected menu list.
   * @param {string[]} expectedProfileSubMenuList - The expected profile sub-menu list.
   * @returns {Promise<boolean>} True if the actual menu matches the expected list, otherwise false.
   */
  public async validateProfileSideMenuList(
    expectedProfileSubMenuList: string[]
  ): Promise<boolean> {
    const profileMenuList = await this.profileMenuOptions;

    // Check if profile menu options are present
    if (profileMenuList.length === 0) {
      console.error("Profile menu options not found.");
      return false;
    }

    // Extract actual profile sub-menu text
    const actualProfileSubMenuList: string[] = [];
    for (let i = 0; i < profileMenuList.length; i++) {
      await profileMenuList[i].waitForDisplayed();
      const profileSubMenuText = await profileMenuList[i].getText();
      console.log(profileSubMenuText);
      actualProfileSubMenuList.push(profileSubMenuText);
    }

    // Log and compare the actual sub-menu with the expected list
    console.log(`Actual Profile Sub Menu List: ${actualProfileSubMenuList}`);
    return isEqual(
      actualProfileSubMenuList.sort(),
      expectedProfileSubMenuList.sort()
    );
  }

  /**
   * @description Gets the "Orders" option from the side menu.
   * @returns {WebdriverIO.Element} The "Orders" menu option.
   */
  public get ordersOption() {
    return $("(//div[contains(@class,'Header_menu-item')])[1]/span[1]");
  }

  /**
   * @description Gets the "Subscriptions" option from the side menu.
   * @returns {WebdriverIO.Element} The "Subscriptions" menu option.
   */
  public get subscriptionOption() {
    return $("(//div[contains(@class,'Header_menu-item')])[2]/span[1]");
  }

  /**
   * @description Gets the "Saved Cards" option from the side menu.
   * @returns {WebdriverIO.Element} The "Saved Cards" menu option.
   */
  public get savedCardOption() {
    return $("(//div[contains(@class,'Header_menu-item')])[3]/span[1]");
  }

  /**
   * @description Gets the "Shipping Address" option from the side menu.
   * @returns {WebdriverIO.Element} The "Shipping Address" menu option.
   */
  public get shippingAddressOption() {
    return $("(//div[contains(@class,'Header_menu-item')])[4]/span[1]");
  }

  /**
   * @description Gets the "Profile" option from the side menu.
   * @returns {WebdriverIO.Element} The "Profile" menu option.
   */
  public get profileOption() {
    return $("(//div[contains(@class,'Header_menu-item')])[5]/span[1]");
  }

  /**
   * @description Gets the element representing the order list header in the "My Orders" section.
   * @returns {WebdriverIO.Element} The order list header element.
   */
  public get myOrderList() {
    return $("//div[contains(@class,'MyOrder_order-list')]/h3");
  }

  /**
   * @description Gets the page title element of the profile side menu.
   * @returns {WebdriverIO.Element} The page title element.
   */
  public get pageTitle() {
    return $("//h2[@class='d-none d-md-block']");
  }

  /**
   * @description Gets the list of subscriptions available in the profile.
   * @returns {Promise<WebdriverIO.ElementArray>} An array of elements representing subscriptions.
   */
  public get subscriptions() {
    return $$("div.page-md-container");
  }

  /**
   * @description Gets the number of active subscriptions.
   * @returns {Promise<number>} The count of active subscriptions.
   */
  public async getSubscriptionsCount(): Promise<number> {
    const subscriptionCount = await this.subscriptions.length;
    console.log(`Subscription Count is: ${subscriptionCount}`);
    return subscriptionCount;
  }

  /**
   * @description Gets the "Add Card" button element in the "Saved Cards" section.
   * @returns {WebdriverIO.Element} The "Add Card" button element.
   */
  public get addCardButton() {
    return $("//button[contains(@class,'SavedCards_btn-add')]");
  }
}

export default new ProfileSideMenuPage();

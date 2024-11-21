import { $ } from "@wdio/globals";
import Page from "./page.js";

class SideMenuPage extends Page {
  /**
   * @description Gets the side menu element from the header.
   * @returns {WebdriverIO.Element} The side menu element.
   */
  public get sideMenu() {
    return $(
      "//div[contains(@class, 'Header_navbar-collapse')]/ul[contains(@class,'Header_navbar-nav-right')]/li[3]"
    );
  }

   public get sideMenuCloseButton() {
      return $(
        "//span[@class='btn-rounded Header_close-btn__rNA2L']"
      );
  }

  /**
   * @description Opens the side menu by clicking on the side menu element.
   * @returns {Promise<void>}
   */
  public async openSideMenu(): Promise<void> {
    await this.sideMenu.waitForDisplayed();
    await this.sideMenu.waitForClickable();
    await this.sideMenu.click();
  }

  /**
   * @description Retrieves the current URL of the browser.
   * @returns {Promise<string>} The current URL of the page.
   */
  public async getCurrentUrl(): Promise<string> {
    return await browser.getUrl();
  }

  /**
   * @description Opens a specific menu item from the side menu based on the menu name.
   * @param {string} menuName - The name of the menu to be opened.
   * @returns {Promise<void>}
   */
  public async openMenu(menuName: string): Promise<void> {
    const menuItemSelector = `//span[contains(@class, 'Header_menu-item-title') and text()='${menuName}']`;
    const menuItemElement = await $(menuItemSelector);
    await menuItemElement.waitForClickable();
    await menuItemElement.click();
    await browser.pause(2000); // Optional pause to allow for UI transition
  }
}

export default new SideMenuPage();

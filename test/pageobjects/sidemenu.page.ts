import { $ } from "@wdio/globals";
import Page from "./page.js";

class SideMenuPage extends Page {

  public get sideMenu() {
    return $("//div[contains(@class, 'Header_navbar-collapse')]/ul[contains(@class,'Header_navbar-nav-right')]/li[3]/a")
  }

  public get sideMenuOrdersLink() {
    return $("//span[@class = 'Header_menu-item-title__JWXbz' and text() = 'Orders']")
  }

  public get sideMenuSubscriptionsLink() {
    return $("//span[@class = 'Header_menu-item-title__JWXbz' and text() = 'Subscriptions']")
  }

  public get sideMenuSavedCardsLink() {
    return $("//span[@class = 'Header_menu-item-title__JWXbz' and text() = 'Saved Cards']")
  }

  public get sideMenuShippingAddressLink() {
    return $("//span[@class = 'Header_menu-item-title__JWXbz' and text() = 'Shipping Address']")
  }

  public get sideMenuProfileLink() {
    return $("//span[@class = 'Header_menu-item-title__JWXbz' and text() = 'Profile']")
  }

  public async openSideMenu() {
    await this.sideMenu.waitForDisplayed()
    await this.sideMenu.click();
  }

  async openOrdersMenu() {
    await this.sideMenuOrdersLink.click();
  }

  async openSubscriptionsMenu() {
    await this.sideMenuSubscriptionsLink.click();
  }

  async openSavedCardsMenu() {
    await this.sideMenuSavedCardsLink.click();
  }

  async openShippingAddressMenu() {
    await this.sideMenuShippingAddressLink.click();
  }

  async openProfileMenu() {
    await this.sideMenuProfileLink.click();
  }

  async getCurrentUrl(){
    return await browser.getUrl();
  }
}

export default new SideMenuPage();

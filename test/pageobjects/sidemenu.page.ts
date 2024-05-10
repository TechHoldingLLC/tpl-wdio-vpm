import { $ } from "@wdio/globals"
import Page from "./page.js"

class SideMenuPage extends Page {

  public get sideMenu() {
    return $("//div[contains(@class, 'Header_navbar-collapse')]/ul[contains(@class,'Header_navbar-nav-right')]/li[3]")
  }

  public async openSideMenu() {
    await this.sideMenu.waitForDisplayed()
    await this.sideMenu.waitForClickable()
    await this.sideMenu.click()
  }

  async getCurrentUrl(){
    return await browser.getUrl()
  }

  public async openMenu(menuName: string): Promise<void> {
    const menuItemSelector = `//span[contains(@class, 'Header_menu-item-title') and text()='${menuName}']`
    const menuItemElement = await $(menuItemSelector)
    await menuItemElement.waitForClickable()
    await menuItemElement.click()
    await browser.pause(2000)
  }
}

export default new SideMenuPage()

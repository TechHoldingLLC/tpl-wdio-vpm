import Page from "./page.js"
import pkg from 'lodash'
const { isEqual } = pkg

class ProfileSideMenuPage extends Page{

    public get profileMenuOptions(){
        return $$("//div[contains(@class,'Header_sidebar-body')]/div[3]/a/div/div/span[1]")
    }

    public async validateProfileSideMenuList(expectedProfileSubMenuList: string[]): Promise<boolean>{
        const profileMenuList = await this.profileMenuOptions
        if (profileMenuList.length === 0) {
          console.error("Profile menu options not found.");
          return false;
        }
        const actualProfileSubMenuList: string[] = []

        for (let i = 0; i < profileMenuList.length; i++) {
          await profileMenuList[i].waitForDisplayed();
          const profileSubMenuText = await profileMenuList[i].getText()
          console.log(profileSubMenuText)
          actualProfileSubMenuList.push(profileSubMenuText)
        }
        console.log(`Actual Profile Sub Menu List ${actualProfileSubMenuList}`);
        if (isEqual(actualProfileSubMenuList.sort(), expectedProfileSubMenuList.sort())) {
          return true
        }
          return false
    }

    public get ordersOption(){
      return $("(//div[contains(@class,'Header_menu-item')])[1]/span[1]")
    }

    public get subscriptionOption(){
      return $("(//div[contains(@class,'Header_menu-item')])[2]/span[1]")
    }

    public get savedCardOption(){
      return $("(//div[contains(@class,'Header_menu-item')])[3]/span[1]")
    }

    public get shippingAddressOption(){
      return $("(//div[contains(@class,'Header_menu-item')])[4]/span[1]")
    }

    public get profileOption(){
      return $("(//div[contains(@class,'Header_menu-item')])[5]/span[1]")
    }

    public get myOrdersPage(){
      return $("//div[@class = 'page-title']/div/div/h2")
    }

    public get myOrderList(){
      return $("//div[contains(@class,'MyOrder_order-list')]/h3")
    }

    public get subscriptionPage(){
      return $("h2");
    }

    public get savedCardsPage(){
      return $("h2");
    }

    public get subscriptions(){
      return $$("div.page-md-container")
    }

    public async getSubscriptionsCount(){
      const subscriptionCount = await this.subscriptions.length
      console.log(`Subscription Count is: ${subscriptionCount}`)
      return subscriptionCount
    }

    public get addCardButton(){
      return $("//button[contains(@class,'SavedCards_btn-add')]")
    }
}

export default new ProfileSideMenuPage()

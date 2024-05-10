import fs from 'fs'
import pkg from 'lodash'
const { isEqual } = pkg

class AdminPage{

    public async launchAdminPortal(){
        await browser.url("https://admin.qa.viapromeds.com/")
        // await browser.url("https://admin.stage.viapromeds.com/")
    }

    public get header(){
        return $('h1')
    }

    public get signInWithSSOButton(){
        return $("//a[.='SIGN IN WITH SSO']")
    }

    public get EHRUserNameField(){
        return $("#username")
    }

    public get EHRContinueButton(){
        return $("//input[@type='submit']")
    }

    public get EHRPasswordField(){
        return $("#password")
    }

    public get EHRLoginButton(){
        return $("#login")
    }

    public async loginToAdminPanel(){
        await this.signInWithSSOButton.waitForClickable()
        await this.signInWithSSOButton.click()
        await browser.pause(5000)
        await this.EHRUserNameField.waitForDisplayed()
        await this.EHRUserNameField.setValue("vipul123")
        await this.EHRContinueButton.waitForClickable()
        await this.EHRContinueButton.click()
        await browser.pause(3000)
        await this.EHRPasswordField.waitForDisplayed()
        await this.EHRPasswordField.setValue("Tech@123456@2")
        await this.EHRLoginButton.waitForClickable()
        await this.EHRLoginButton.click()
        await browser.pause(4000)
    }

    public get iConsultApprovalList(){
        return $('h2')
    }

    public get adminSidePannelList(){
        return $("//a[contains(@class, 'PatientList_navbar-link')]")
    }

    public get iConsultApprovalListTabOptions(){
        return $$("//div[@class='custom-tab']/ul/li")
    }

    public async validateiConsultApprovalListTab(): Promise<boolean>{
        const tabList = await this.iConsultApprovalListTabOptions
        const actualTabsOptions: string[] = []
        const expectedTableTabList: string[] = ["Pending", "In Progress", "Completed"]

        for(const el of tabList){
            actualTabsOptions.push(await el.getText())
        }

        const isSuccess = JSON.stringify(actualTabsOptions) === JSON.stringify(expectedTableTabList)
        console.log(isSuccess ? "Success" : "Failure")
        return isSuccess
    }

    public async orderDetails(): Promise<{ productName: string; orderNumber: string }>{
         const orders = JSON.parse(fs.readFileSync('./test/data/generatedOrderDetails.json', 'utf8'))

         // Extract product name and order number
         const productName = Object.keys(orders)[0]
         const orderNumber = orders[productName]
 
         console.log(`Product Name: ${productName}`)
         console.log(`Order Number: ${orderNumber}`)
 
         return { productName, orderNumber }
    }

    public get orderIdSearchBox(){
        return $("#search")
    }

    public get orderSearchButton(){
        return $("//button[@type='sumbit']")
    }

    public async orderSearch(orderNumber: string){
        await this.orderIdSearchBox.addValue(orderNumber)
        await browser.pause(1000)
        await this.orderSearchButton.click()
        await browser.pause(3500) 
    }

    public get searchResulRow(){
        return $$("//table[contains(@class,'PatientList_table-data')]/tbody/tr")
    }
    public async validateOrderSearch(){
        const rows = await this.searchResulRow
        const length = rows.length
        console.log(`Number of rows: ${length}`)
        return length
    }

    public async searchedOrderDetails(): Promise<{ orderId: string; orderPaymentStatus: string; orderStatus: string }> {
        // Extracting order details
        const orderId = await $("//table[contains(@class,'PatientList_table-data')]/tbody/tr/td[2]").getText()
        const orderPaymentStatus = await $("//table[contains(@class,'PatientList_table-data')]/tbody/tr/td[8]").getText()
        await browser.pause(1000)
        const orderStatus = await $("//table[contains(@class,'PatientList_table-data')]/tbody/tr/td[9]/span").getText()
        // Returning order details
        return { orderId, orderPaymentStatus, orderStatus }
    }

    public get selectOrderCheckBox(){
        return $("//table[contains(@class,'PatientList_table-data')]/tbody/tr/td[1]")
    }

    public get orderSelectionText(){
        return $("//span[contains(@class, 'PatientList_selected-item-text')]")
    }

    public get sendToEHRButton(){
        return $("button[type=submit]")
    }

    public get InProgressTab(){
        return $("//li[.='In Progress']")
    }

    public get orderSearchedResult(){
        return $("//table/tbody/tr/td[1]")
    }

    public get orderPaymentStatusInProgressTab(){
        return $("//table/tbody/tr/td[7]")
    }

    public get orderStatusInProgressTab(){
        return $("//table/tbody/tr/td[8]/span")
    }

    public get orderDetailsButton(){
        return $("//span[normalize-space()='Order Details']")
    }

    public get orderDetailsPageHeader(){
        return $('h5')
    }

    public async getOrderInformation(): Promise<string>{
        const orderId = await $("//span[contains(@class, 'MyOrder_order-id')]")
        const actualOrderId: string = await orderId.getText()
        const order: string = actualOrderId.split(":")[1].trim()
        return order
    }

    public get medicineName(){
        return $("//div[contains(@class,'MyOrder_cart-item')]/div/h4")
    }

    public get orderPaymentTotalStatus(){
        return $("//div[contains(@class,'MyOrder_total-pay')]/div[@class='title-badge']/span[2]")
    }

    public get orderedElement(){
        return $("//li[contains(.,'Ordered')]")
    }

    public async validateTrackHistoryOptions(){
        const trackHistoryOptions = await $$('//li[contains(@class, "progress-step")]//h4');
        const expectedOptions = ['Ordered', 'Approved', 'Prescribed', 'Shipped', 'Delivered'];
        let actualOptions: string[] = []
        if (trackHistoryOptions.length === 0) {
            console.error("trackHistory options are not found.")
            return false
        }
        for(const option of trackHistoryOptions){
            const optionText= await option.getText()
            actualOptions.push(optionText)
        }
        console.log(actualOptions)
        if (isEqual(actualOptions.sort(), expectedOptions.sort())) {
            return true
        }
        return false
    }

    public get orderDetailsCloseIcon(){
        return $("//span[contains(@class,'MyOrder_close-icon')]")
    }

    public get progressMakerElement(){
        return $('//li[@class="progress-step is-complete"]//div[@class="progress-marker"]')
    }

    public async isElementBackgroundColorGreen(): Promise<boolean> {
        const element = await this.progressMakerElement
    
        const getComputedStyleJs = `
            const elem = arguments[0];
            const afterPseudoElement = getComputedStyle(elem, '::after');
            return afterPseudoElement.getPropertyValue('background-color');
        `;
    
        const backgroundColor = await browser.execute(getComputedStyleJs, element)
        console.log(backgroundColor)
    
        // Convert RGB to Hex
        const rgbValues = (backgroundColor as string).match(/\d+/g)
        const hexColor = `#${(rgbValues ?? []).map((value) => parseInt(value, 10).toString(16).padStart(2, '0')).join('')}`
        console.log(hexColor) // Output: #1C7E0C
    
        // Validate that the color is a shade of green
        const isGreen: boolean =
            hexColor.startsWith('#') &&
            parseInt(hexColor.substring(1, 3), 16) < 80 &&
            parseInt(hexColor.substring(3, 5), 16) > 100;
    
    return isGreen
    }

}

export default new AdminPage()

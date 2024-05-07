import fs from 'fs'

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
        const expectedTableTabList: string[] = ["Pending", "In Progress"]

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

}

export default new AdminPage()

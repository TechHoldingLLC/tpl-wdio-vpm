import adminPage from "../pageobjects/admin.page.js"

describe('Admin Panel features', () => {

    let orderID: string

    before(async() => {
        // For stage, kindly change URL in the function - launchAdminPortal
        await adminPage.launchAdminPortal()
        await adminPage.header.waitForDisplayed()
    })

    /*
    Pre-Requisite: 
        Please run iConsultPEHomePage_test.ts test before 
        running this test case
    
        iConsultPEHomePage_test.ts test will generate the Order for which added card 
        is "0000 0000 0000 0000" and on sending order to EHR, it will be declined
    */  

    it('Verify iConsult completed orders in the Admin Panel Pending Tab', async() => {
        const url = await browser.getUrl()
        if(url.includes('qa')){
            expect(browser).toHaveUrl("https://admin.qa.viapromeds.com/")
        } else if (url.includes('stage')){
            expect(browser).toHaveUrl("https://admin.stage.viapromeds.com/")
        } else {
            expect(browser).toHaveUrl("https://admin.viapromeds.com/")
        }
        
        expect(await adminPage.header.getText()).toEqual("Admin")
        await adminPage.loginToAdminPanel()
        expect(await browser.getUrl()).toHaveText("patients")

        await adminPage.iConsultApprovalList.waitForDisplayed()
        expect(await adminPage.iConsultApprovalList.getText()).toEqual("iConsult Approval List")

        await adminPage.adminSidePannelList.waitForDisplayed()
        expect(await adminPage.adminSidePannelList.getText()).toEqual("Prescriptions")
        expect(await adminPage.validateiConsultApprovalListTab()).toBeTruthy()

        const orderDetails = await adminPage.orderDetails()
        orderID = orderDetails.orderNumber
        await adminPage.orderSearch(orderDetails.orderNumber)
        const orderSearchResultCount = await adminPage.validateOrderSearch()
        expect(orderSearchResultCount).toEqual(1)

        const searchedOrderData = await adminPage.searchedOrderDetails()
        expect(searchedOrderData.orderId).toEqual(orderDetails.orderNumber)
        expect(searchedOrderData.orderPaymentStatus).toEqual("Pending")
        expect(searchedOrderData.orderStatus).toEqual("Medication pending")
    })

    it('C29964 Verify that Admin is not able to send Order to EHR', async() => {
        await adminPage.selectOrderCheckBox.click()
        await browser.pause(1000)
        console.log("Order selected successfully")
        await adminPage.orderSelectionText.waitForDisplayed()
        expect(await adminPage.orderSelectionText.getText()).toEqual("1 Selected")
        await adminPage.sendToEHRButton.waitForClickable()
        await adminPage.sendToEHRButton.click()
        await browser.pause(5000)
        await adminPage.orderIdSearchBox.clearValue()
        await adminPage.orderSearch(orderID)

        const orderDetails = await adminPage.orderDetails()
        orderID = orderDetails.orderNumber

        const searchedOrderData = await adminPage.searchedOrderDetails()
        expect(searchedOrderData.orderId).toEqual(orderID)
        console.log(`Order Payment Status: ${searchedOrderData.orderPaymentStatus}`)
        expect(searchedOrderData.orderPaymentStatus).toEqual("Declined")
        expect(searchedOrderData.orderStatus).toEqual("Medication pending")
    })
})

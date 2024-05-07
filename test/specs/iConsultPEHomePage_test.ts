import homePage from "../pageobjects/home.page.js"
import iConsult from "../pageobjects/iConsult.page.js"
import iConsultPEFlow from "../pageobjects/iconsult.PE.page.js"
import LoginPage from "../pageobjects/vpm_login.page.js"
import fs from 'fs'

describe('iConsult feature- End to End flow', () => {

    let pagetitle: any
    let logindata: any
    let iConsultPEData: any

    before(async () => {
        await homePage.openHomepage()
        pagetitle = JSON.parse(fs.readFileSync('./test/data/pageTitles.json', 'utf-8'))
        logindata = JSON.parse(fs.readFileSync('./test/data/login.json', 'utf-8'))
        iConsultPEData = JSON.parse(fs.readFileSync('./test/data/iConsultPE.json', 'utf-8'))
        await browser.maximizeWindow()
    })
    
    it('iConsultPE flow from HomePage without Sign In', async() => {
        const IDProofPath: string = "./test/data/IDProof.png"
        const photoPath: string = "./test/data/Photo.jpg"
        let loginData: any
        const dob: string = "02061993"

        expect(await homePage.aboutUs.isDisplayed()).toBe(true)
        await browser.pause(2000)

        const url: string = await browser.getUrl()
        const language: string = await homePage.getLanguageFromUrl(url)

        const expectedPageTitle: string = language === 'en' ? pagetitle.pg_title_home : pagetitle.pg_title_home_es
        expect(await browser.getTitle()).toEqual(expectedPageTitle)

        await homePage.getStartediConsultButton.waitForClickable()
        await homePage.getStartediConsultButton.click()
        await browser.pause(5000)
        await iConsult.consentCheckbox.waitForDisplayed()
        await iConsult.consentCheckbox.click()
        await iConsult.consentContinueButton.waitForClickable()
        await iConsult.consentContinueButton.click()
        await browser.pause(5000)
        await iConsult.iConsultPEselection.click()
        
        await iConsult.dobPage.waitForDisplayed()
        const actualDOBPageText: string = await iConsult.dobPage.getText()
        const expectedDOBPageText: string = language === 'en' ? iConsultPEData.iConsultPE_DOBPageText : iConsultPEData.iConsultPE_DOBPageText_es
        await expect(actualDOBPageText).toEqual(expectedDOBPageText)
        await iConsult.enterDOB(dob)

        await iConsult.iConsultEligibilityText.waitForDisplayed()
        const expectedEligibilityText: string = language === 'en' ? iConsultPEData.iConsultPE_EligibilityText : iConsultPEData.iConsultPE_EligibilityText_es
        const actualEligibilityText: string = await iConsult.iConsultEligibilityText.getText()
        await expect(actualEligibilityText).toEqual(expectedEligibilityText)

        await iConsult.iConsultEligibilityContinueBtn.waitForClickable()
        await iConsult.iConsultEligibilityContinueBtn.click()

        await iConsult.iConsultLetsGetStartScreen.waitForDisplayed()
        await iConsult.iConsultRegisterSignUpPage.waitForDisplayed()
        await iConsult.iConsultPageSignIn.click()

        if(url.includes('qa')){
            loginData = logindata.login_valid
        } else if(url.includes('stage')){
            loginData = logindata.stage_login_valid
        } else {
            loginData = logindata.prod_login_valid
        }
        await LoginPage.login(loginData.login_email, loginData.login_password)
        await browser.pause(10000)
        if(await iConsult.startNewiConsult.isDisplayed()){
            await iConsult.startNewiConsult.click()
        }
        await iConsultPEFlow.iConsultPEQuestionsandAnswer()
        
        await iConsult.recommendationPills.waitForDisplayed()
        const Recommendation_medicine_title = await iConsult.pillName.getText()
        console.log(`Recommended Medicine Name: ${Recommendation_medicine_title}`)
        expect(Recommendation_medicine_title).toEqual(iConsultPEData.iConsultPE_MedicineName)
        
        const expectedMedicineDescription: string = language === 'en' ? iConsultPEData.iConsultPE_MedicineDescription : iConsultPEData.iConsultPE_MedicineDescription_es
        expect(await iConsult.productDescription.getText()).toEqual(expectedMedicineDescription)
        
        await iConsult.productContinueButton.waitForClickable()
        await iConsult.productContinueButton.click()

        await iConsult.subscriptionPlanOptions.waitForDisplayed()
        await iConsult.subscriptionSixMonthOption.click()
        const subscriptionPlanDurationValue:string = await iConsult.subscriptionSixMonthOptionText.getText()
        console.log(`Subscription Plan selected by the User: ${subscriptionPlanDurationValue}`)
        const subscriptionPlanAmount: string = await iConsult.subscriptionSixMonthOptionValue.getText()
        console.log(`Subscription Plan Amount: ${subscriptionPlanAmount}`)
        await browser.pause(1000)
        await iConsult.subscriptionPlanContinueButton.click()
        await browser.pause(1500)

        await iConsult.shippingAddressOptions.waitForDisplayed()
        await iConsult.ship_select_address.click()
        await browser.pause(1500)
        await iConsult.ship_save_btn.scrollIntoView()
        await iConsult.ship_save_btn.click()
        await browser.pause(2000)

        await iConsult.uploadPhotoIDProofs(IDProofPath, photoPath)
        await iConsult.iConsultPage.waitForDisplayed()
        expect(iConsult.iConsultPage).toHaveText(iConsultPEData.iConsultPE_Summary)
        await browser.pause(5000)

        const actualProductName: string = await iConsult.productName.getText()
        console.log(`Actual Product Name: ${actualProductName}`)
        expect(iConsult.productName).toHaveText(iConsultPEData.iConsultPE_SummaryMedicine)
        
        const prodSubscriptionPlan:string = await iConsult.productSubscriptionPlan.getText()
        console.log(`prodSubscriptionPlan is : ${prodSubscriptionPlan}`)
        expect(prodSubscriptionPlan).toEqual(subscriptionPlanDurationValue)

        const prodSubscriptionPrice:string = await iConsult.productSubscriptionPrice.getText()
        console.log(`Product Subscription Price: ${prodSubscriptionPrice}`)
        expect(prodSubscriptionPrice).toEqual(subscriptionPlanAmount)

        await $("//div[contains(@class, 'Summary_card-number')]/a").click()
        await browser.pause(3500)
        // Switch to card iframe
        await iConsult.cardIframe.waitForExist({ timeout: 10000 })
        await browser.switchToFrame(await iConsult.cardIframe)
        expect(await iConsult.cardIframe).toExist()
        await browser.pause(2000)
        await iConsult.addCardDetails("0000 0000 0000 0000", "12/28")
        await browser.pause(2500)
        await browser.switchToParentFrame()
        /*
        await iConsult.addNewCard.scrollIntoView()
        await iConsult.cardSelection.click()
        await browser.pause(1000)
        */
        await browser.pause(2500)
        await iConsult.submitOrder.scrollIntoView()
        await iConsult.submitOrder.click()
        await browser.pause(1500)
        await iConsult.iConsultCompletionScreen.waitForDisplayed()

        const completionMsg: string = language === 'en' ? iConsultPEData.iConsultPE_CompletionMsg : iConsultPEData.iConsultPE_CompletionMsg_es
        console.log("Completion message is : " + completionMsg)
        const iConsultCompletionMessage:string = await iConsult.iConsultCompletionScreen.getText()
        console.log(`iConsultCompletionMessage is: ${iConsultCompletionMessage}`)
        await expect(iConsultCompletionMessage).toEqual(completionMsg)
        await browser.pause(2000)
    
        await iConsult.viewOrderDetailsButton.click()
        await iConsult.orderDetailsScreen.waitForDisplayed()
        await iConsult.orderListTab.waitForDisplayed()

        const orderId: string = await iConsult.getOrderID()
        console.log(`My Order ID is: ${orderId}`)

        const jsonFilePath = './test/data/generatedOrderDetails.json'
        const clearOrderDetails = () => {
            fs.writeFileSync(jsonFilePath, JSON.stringify({}, null, 4)) // Write an empty object to the file
            console.log(`Order details have been cleared from ${jsonFilePath}`)
        }

        const orderDetails: Record<string, string> = {}
        orderDetails[Recommendation_medicine_title] = orderId
        
        fs.writeFileSync(jsonFilePath, JSON.stringify(orderDetails, null, 4))
        console.log('Order details have been written to orderDetails.json')

        const orderInformation = await iConsult.getOrderInformation()
        console.log(`Order Product Name is: "${orderInformation.productName}"`)
        expect(await iConsult.orderDetailProductName.getText()).toEqual(Recommendation_medicine_title)
        console.log(`Order Details: Product Subscription Plan is: "${orderInformation.subscriptionPlan}"`)
        expect(await iConsult.orderDetailsProductSubscriptionPlan).toHaveText(subscriptionPlanDurationValue)
        console.log(`Order Details: Product Total Price is: "${orderInformation.totalPrice}"`)
        expect(await iConsult.orderDetailsProductTotalPrice.getText()).toEqual(subscriptionPlanAmount)

    })
})

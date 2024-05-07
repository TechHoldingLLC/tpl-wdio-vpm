import iConsultPEFlow from "../pageobjects/iconsult.PE.page.js"
import LoginPage from "../pageobjects/vpm_login.page.js"
import iConsult from "../pageobjects/iConsult.page.js"
import fs from 'fs'

describe("iConsult Features", () => {
  before(async () => {
    await LoginPage.openSignin()
  })

  it("C29655 Verify iConsult PE Flow - Paroxetine", async () => {
    const IDProofPath: string = "./test/data/IDProof.png"
    const photoPath: string = "./test/data/Photo.jpg"
    const logindata = JSON.parse(fs.readFileSync('./test/data/login.json', 'utf-8'))
    const iConsultPEData = JSON.parse(fs.readFileSync('./test/data/iConsultPE.json', 'utf-8'))
    let loginData: any

    const url= await browser.getUrl()
    if(url.includes('qa')){
      loginData = logindata.login_valid
    } else if(url.includes('stage')){
      loginData = logindata.stage_login_valid
    } else {
      loginData = logindata.prod_login_valid
    }
    await LoginPage.login(loginData.login_email, loginData.login_password)
  
    await browser.pause(3000)
    await iConsult.startFreeiConsultbutton.waitForClickable()
    await iConsult.startFreeiConsultbutton.click()
    await iConsult.consentCheckbox.waitForDisplayed()
    await iConsult.consentCheckbox.click()
    await iConsult.consentContinueButton.waitForClickable()
    await iConsult.consentContinueButton.click()
    await browser.pause(5000)
    await iConsult.iConsultPEselection.click()
    await browser.pause(5000)
    if(await iConsult.startNewiConsult.isDisplayed()){
        await browser.pause(2000)
        await iConsult.startNewiConsult.click()
        await browser.pause(2000)
    }
    await iConsultPEFlow.iConsultPEQuestionsandAnswer()
    await iConsult.recommendationPills.waitForDisplayed()
    const Recommendation_medicine_title = await iConsult.pillName.getText()
    console.log(`Recommended Medicine Name: ${Recommendation_medicine_title}`)
    expect(await iConsult.pillName.getText()).toEqual(iConsultPEData.iConsultPE_MedicineName)
    
    const currentUrl: string = await browser.getUrl()
    await iConsult.getLanguageFromUrl(currentUrl)

    if(currentUrl.includes('en')){
      expect(await iConsult.productDescription.getText()).toHaveText(iConsultPEData.iConsultPE_MedicineDescription)
    } else {
      expect(await iConsult.productDescription.getText()).toHaveText(iConsultPEData.iConsultPE_MedicineDescription_es)
    }

    await iConsult.productContinueButton.waitForClickable()
    await iConsult.productContinueButton.click()
    await browser.pause(2000)
    await iConsult.subscriptionPlanOptions.waitForDisplayed()
    await iConsult.subscriptionSixMonthOption.click()
    await browser.pause(1500)

    const iConsult_SubscriptionPlan = await iConsultPEFlow.fetch_subscription_plan.getText()
    const iConsult_SubscriptionPlanAmount = await iConsultPEFlow.fetch_subscription_amount.getText()
    console.log(`Selected Subscription Plan: ${iConsult_SubscriptionPlan}`)
    console.log(`Subscription Plan Amount: ${iConsult_SubscriptionPlanAmount}`)
    await browser.pause(2000)
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
    expect(await iConsult.iConsultPage).toHaveText(iConsultPEData.iConsultPE_SummaryTitle)
    await browser.pause(5000)
    await expect(iConsultPEFlow.prescribed_medicine).toHaveText(
      iConsultPEData.iConsultPE_MedicineName)
    await iConsult.addNewCard.scrollIntoView()
    await iConsult.cardSelection.click()
    await browser.pause(1000)
    await iConsult.submitOrder.click()
    if(currentUrl.includes('en')){
      expect(await iConsultPEFlow.iConsultCompletedMessage).toHaveText(
        iConsultPEData.iConsultPE_CompletionMsg)
    }
    else {
      expect(await iConsultPEFlow.iConsultCompletedMessage).toHaveText(
        iConsultPEData.iConsultPE_CompletionMsg_es)
    }
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
    expect(await iConsult.orderDetailsProductSubscriptionPlan).toHaveText(iConsult_SubscriptionPlan)
    console.log(`Order Details: Product Total Price is: "${orderInformation.totalPrice}"`)
    expect(await iConsult.orderDetailsProductTotalPrice.getText()).toEqual(iConsult_SubscriptionPlanAmount)
  })
})

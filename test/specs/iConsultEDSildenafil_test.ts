import LoginPage from "../pageobjects/vpm_login.page.js"
import homePage from "../pageobjects/home.page.js"
import iConsult from "../pageobjects/iConsult.page.js"
import iConsultEDS from "../pageobjects/iConsultEDS.page.js"
import * as fs from 'fs'

describe('iConsult feature- End to End flow', () => {
    
    before(async () => {
        await LoginPage.openSignin()
        await browser.maximizeWindow()
    })

    it('Verify iConsult flow for Erectile dysfunction- Sildenafil medicine', async () => {
      const IDProofPath: string = "./test/data/IDProof.png"
      const photoPath: string = "./test/data/Photo.jpg"

      const rawdata = fs.readFileSync('./test/data/login.json', 'utf-8')
      const logindata = JSON.parse(rawdata)
      const url= await browser.getUrl()
      if(url.includes('qa')){
      await LoginPage.login(
        logindata.login_valid.login_email,
        logindata.login_valid.login_password)
      } else{
      await LoginPage.login(
        logindata.stage_login_valid.login_email,
        logindata.stage_login_valid.login_password)
      }
      await browser.pause(3000)
      await expect(await homePage.aboutUs.isDisplayed()).toBe(true)

      await iConsult.startFreeiConsultbutton.waitForClickable()
      await iConsult.startFreeiConsultbutton.click()
      await iConsult.consentCheckbox.waitForDisplayed()
      await iConsult.consentCheckbox.click()
      await iConsult.consentContinueButton.waitForClickable()
      await iConsult.consentContinueButton.click()
      await browser.pause(5000)
      await iConsult.iConsultEDselection.click()
      await browser.pause(10000)
      if(await iConsult.startNewiConsult.isDisplayed()){
        await iConsult.startNewiConsult.click()
      }
      await iConsultEDS.problemPresentQuestion.waitForDisplayed()
      await iConsultEDS.problemPresentOption5PlusYear.click()
      await iConsultEDS.continueButton.click()
      await browser.pause(1000)
      await iConsultEDS.EDStartQuestions.waitForDisplayed()
      //await iConsultEDS.EDStartGradually.click()
      await iConsultEDS.continueButton.click()
      await browser.pause(1000)

      await iConsultEDS.diagnosedWithAnyOfTheFollowing.waitForDisplayed()
      await iConsultEDS.noneOfTheAboveSelection.doubleClick()
      await iConsultEDS.continueButton.click()
      await browser.pause(1500)

      await iConsultEDS.medicationDailyQuestions.waitForDisplayed()
      await iConsultEDS.medicationNo.click()
      await iConsultEDS.continueButton.click()
      await browser.pause(1500)

      await iConsultEDS.takeAnyMedicationsQuestions.waitForDisplayed() 
      await iConsultEDS.noneOfTheAboveSelectionForMedications.doubleClick()
      await iConsultEDS.continueButton.click()
      await browser.pause(1500)

      await iConsultEDS.haveYouHadAnyOfConditionsQuestions.waitForDisplayed()
      await iConsultEDS.continueButton.scrollIntoView()
      await iConsultEDS.continueButton.click()
      await browser.pause(1500)

      await iConsultEDS.shareWithDoctorAnyMedication.waitForDisplayed()
      await iConsultEDS.shareWithDoctorAnyMedicationTextBox.setValue("Automation Testing");
      await iConsultEDS.continueButton.click()
      await browser.pause(1500)

      await iConsultEDS.allergicToAnyMedications.waitForDisplayed()
      await iConsultEDS.continueButton.click()
      await browser.pause(1500)

      await iConsultEDS.past3MonthsUsedAnySubstancesQuestions.waitForDisplayed()
      await iConsultEDS.continueButton.click()
      await browser.pause(1500)

      await iConsultEDS.wakeUpWithErectionOptions.waitForDisplayed()
      await iConsultEDS.continueButton.click()
      await browser.pause(1500)

      await iConsultEDS.anyMedicationBeforeQuestions.waitForDisplayed()
      await iConsultEDS.sildenafilMedicationOption.click()
      await browser.pause(1000)
      await iConsultEDS.continueButton.click()
      await browser.pause(1500)

      await iConsultEDS.dosageYouTakeOptions.waitForDisplayed()
      await iConsultEDS.hundredMgOption.click()
      await iConsultEDS.continueButton.click()
      await browser.pause(1500)

      await iConsultEDS.medicationAgainQuestion.waitForDisplayed()
      await iConsultEDS.medicationAgainYes.click()
      await iConsultEDS.continueButton.click()
      await browser.pause(5000)

      await iConsult.recommendationPills.waitForDisplayed()
      expect(iConsult.pillName).toHaveText('Sildenafil')
      expect(iConsult.productDescription).toHaveText("An erectile dysfunction medication that's FDA approved and clinically proven to treat ED, sildenafil has the same active ingredient as Viagra®. Better sex, at a lower price")    
      await iConsultEDS.dosageStrengthHundredMG.click()
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
      await iConsult.ship_select_address.click();
      await browser.pause(1500)
      await iConsult.ship_save_btn.scrollIntoView()
      await iConsult.ship_save_btn.click()
      await browser.pause(2000)

      await iConsult.uploadPhotoIDScreen.waitForDisplayed()
      await iConsult.uploadPhoto(IDProofPath)
      await iConsult.uploadOrTakePhotoScreen.waitForDisplayed()
      await iConsult.uploadPhoto(photoPath)
      await iConsult.iConsultPage.waitForDisplayed()
      expect(iConsult.iConsultPage).toHaveText('iConsult Summary')
      await browser.pause(5000)

      const actualProductName: string = await iConsult.productName.getText()
      console.log(`Actual Product Name: ${actualProductName}`)
      expect(iConsult.productName).toHaveText('Sildenafil')
      const prodSubscriptionPlan:string = await iConsult.productSubscriptionPlan.getText()
      console.log(`prodSubscriptionPlan is : ${prodSubscriptionPlan}`)
      expect(prodSubscriptionPlan).toEqual(subscriptionPlanDurationValue)

      const prodSubscriptionPrice:string = await iConsult.productSubscriptionPrice.getText()
      console.log(`Product Subscription Price: ${prodSubscriptionPrice}`)
      expect(prodSubscriptionPrice).toEqual(subscriptionPlanAmount)

      await iConsult.addNewCard.scrollIntoView()
      await iConsult.cardSelection.click()
      await browser.pause(1000)
      await iConsult.submitOrder.click()
      await iConsult.iConsultCompletionScreen.waitForDisplayed()
      const iConsultCompletionMessage:string = await iConsult.iConsultCompletionScreen.getText()
      console.log(`iConsultCompletionMessage is: ${iConsultCompletionMessage}`)
      expect(iConsult.iConsultCompletionScreen).toHaveText("Your iConsult is successfully completed")
      await iConsult.viewOrderDetailsButton.click()
      await iConsult.orderDetailsScreen.waitForDisplayed()
      await iConsult.orderListTab.waitForDisplayed()
      const orderId: string = await iConsult.getOrderID()
      console.log(`My Order ID is: ${orderId}`)

      const orderProductName: string= await iConsult.orderDetailProductName.getText()
      console.log(`Order Product Name is: ${orderProductName}`)
      expect(await iConsult.orderDetailProductName).toHaveText('Sildenafil')

      const orderProductSubscriptionPlan: string = await iConsult.orderDetailsProductSubscriptionPlan.getText()
      console.log(`Order Details: Product Subscription Plan is: ${orderProductSubscriptionPlan}`)
      expect(await iConsult.orderDetailsProductSubscriptionPlan).toHaveText('6 Months');

      const orderedProductTotalPrice: string = await iConsult.orderDetailsProductTotalPrice.getText();
      console.log(`Order Details: Product Total Price is: ${orderedProductTotalPrice}`)
      expect(await iConsult.orderDetailsProductTotalPrice).toHaveText('$285.00')
    })
})

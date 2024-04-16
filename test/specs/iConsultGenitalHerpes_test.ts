import LoginPage from "../pageobjects/vpm_login.page.js"
import homePage from "../pageobjects/home.page.js"
import iConsult from "../pageobjects/iConsult.page.js"
import iConsultGHPage from "../pageobjects/iConsult.GH.page.js"
import * as fs from 'fs'

describe('iConsult feature- End to End flow', () => {
    
    before(async () => {
        await LoginPage.openSignin()
        await browser.maximizeWindow()
    })

    it('Verify iConsult flow for Genital Herpes', async () => {
      const IDProofPath: string = "./test/data/IDProof.png"
      const photoPath: string = "./test/data/Photo.jpg"

      const rawdata = fs.readFileSync('./test/data/login.json', 'utf-8')
      const logindata = JSON.parse(rawdata)
      await LoginPage.login(
        logindata.login_valid.login_email,
        logindata.login_valid.login_password
      )
      expect(await homePage.aboutUs.isDisplayed())

      await iConsult.startFreeiConsultbutton.waitForClickable()
      await iConsult.startFreeiConsultbutton.click()
      await iConsult.consentCheckbox.waitForDisplayed()
      await iConsult.consentCheckbox.click()
      await iConsult.consentContinueButton.waitForClickable()
      await iConsult.consentContinueButton.click()
      await iConsult.problemAddressQuestionsScreen.waitForDisplayed()
      await iConsult.iConsultGHselection.click()
      await browser.pause(5000)
      if(await iConsult.startNewiConsult.isDisplayed()){
        await iConsult.startNewiConsult.click()
      }
      await iConsultGHPage.diagnosedWithGHBeforeQuestions.waitForDisplayed()
      await iConsultGHPage.diagnosedWithGHBeforeYes.click()
      await browser.pause(1000);
      await iConsultGHPage.continueButton.click()
      await browser.pause(1000);

      await iConsultGHPage.problemPresentQuestion.waitForDisplayed();
      await iConsultGHPage.problemPresentOption5PlusYear.click();
      await browser.pause(1000);
      await iConsultGHPage.continueButton.click()
      await browser.pause(1000);

      await iConsultGHPage.medicalConditionQuestions.waitForDisplayed()
      //await iConsultGHPage.noneOfTheseApplyMeOption.waitForExist()
      const flag = await iConsultGHPage.noneOfTheseApplyMeOption.isSelected()
      console.log("Flag value: "+flag)

      if(!await iConsultGHPage.noneOfTheseApplyMeOption.isSelected()){
        await iConsultGHPage.noneOfTheseApplyMeOption.doubleClick()
        await browser.pause(1500);
        await iConsultGHPage.continueButton.click()
        await browser.pause(1000);
      }else{
        await browser.pause(1500);
        await iConsultGHPage.continueButton.click()
      }

      await iConsultGHPage.herpeslocationQuestion.waitForDisplayed()
      await iConsultGHPage.noneOfTheAboveSelection.scrollIntoView()
      await iConsultGHPage.noneOfTheAboveSelection.waitForExist()
      if(! await iConsultGHPage.noneOfTheAboveSelection.isSelected()){
        await iConsultGHPage.noneOfTheAboveSelection.doubleClick()
      await browser.pause(1500);
      await iConsultGHPage.continueButton.click()
      await browser.pause(1000);
      }else{
        await browser.pause(1500);
        await iConsultGHPage.continueButton.click()
      }

      
      await iConsultGHPage.notTakingMedicineGHOutBreakQuestion.waitForDisplayed()
      await iConsultGHPage.GHOutBreakNo.click()
      await browser.pause(1500);
      await iConsultGHPage.continueButton.click()
      await browser.pause(1500);

      await iConsultGHPage.medicationDailyQuestions.waitForDisplayed()
      await iConsultGHPage.medicationDailyNoAnswer.click()
      await browser.pause(1500);
      await iConsultGHPage.continueButton.click()
      await browser.pause(1500);

      await iConsultGHPage.allergicMedicationQuestions.waitForDisplayed()
      await iConsultGHPage.allergicMedicationNoAnswer.click()
      await browser.pause(1500);
      await iConsultGHPage.continueButton.click()
      await browser.pause(2000);

      await iConsultGHPage.anyMedicationInPastQuestion.waitForDisplayed()
      await iConsultGHPage.noneOfTheseMedicationAnswer.doubleClick()
      await browser.pause(1500)
      await iConsultGHPage.continueButton.click()
      await browser.pause(1500);

      await iConsultGHPage.reasonForPrescriptionTodayQuestion.waitForDisplayed()
      await iConsultGHPage.believeOutBreakRightNow.click()
      await browser.pause(1500)
      await iConsultGHPage.continueButton.click()
      await browser.pause(1500);

      await iConsultGHPage.outBreaksQuestion.waitForDisplayed()
      await iConsultGHPage.onceAYearOutBreak.click()
      await browser.pause(1500)
      await iConsultGHPage.continueButton.click()
      await browser.pause(2000);

      await iConsult.recommendationPills.waitForDisplayed()
      expect(iConsult.pillName).toHaveText('Acyclovir')
      expect(iConsult.productDescription).toHaveText("A generic genital herpes medication that’s FDA approved and clinically proven to help stop the spread of the herpes virus in the body. Acyclovir can be taken to control a genital herpes outbreak, as well as preventing outbreaks from occurring in the future.")    
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
      expect(iConsult.productName).toHaveText('Acyclovir')
      const prodSubscriptionPlan:string = await iConsult.productSubscriptionPlan.getText()
      console.log(`prodSubscriptionPlan is : ${prodSubscriptionPlan}`)
      expect(prodSubscriptionPlan).toEqual(subscriptionPlanDurationValue)

      const prodSubscriptionPrice:string = await iConsult.productSubscriptionPrice.getText()
      console.log(`Product Subscription Price: ${prodSubscriptionPrice}`)
      expect(prodSubscriptionPrice).toEqual(subscriptionPlanAmount)

      await iConsult.addNewCard.scrollIntoView()
      //await iConsultFlow.addNewCard.click();
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
      console.log(`Order Product Name is: "${orderProductName}"`)
      expect(await iConsult.orderDetailProductName).toHaveText('Acyclovir')

      const orderProductSubscriptionPlan: string = await iConsult.orderDetailsProductSubscriptionPlan.getText()
      console.log(`Order Details: Product Subscription Plan is: "${orderProductSubscriptionPlan}"`)
      expect(await iConsult.orderDetailsProductSubscriptionPlan).toHaveText('6 Months');

      const orderedProductTotalPrice: string = await iConsult.orderDetailsProductTotalPrice.getText();
      console.log(`Order Details: Product Total Price is: "${orderedProductTotalPrice}"`)
      expect(await iConsult.orderDetailsProductTotalPrice).toHaveText('$135.00')
      
    });
});
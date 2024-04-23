import LoginPage from "../pageobjects/vpm_login.page.js"
import iConsult from "../pageobjects/iConsult.page.js"
import iConsultHairLoss from "../pageobjects/iConsult.HL.page.js"
import fs from 'fs'

describe('iConsult feature - End to End flow', () => {

    before(async () => {
        await LoginPage.openSignin()
        await browser.maximizeWindow()
    })

    it('Verify iConsult flow for HairLoss', async () => {
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

      await iConsult.startFreeiConsultbutton.waitForClickable()
      await iConsult.startFreeiConsultbutton.click()
      await browser.pause(2000)
      await iConsult.consentCheckbox.waitForDisplayed()
      await iConsult.consentCheckbox.click()
      await browser.pause(1000)
      await iConsult.consentContinueButton.waitForClickable()
      await iConsult.consentContinueButton.click()
      await iConsult.problemAddressQuestionsScreen.waitForDisplayed()
      await iConsult.iConsultHLselection.click()
      await browser.pause(3000)
      await iConsult.startNewiConsult.waitForDisplayed()
      await iConsult.startNewiConsult.click()
      await browser.pause(5000)
      await iConsultHairLoss.problemPresentOption3to5Year.doubleClick()
      await browser.pause(2000)
      await iConsultHairLoss.problemPresentOption5PlusYear.click()
      await browser.pause(2000)
      await iConsultHairLoss.continueButton.click()
      await browser.pause(2000)
      await iConsultHairLoss.diagnosedQuestions.waitForDisplayed()
      if(!await iConsultHairLoss.noneOfTheAboveProblem.isSelected()){
        await iConsultHairLoss.noneOfTheAboveProblem.doubleClick()
        await browser.pause(1500);
        await iConsultHairLoss.continueButton.click()
        await browser.pause(1000);
      }else{
        await browser.pause(1500);
        await iConsultHairLoss.continueButton.click()
      }
      await browser.pause(2000)
      await iConsultHairLoss.medicalConditionQuestions.waitForDisplayed()
      if(!await iConsultHairLoss.noneOfTheseApplyMeOption.isSelected()){
        await iConsultHairLoss.noneOfTheseApplyMeOption.doubleClick()
        await browser.pause(1500);
        await iConsultHairLoss.continueButton.click()
        await browser.pause(1000);
      }else{
        await browser.pause(1500);
        await iConsultHairLoss.continueButton.click()
      }
      await browser.pause(2000)
      await iConsultHairLoss.medicationDailyQuestions.waitForDisplayed()
      await iConsultHairLoss.medicationDailyNoAnswer.click();
      await browser.pause(2000);
      await iConsultHairLoss.continueButton.click()
      await browser.pause(2000)
      await iConsultHairLoss.allergicMedicationQuestions.waitForDisplayed()
      await iConsultHairLoss.allergicMedicationNoAnswer.click();
      await browser.pause(2000);
      await iConsultHairLoss.continueButton.click()
      await browser.pause(4000)
      
      await iConsult.recommendationPills.waitForDisplayed()
      const currentUrl: string = await browser.getUrl()
      await iConsult.getLanguageFromUrl(currentUrl)
      expect(iConsult.pillName).toHaveText('Finasteride')
      if(currentUrl.includes('en')){
        expect(iConsult.productDescription.getText()).toEqual("Finasteride is a once-a-day pill that is clinically proven to reduce hair-loss and increase regrowth by blocking the body's production of a male hormone in the scalp that stops hair growth.")    
      } else {
        expect(await iConsult.productDescription.getText()).toEqual("El finasteride es una pastilla diaria clínicamente comprobada para reducir la pérdida de cabello y aumentar el crecimiento bloqueando la producción de una hormona masculina en el cuero cabelludo que detiene el crecimiento del cabello.")
      }
      await iConsult.productContinueButton.waitForClickable()
      await iConsult.productContinueButton.click()
      await iConsult.subscriptionPlanOptions.waitForDisplayed()
      await iConsult.subscriptionSixMonthOption.click()
      await iConsult.subscriptionPlanContinueButton.click()
      await iConsult.stateResideOption.waitForDisplayed()
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
      await browser.pause(3000)

      const actualProductName: string = await iConsult.productName.getText()
      console.log(`Actual Product Name: ${actualProductName}`)
      expect(await iConsult.productName.getText()).toEqual('Finasteride')
      const prodSubscriptionPlan:string = await iConsult.productSubscriptionPlan.getText()
      console.log(`prodSubscriptionPlan is : ${prodSubscriptionPlan}`)
      await iConsult.addNewCard.scrollIntoView()
      await iConsult.cardSelection.click()
      await browser.pause(1000)
      await iConsult.submitOrder.click()
      await iConsult.iConsultCompletionScreen.waitForDisplayed()

      const iConsultCompletionMessage:string = await iConsult.iConsultCompletionScreen.getText()
      if(currentUrl.includes('en')){
        console.log(`iConsultCompletionMessage is: ${iConsultCompletionMessage}`)
        expect(await iConsult.iConsultCompletionScreen).toHaveText("Your iConsult is successfully completed")
      } else{
        console.log(`iConsultCompletionMessage is: ${iConsultCompletionMessage}`)
        expect(iConsult.iConsultCompletionScreen).toHaveText("¡Genial, su receta de iConsult se completó con éxito!")
      }
      await iConsult.viewOrderDetailsButton.click()
      await iConsult.orderDetailsScreen.waitForDisplayed()
      await iConsult.orderListTab.waitForDisplayed()
      const orderId: string = await iConsult.getOrderID()
      console.log(`My Order ID is: ${orderId}`)

      const orderInformation = await iConsult.getOrderInformation();
      console.log(`Order Product Name is: "${orderInformation.productName}"`)
      expect(await iConsult.orderDetailProductName.getText()).toEqual('Finasteride')
      console.log(`Order Details: Product Subscription Plan is: "${orderInformation.subscriptionPlan}"`)
      expect(await iConsult.orderDetailsProductSubscriptionPlan).toHaveText('6');
      console.log(`Order Details: Product Total Price is: "${orderInformation.totalPrice}"`)
      expect(await iConsult.orderDetailsProductTotalPrice.getText()).toEqual('$180.00')
      })
})

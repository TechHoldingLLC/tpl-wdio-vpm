import iConsultEDFlow from "../pageobjects/iconsult.ED.page.js";
import LoginPage from "../pageobjects/vpm_login.page.js";
import iConsult from "../pageobjects/iConsult.page.js";
import fs from "fs";

describe("iConsult Features", () => {
  before(async () => {
    await browser.url("");
    await browser.pause(2000);
    await LoginPage.signinButton.click();
    await browser.pause(2000);
  });

  it("C29653 iConsult: Verify iConsult flow for Erectile dysfunction - Tadalafil Medicine", async () => {
    const IDProofPath: string = "./test/data/IDProof.png";
    const photoPath: string = "./test/data/Photo.jpg";
    const logindata = JSON.parse(
      fs.readFileSync("./test/data/login.json", "utf-8")
    );
    const iConsultEDData = JSON.parse(
      fs.readFileSync("./test/data/iConsultED.json", "utf-8")
    );
    let loginData: any;

    const url = await browser.getUrl();
    const language: string = await iConsult.getLanguageFromUrl(url);
    if (url.includes("qa")) {
      loginData = logindata.login_valid;
    } else if (url.includes("stage")) {
      loginData = logindata.stage_login_valid;
    } else {
      loginData = logindata.prod_login_valid;
    }
    await LoginPage.login(loginData.login_email, loginData.login_password);

    await browser.pause(3000);
    await iConsult.sidemenuCloseButton.waitForClickable({ timeout: 3000 });
    await iConsult.sidemenuCloseButton.click();
    await browser.pause(2000);
    await iConsult.startFreeiConsultbutton.waitForClickable({ timeout: 3000 });
    await iConsult.startFreeiConsultbutton.click();
    await browser.pause(2000);
    await iConsult.consentCheckbox.waitForClickable();
    await iConsult.consentCheckbox.click();
    await browser.pause(2000);
    await iConsult.consentContinueButton.click();
    await browser.pause(7000);
    await iConsult.iConsultEDselection.click();
    await browser.pause(5000);
    if (await iConsult.startNewiConsult.isDisplayed()) {
      await iConsult.startNewiConsult.click();
      await browser.pause(2000);
    }

    await iConsultEDFlow.iConsultEDQuestionsandAnswer();
    await iConsult.recommendationPills.waitForDisplayed();

    const Recommendation_generic_medicine_title =
      language === "en"
        ? iConsultEDData.iConsult_GenericMedicineName_en
        : iConsultEDData.iConsult_GenericMedicineName_es;
    expect(await iConsult.pillName.getText()).toEqual(
      Recommendation_generic_medicine_title
    );

    expect(await iConsult.medicineName.getText()).toEqual(
      iConsultEDData.iConsultED_MedicineName
    );
    console.log(
      `Recommended Medicine Name: ${iConsultEDData.iConsultED_MedicineName}`
    );

    //const language: string = await iConsult.getLanguageFromUrl(url);
    const expectedMedicineDescription =
      language === "en"
        ? iConsultEDData.iConsultED_MedicineDescription_en
        : iConsultEDData.iConsultED_MedicineDescription_es;
    expect(await iConsult.productDescription.getText()).toEqual(
      expectedMedicineDescription
    );

    await iConsult.productContinueButton.click();
    await iConsult.subscriptionPlanOptions.waitForDisplayed();
    await iConsult.subscribeThreeMonthTL.click();
    await browser.pause(1500);

    const iConsult_SubscriptionPlan =
      await iConsultEDFlow.fetch_subscription_plan.getText();
    const iConsult_SubscriptionPlanAmount =
      await iConsultEDFlow.fetch_subscription_amount.getText();

    const subscriptionPlanDurationValue: string =
      await iConsultEDFlow.fetch_subscription_plan.getText();
    console.log(
      `Subscription Plan selected by the User: ${subscriptionPlanDurationValue}`
    );

    const subscriptionPlanAmount: string =
      await iConsultEDFlow.fetch_subscription_amount.getText();
    console.log(`Subscription Plan Amount: ${subscriptionPlanAmount}`);

    await browser.pause(2000);
    await iConsult.subscriptionPlanContinueButton.click();
    await browser.pause(1500);

    await iConsult.shippingAddressOptions.waitForDisplayed();
    await iConsult.ship_select_address.waitForDisplayed();
    await iConsult.ship_select_address.click();
    await browser.pause(1500);
    await iConsult.ship_save_btn.scrollIntoView();
    await browser.pause(1500);
    await iConsult.ship_save_btn.click();
    await browser.pause(2000);

    //await iConsult.uploadPhotoIDProofs(IDProofPath, photoPath);
    await iConsult.iConsultPage.waitForDisplayed();

    expect(await iConsult.iConsultPage).toHaveText(
      iConsultEDData.iConsultED_SummaryTitle
    );
    await browser.pause(5000);

    const actualProductName =
      language === "en"
        ? iConsultEDData.iConsultED_Summary_GenericMedicine_en
        : iConsultEDData.iConsultED_Summary_GenericMedicine_es;
    await expect(iConsultEDFlow.prescribed_medicine).toHaveText(
      actualProductName
    );
    console.log(`Actual Product Name: ${actualProductName}`);

    const prodSubscriptionPlan: string =
      await iConsult.productSubscriptionPlan.getText();
    console.log(`ProdSubscriptionPlan is : ${prodSubscriptionPlan}`);
    expect(prodSubscriptionPlan).toEqual(subscriptionPlanDurationValue);

    const prodSubscriptionPrice: string =
      await iConsult.productSubscriptionPrice.getText();
    console.log(`Product Subscription Price: ${prodSubscriptionPrice}`);
    expect(prodSubscriptionPrice).toEqual(subscriptionPlanAmount);

    await iConsult.cardSelection.scrollIntoView();
    await browser.pause(1000);
    await iConsult.cardSelection.click();
    await browser.pause(1000);
    await iConsult.submitOrder.scrollIntoView();
    await browser.pause(1000);
    await iConsult.submitOrder.click();
    await browser.pause(1000);

    const completionMsg =
      language === "en"
        ? iConsultEDData.iConsultED_CompletionMsg
        : iConsultEDData.iConsultED_CompletionMsg_es;
    await expect(iConsultEDFlow.iConsultCompletedMessage).toHaveText(
      completionMsg
    );
    await browser.pause(2000);
    await iConsult.viewOrderDetailsButton.click();
    await iConsult.orderDetailsScreen.waitForDisplayed();
    await iConsult.orderListTab.waitForDisplayed();

    const orderId: string = await iConsult.getOrderID();
    console.log(`My Order ID is: ${orderId}`);

    const jsonFilePath = "./test/data/generatedOrderDetails.json";
    const clearOrderDetails = () => {
      fs.writeFileSync(jsonFilePath, JSON.stringify({}, null, 4)); // Write an empty object to the file
      console.log(`Order details have been cleared from ${jsonFilePath}`);
    };

    const orderDetails: Record<string, string> = {};
    orderDetails[iConsultEDData.iConsultED_MedicineName] = orderId;

    fs.writeFileSync(jsonFilePath, JSON.stringify(orderDetails, null, 4));
    console.log("Order details have been written to orderDetails.json");

    const orderInformation = await iConsult.getOrderInformation();
    console.log(`Order Product Name is: "${orderInformation.productName}"`);
    expect(await iConsult.orderDetailProductName.getText()).toEqual(
      Recommendation_generic_medicine_title
    );
    console.log(
      `Order Details: Product Subscription Plan is: "${orderInformation.subscriptionPlan}"`
    );
    expect(await iConsult.orderDetailsProductSubscriptionPlan).toHaveText(
      iConsult_SubscriptionPlan
    );
    console.log(
      `Order Details: Product Total Price is: "${orderInformation.totalPrice}"`
    );
    expect(await iConsult.orderDetailsProductTotalPrice.getText()).toEqual(
      iConsult_SubscriptionPlanAmount
    );
  });
});

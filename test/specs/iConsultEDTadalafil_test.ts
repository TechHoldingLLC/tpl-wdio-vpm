import iConsultEDFlow from "../pageobjects/iconsult.ED.page.js";
import LoginPage from "../pageobjects/vpm_login.page.js";
import iConsult from "../pageobjects/iConsult.page.js";
import fs from "fs";

describe("iConsult Features", () => {
  before(async () => {
    await LoginPage.openSignin();
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
    if (url.includes("qa")) {
      loginData = logindata.login_valid;
    } else if (url.includes("stage")) {
      loginData = logindata.stage_login_valid;
    } else {
      loginData = logindata.prod_login_valid;
    }
    await LoginPage.login(loginData.login_email, loginData.login_password);

    await browser.pause(3000);
    await iConsult.sidemenuCloseButton.click();
    await browser.pause(2000);
    await iConsult.startFreeiConsultbutton.click();
    await browser.pause(2000);
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

    const Recommendation_medicine_title = await iConsult.pillName.getText();
    console.log(`Recommended Medicine Name: ${Recommendation_medicine_title}`);
    expect(Recommendation_medicine_title).toEqual(
      iConsultEDData.iConsultED_MedicineName
    );

    const language: string = await iConsult.getLanguageFromUrl(url);
    const expectedMedicineDescription =
      language === "en"
        ? iConsultEDData.iConsultED_MedicineDescription
        : iConsultEDData.iConsultED_MedicineDescription_es;
    expect(await iConsult.productDescription.getText()).toEqual(
      expectedMedicineDescription
    );

    await iConsult.productContinueButton.click();
    await iConsult.subscriptionPlanOptions.waitForDisplayed();
    await iConsult.subscriptionSixMonthOption.click();
    await browser.pause(1500);

    const iConsult_SubscriptionPlan =
      await iConsultEDFlow.fetch_subscription_plan.getText();
    const iConsult_SubscriptionPlanAmount =
      await iConsultEDFlow.fetch_subscription_amount.getText();
    console.log(`Selected Subscription Plan: ${iConsult_SubscriptionPlan}`);
    console.log(`Subscription Plan Amount: ${iConsult_SubscriptionPlanAmount}`);
    await browser.pause(2000);
    await iConsult.subscriptionPlanContinueButton.click();
    await browser.pause(1500);

    await iConsult.shippingAddressOptions.waitForDisplayed();
    await iConsult.ship_select_address.click();
    await browser.pause(1500);
    await iConsult.ship_save_btn.click();
    await browser.pause(2000);

    await iConsult.uploadPhotoIDProofs(IDProofPath, photoPath);
    await iConsult.iConsultPage.waitForDisplayed();

    expect(await iConsult.iConsultPage).toHaveText(
      iConsultEDData.iConsultED_SummaryTitle
    );
    await browser.pause(5000);
    await expect(iConsultEDFlow.prescribed_medicine).toHaveText(
      iConsultEDData.iConsultED_MedicineName
    );
    await iConsult.cardSelection.click();
    await browser.pause(1000);
    await iConsult.submitOrder.click();

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
    orderDetails[Recommendation_medicine_title] = orderId;

    fs.writeFileSync(jsonFilePath, JSON.stringify(orderDetails, null, 4));
    console.log("Order details have been written to orderDetails.json");

    const orderInformation = await iConsult.getOrderInformation();
    console.log(`Order Product Name is: "${orderInformation.productName}"`);
    expect(await iConsult.orderDetailProductName.getText()).toEqual(
      Recommendation_medicine_title
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

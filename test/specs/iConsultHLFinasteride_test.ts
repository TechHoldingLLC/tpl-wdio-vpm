import LoginPage from "../pageobjects/vpm_login.page.js";
import iConsult from "../pageobjects/iConsult.page.js";
import iConsultHairLoss from "../pageobjects/iConsult.HL.page.js";
import fs from "fs";

describe("iConsult feature - End to End flow", () => {
  before(async () => {
    await LoginPage.openSignin();
  });

  it("C29656 iConsult: Verify iConsult flow for Hair loss - Finasteride medicine", async () => {
    const IDProofPath: string = "./test/data/IDProof.png";
    const photoPath: string = "./test/data/Photo.jpg";
    const logindata = JSON.parse(
      fs.readFileSync("./test/data/login.json", "utf-8")
    );
    const iConsultHLData = JSON.parse(
      fs.readFileSync("./test/data/iConsultHL.json", "utf-8")
    );
    let loginData: any;

    const url: string = await browser.getUrl();
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

    await iConsult.startFreeiConsultbutton.click();
    await browser.pause(2000);
    await iConsult.consentCheckbox.click();
    await browser.pause(1000);
    await iConsult.consentContinueButton.click();
    await iConsult.problemAddressQuestionsScreen.waitForDisplayed();
    await iConsult.iConsultHLselection.click();
    await browser.pause(5000);

    if (await iConsult.startNewiConsult.isDisplayed()) {
      await iConsult.startNewiConsult.click();
      await browser.pause(2000);
    }

    await iConsultHairLoss.iConsultHLQuestionsandAnswers();

    await iConsult.recommendationPills.waitForDisplayed();
    const Recommendation_medicine_title = await iConsult.pillName.getText();
    console.log(`Recommended Medicine Name: ${Recommendation_medicine_title}`);
    expect(Recommendation_medicine_title).toEqual(
      iConsultHLData.iConsultHL_MedicineName
    );

    const expectedMedicineDescription =
      language === "en"
        ? iConsultHLData.iConsultHL_MedicineDescription
        : iConsultHLData.iConsultHL_MedicineDescription_es;
    expect(await iConsult.productDescription.getText()).toEqual(
      expectedMedicineDescription
    );
    await iConsult.productContinueButton.click();

    await iConsult.subscriptionPlanOptions.waitForDisplayed();
    await iConsult.subscriptionSixMonthOption.click();
    const subscriptionPlanDurationValue: string =
      await iConsult.subscriptionSixMonthOptionText.getText();
    console.log(
      `Subscription Plan selected by the User: ${subscriptionPlanDurationValue}`
    );
    const subscriptionPlanAmount: string =
      await iConsult.subscriptionSixMonthOptionValue.getText();
    console.log(`Subscription Plan Amount: ${subscriptionPlanAmount}`);
    await browser.pause(1000);
    await iConsult.subscriptionPlanContinueButton.click();
    await browser.pause(1500);

    await iConsult.stateResideOption.waitForDisplayed();
    await iConsult.shippingAddressOptions.waitForDisplayed();
    await iConsult.ship_select_address.click();
    await browser.pause(1500);
    await iConsult.ship_save_btn.click();
    await browser.pause(2000);

    await iConsult.uploadPhotoIDProofs(IDProofPath, photoPath);

    await iConsult.iConsultPage.waitForDisplayed();
    expect(iConsult.iConsultPage).toHaveText(
      iConsultHLData.iConsultHL_SummaryTitle
    );
    await browser.pause(3000);

    const actualProductName: string = await iConsult.productName.getText();
    console.log(`Actual Product Name: ${actualProductName}`);
    expect(iConsult.productName).toHaveText(
      iConsultHLData.iConsultHL_SummaryMedicine
    );

    const prodSubscriptionPlan: string =
      await iConsult.productSubscriptionPlan.getText();
    console.log(`ProdSubscriptionPlan is : ${prodSubscriptionPlan}`);
    expect(prodSubscriptionPlan).toEqual(subscriptionPlanDurationValue);

    const prodSubscriptionPrice: string =
      await iConsult.productSubscriptionPrice.getText();
    console.log(`Product Subscription Price: ${prodSubscriptionPrice}`);
    expect(prodSubscriptionPrice).toEqual(subscriptionPlanAmount);

    await iConsult.cardSelection.click();
    await browser.pause(1000);
    await iConsult.submitOrder.click();
    await iConsult.iConsultCompletionScreen.waitForDisplayed();

    const completionMsg =
      language === "en"
        ? iConsultHLData.iConsultHL_CompletionMsg
        : iConsultHLData.iConsultHL_CompletionMsg_es;
    await browser.pause(1500);
    const iConsultCompletionMessage: string =
      await iConsult.iConsultCompletionScreen.getText();
    console.log(`iConsultCompletionMessage is: ${iConsultCompletionMessage}`);
    expect(await iConsult.iConsultCompletionScreen.getText()).toEqual(
      completionMsg
    );
    await browser.pause(2000);

    await iConsult.viewOrderDetailsButton.click();
    await iConsult.orderDetailsScreen.waitForDisplayed();
    await iConsult.orderListTab.waitForDisplayed();
    const orderId: string = await iConsult.getOrderID();
    console.log(`My Order ID is: ${orderId}`);

    const jsonOrderFilePath = "./test/data/generatedOrderDetails.json";
    const clearOrderDetails = () => {
      fs.writeFileSync(jsonOrderFilePath, JSON.stringify({}, null, 4)); // Write an empty object to the file
      console.log(`Order details have been cleared from ${jsonOrderFilePath}`);
    };

    const orderDetails: Record<string, string> = {};
    orderDetails[Recommendation_medicine_title] = orderId;

    fs.writeFileSync(jsonOrderFilePath, JSON.stringify(orderDetails, null, 4));
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
      subscriptionPlanDurationValue
    );
    console.log(
      `Order Details: Product Total Price is: "${orderInformation.totalPrice}"`
    );
    expect(await iConsult.orderDetailsProductTotalPrice.getText()).toEqual(
      subscriptionPlanAmount
    );
  });
});

import LoginPage from "../pageobjects/vpm_login.page.js";
import iConsult from "../pageobjects/iConsult.page.js";
import iConsultEDS from "../pageobjects/iConsultEDS.page.js";
import fs from "fs";

describe("iConsult feature- End to End flow", () => {
  before(async () => {
    await browser.url("");
    await browser.pause(2000);
    await LoginPage.signinButton.click();
    await browser.pause(2000);
  });

  it("C29654 iConsult: Verify iConsult flow for Erectile dysfunction- Sildenafil medicine", async () => {
    const IDProofPath: string = "./test/data/IDProof.png";
    const photoPath: string = "./test/data/Photo.jpg";
    const logindata = JSON.parse(
      fs.readFileSync("./test/data/login.json", "utf-8")
    );
    const iConsultEDSData = JSON.parse(
      fs.readFileSync("./test/data/iConsultEDS.json", "utf-8")
    );

    const url: string = await browser.getUrl();
    const language: string = await iConsult.getLanguageFromUrl(url);

    let loginData: any;
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
    await browser.pause(3000);
    await iConsult.consentCheckbox.click();
    await iConsult.consentContinueButton.click();
    await browser.pause(7000);
    await iConsult.iConsultEDselection.click();
    await browser.pause(5000);
    if (await iConsult.startNewiConsult.isDisplayed()) {
      await iConsult.startNewiConsult.click();
    }
    await iConsultEDS.iConsultEDSQuestionsandAnswers();
    await iConsult.recommendationPills.waitForDisplayed();
    const Recommendation_medicine_title = await iConsult.pillName.getText();
    console.log(`Recommended Medicine Name: ${Recommendation_medicine_title}`);
    expect(Recommendation_medicine_title).toEqual(
      iConsultEDSData.iConsultEDS_MedicineName
    );

    const expectedMedicineDescription =
      language === "en"
        ? iConsultEDSData.iConsultEDS_MedicineDescription
        : iConsultEDSData.iConsultEDS_MedicineDescription_es;
    expect(await iConsult.productDescription.getText()).toEqual(
      expectedMedicineDescription
    );

    await iConsultEDS.dosageStrengthHundredMG.click();
    await iConsult.productContinueButton.click();

    await iConsult.subscriptionPlanOptions.waitForDisplayed();
    await iConsultEDS.fifteendosesSelection.click();
    await browser.pause(1000);
    await iConsultEDS.threeMonthsubscriptionOption.click();
    const subscriptionPlanDurationValue: string =
      await iConsultEDS.threeMonthsubscriptionText.getText();
    console.log(
      `Subscription Plan selected by the User: ${subscriptionPlanDurationValue}`
    );
    const subscriptionPlanAmount: string =
      await iConsultEDS.threeMonthsubscriptionAmount.getText();
    console.log(`Subscription Plan Amount: ${subscriptionPlanAmount}`);
    await browser.pause(1000);
    await iConsult.subscriptionPlanContinueButton.click();
    await browser.pause(1500);

    await iConsult.shippingAddressOptions.waitForDisplayed();
    await iConsult.ship_select_address.click();
    await browser.pause(1500);
    await iConsult.ship_save_btn.click();
    await browser.pause(2000);

    await iConsult.uploadPhotoIDProofs(IDProofPath, photoPath);
    await iConsult.iConsultPage.waitForDisplayed();
    expect(iConsult.iConsultPage).toHaveText(
      iConsultEDSData.iConsultEDS_Summary
    );
    await browser.pause(5000);

    const actualProductName: string = await iConsult.productName.getText();
    console.log(`Actual Product Name: ${actualProductName}`);
    expect(iConsult.productName).toHaveText(
      iConsultEDSData.iConsultEDS_SummaryMedicine
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
    await browser.pause(2000);
    await iConsult.iConsultCompletionScreen.waitForDisplayed();

    const completionMsg =
      language === "en"
        ? iConsultEDSData.iConsultEDS_CompletionMsg
        : iConsultEDSData.iConsultEDS_CompletionMsg_es;
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

    const jsonFilePath = "./test/data/generatedOrderDetails.json";
    const clearOrderDetails = () => {
      fs.writeFileSync(jsonFilePath, JSON.stringify({}, null, 4)); // Write an empty object to the file
      console.log(`Order details have been cleared from ${jsonFilePath}`);
    };

    const orderDetails: Record<string, string> = {};
    orderDetails[Recommendation_medicine_title] = orderId;

    //const jsonFilePath = './test/testdata/orderDetails.json'
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

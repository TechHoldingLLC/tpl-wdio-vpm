import LoginPage from "../pageobjects/login.page.js";
import iConsult from "../pageobjects/iConsult.page.js";
import iConsultEDS from "../pageobjects/iConsult.ED_Sildenafil.page.js";
import fs from "fs";

/**
 * iConsult: End-to-End Test Case for Sildenafil Flow
 *
 * This test case automates the flow for verifying iConsult's process for Erectile Dysfunction
 * with the recommendation of Sildenafil as the medicine. The test validates:
 * - Logging into the application
 * - Filling out the iConsult questionnaire for ED
 * - Recommending and selecting the appropriate medicine and subscription plan
 * - Completing the order and verifying the order details
 */

describe("iConsult feature - End to End flow", () => {
  // Runs before all tests, sets up preconditions such as navigating to the base URL and signing in.
  before(async () => {
    await browser.url("");
    await browser.pause(2000);
    await LoginPage.signinButton.click();
    await browser.pause(2000);
  });

  it("C29654 iConsult: Verify iConsult flow for Erectile Dysfunction - Sildenafil medicine", async () => {
    // Paths to required test data
    // const IDProofPath = "./test/data/IDProof.png";
    // const photoPath = "./test/data/Photo.jpg";
    const logindata = JSON.parse(
      fs.readFileSync("./test/data/loginData.json", "utf-8")
    );
    const iConsultEDSData = JSON.parse(
      fs.readFileSync("./test/data/iConsultEDSData.json", "utf-8")
    );

    // Get the current URL and detect the environment (QA, Stage, Prod)
    const url = await browser.getUrl();
    const language = await iConsult.getLanguageFromUrl(url);

    // Login credentials based on the environment (QA/Stage/Prod)
    let loginData;
    if (url.includes("qa")) {
      loginData = logindata.login_valid;
    } else if (url.includes("stage")) {
      loginData = logindata.stage_login_valid;
    } else {
      loginData = logindata.prod_login_valid;
    }

    // Log in with the selected credentials
    await LoginPage.login(loginData.login_email, loginData.login_password);

    await browser.pause(3000);

    // Close side menu if present
    await iConsult.sideMenuCloseButton.waitForClickable({ timeout: 3000 });
    await iConsult.sideMenuCloseButton.click();
    await browser.pause(2000);

    // Start iConsult process
    await iConsult.startFreeiConsultButton.waitForClickable({ timeout: 3000 });
    await iConsult.startFreeiConsultButton.click();
    await browser.pause(3000);

    // Accept consent and continue
    await iConsult.consentCheckbox.waitForClickable();
    await iConsult.consentCheckbox.click();
    await iConsult.consentContinueButton.click();
    await browser.pause(7000);

    // Select Erectile Dysfunction as the concern
    await iConsult.iConsultEDSelection.click();
    await browser.pause(5000);

    // If restarting iConsult, start a new session
    if (await iConsult.startNewiConsult.isDisplayed()) {
      await iConsult.startNewiConsult.click();
    }

    // Answer the Erectile Dysfunction questionnaire
    await iConsultEDS.iConsultEDSQuestionsAndAnswers();
    await browser.pause(2000);

    // Wait for medicine recommendation and validate it
    await browser.refresh();
    await iConsult.recommendationPills.waitForDisplayed();
    const Recommendation_medicine_title =
      language === "en"
        ? iConsultEDSData.iConsultEDS_MedicineName_en
        : iConsultEDSData.iConsultEDS_MedicineName_es;
    expect(await iConsult.pillName.getText()).toEqual(
      Recommendation_medicine_title
    );

    // Verify the medicine description
    const expectedMedicineDescription =
      language === "en"
        ? iConsultEDSData.iConsultEDS_MedicineDescription
        : iConsultEDSData.iConsultEDS_MedicineDescription_es;
    expect(await iConsult.productDescription.getText()).toEqual(
      expectedMedicineDescription
    );

    // Select dosage and continue
    await iConsultEDS.dosageStrengthHundredMG.click();
    await iConsult.productContinueButton.click();
    await browser.pause(2000);

    // Select subscription plan
    await iConsult.subscriptionPlanOptions.waitForDisplayed();
    await browser.pause(1000);
    await iConsultEDS.threeMonthSubscriptionOption.click();
    const subscriptionPlanDurationValue =
      await iConsultEDS.threeMonthSubscriptionText.getText();
    const subscriptionPlanAmount =
      await iConsultEDS.threeMonthSubscriptionAmount.getText();
    console.log(
      `Subscription Plan selected by the User: ${subscriptionPlanDurationValue}`
    );
    console.log(`Subscription Plan Amount: ${subscriptionPlanAmount}`);

    // Continue to the next step after selecting the plan
    await iConsult.subscriptionPlanContinueButton.click();
    await browser.pause(1500);

    // Select shipping address and proceed
    await iConsult.shippingAddressOptions.waitForDisplayed();
    await iConsult.shipSelectAddress.waitForDisplayed();
    await iConsult.shipSelectAddress.click();
    await browser.pause(1500);
    await iConsult.shipSaveBtn.scrollIntoView();
    await iConsult.shipSaveBtn.click();
    await browser.pause(2000);

    // Skip uploading ID Proof for now
    await iConsult.iConsultPage.waitForDisplayed();
    expect(iConsult.iConsultPage).toHaveText(
      iConsultEDSData.iConsultEDS_Summary
    );
    await browser.pause(5000);

    // Verify the summary of the selected product
    const actualProductName =
      language === "en"
        ? iConsultEDSData.iConsultEDS_SummaryMedicine_en
        : iConsultEDSData.iConsultEDS_SummaryMedicine_es;
    expect(await iConsult.productName.getText()).toEqual(actualProductName);
    console.log(`Actual Product Name: ${actualProductName}`);

    // Verify the subscription plan and price in the summary
    const prodSubscriptionPlan =
      await iConsult.productSubscriptionPlan.getText();
    const prodSubscriptionPrice =
      await iConsult.productSubscriptionPrice.getText();
    console.log(`ProdSubscriptionPlan: ${prodSubscriptionPlan}`);
    console.log(`Product Subscription Price: ${prodSubscriptionPrice}`);
    expect(prodSubscriptionPlan).toEqual(subscriptionPlanDurationValue);
    expect(prodSubscriptionPrice).toEqual(subscriptionPlanAmount);

    // Complete the order process
    await iConsult.cardSelection.scrollIntoView();
    await browser.pause(1000);
    await iConsult.cardSelection.click();
    await browser.pause(1000);
    await iConsult.submitOrder.scrollIntoView();
    await browser.pause(2000);
    await iConsult.submitOrder.click();
    await browser.pause(2000);
    await iConsult.iConsultCompletionScreen.waitForDisplayed();

    // Verify order completion message
    const completionMsg =
      language === "en"
        ? iConsultEDSData.iConsultEDS_CompletionMsg
        : iConsultEDSData.iConsultEDS_CompletionMsg_es;
    const iConsultCompletionMessage =
      await iConsult.iConsultCompletionScreen.getText();
    console.log(`iConsultCompletionMessage: ${iConsultCompletionMessage}`);
    expect(await iConsult.iConsultCompletionScreen.getText()).toEqual(
      completionMsg
    );
    await browser.pause(2000);

    // View and verify order details
    await iConsult.viewOrderDetailsButton.click();
    await iConsult.orderDetailsScreen.waitForDisplayed();
    await iConsult.orderListTab.waitForDisplayed();
    const orderId = await iConsult.getOrderID();
    console.log(`My Order ID is: ${orderId}`);

    // Store order details in a JSON file
    const jsonFilePath = "./test/data/generatedOrderDetails.json";
    const orderDetails = {};
    orderDetails[Recommendation_medicine_title] = orderId;
    fs.writeFileSync(jsonFilePath, JSON.stringify(orderDetails, null, 4));
    console.log("Order details have been written to orderDetails.json");

    // Verify order product name and subscription plan
    expect(await iConsult.orderDetailProductName.getText()).toEqual(
      Recommendation_medicine_title
    );
    expect(await iConsult.orderDetailsProductSubscriptionPlan).toHaveText(
      subscriptionPlanDurationValue
    );
    expect(await iConsult.orderDetailsProductTotalPrice.getText()).toEqual(
      subscriptionPlanAmount
    );
  });
});

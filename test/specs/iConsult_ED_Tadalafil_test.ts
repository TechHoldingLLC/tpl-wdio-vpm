import iConsultEDFlow from "../pageobjects/iConsult.ED_Tadalafil.page.js";
import LoginPage from "../pageobjects/login.page.js";
import iConsult from "../pageobjects/iConsult.page.js";
import fs from "fs";

/**
 * iConsult: Tadalafil E2E Flow
 *
 * This test case verifies the end-to-end flow for a Tadalafil prescription in the iConsult feature,
 * including login, questionnaire completion, recommendation, subscription selection,
 * and order completion. It also validates order details in the order summary screen.
 */

describe("iConsult Features", () => {
  // Pre-condition: Login to the application and prepare for iConsult flow
  before(async () => {
    await browser.url(""); // Navigate to the base URL
    await browser.pause(2000);
    await LoginPage.signinButton.click(); // Click the sign-in button
    await browser.pause(2000); // Pause to allow sign-in page to load
  });

  it("C29653 iConsult: Verify iConsult flow for Erectile dysfunction - Tadalafil Medicine", async () => {
    // Read login and iConsult data from external JSON files
    const logindata = JSON.parse(
      fs.readFileSync("./test/data/loginData.json", "utf-8")
    );
    const iConsultEDData = JSON.parse(
      fs.readFileSync("./test/data/iConsultEDTData.json", "utf-8")
    );
    let loginData: any;

    // Get the current URL and set login credentials based on the environment (QA/Stage/Prod)
    const url = await browser.getUrl();
    const language: string = await iConsult.getLanguageFromUrl(url); // Detect the language from the URL
    if (url.includes("qa")) {
      loginData = logindata.login_valid;
    } else if (url.includes("stage")) {
      loginData = logindata.stage_login_valid;
    } else {
      loginData = logindata.prod_login_valid;
    }

    // Log in to the application using credentials
    await LoginPage.login(loginData.login_email, loginData.login_password);

    await browser.pause(3000);
    await iConsult.sideMenuCloseButton.waitForClickable({ timeout: 3000 });
    await iConsult.sideMenuCloseButton.click(); // Close side menu
    await browser.pause(2000);

    // Start the iConsult flow
    await iConsult.startFreeiConsultButton.waitForClickable({ timeout: 3000 });
    await iConsult.startFreeiConsultButton.click();
    await browser.pause(2000);

    // Accept the consent form
    await iConsult.consentCheckbox.waitForClickable();
    await iConsult.consentCheckbox.click();
    await browser.pause(2000);
    await iConsult.consentContinueButton.click();
    await browser.pause(7000);

    // Select Erectile Dysfunction and proceed
    await iConsult.iConsultEDSelection.click();
    await browser.pause(5000);
    if (await iConsult.startNewiConsult.isDisplayed()) {
      await iConsult.startNewiConsult.click();
      await browser.pause(2000);
    }

    // Answer iConsult questions
    await iConsultEDFlow.iConsultEDQuestionsAndAnswer();

    // Verify the recommended medicine name based on language
    await iConsult.recommendationPills.waitForDisplayed();
    const Recommendation_generic_medicine_title =
      language === "en"
        ? iConsultEDData.iConsult_GenericMedicineName_en
        : iConsultEDData.iConsult_GenericMedicineName_es;
    expect(await iConsult.pillName.getText()).toEqual(
      Recommendation_generic_medicine_title
    );

    // Validate the medicine name
    expect(await iConsult.medicineName.getText()).toEqual(
      iConsultEDData.iConsultED_MedicineName
    );
    console.log(
      `Recommended Medicine Name: ${iConsultEDData.iConsultED_MedicineName}`
    );

    // Validate the product description
    const expectedMedicineDescription =
      language === "en"
        ? iConsultEDData.iConsultED_MedicineDescription_en
        : iConsultEDData.iConsultED_MedicineDescription_es;
    expect(await iConsult.productDescription.getText()).toEqual(
      expectedMedicineDescription
    );

    // Continue to subscription plan selection
    await iConsult.productContinueButton.click();
    await iConsult.subscriptionPlanOptions.waitForDisplayed();
    await iConsult.subscribeThreeMonthTL.click(); // Select 3-month subscription
    await browser.pause(1500);

    // Fetch and log subscription plan details
    const iConsult_SubscriptionPlan =
      await iConsultEDFlow.fetchSubscriptionPlan.getText();
    const iConsult_SubscriptionPlanAmount =
      await iConsultEDFlow.fetchSubscriptionAmount.getText();
    console.log(
      `Subscription Plan selected by the User: ${iConsult_SubscriptionPlan}`
    );
    console.log(`Subscription Plan Amount: ${iConsult_SubscriptionPlanAmount}`);

    // Continue to shipping address
    await iConsult.subscriptionPlanContinueButton.click();
    await browser.pause(1500);
    await iConsult.shippingAddressOptions.waitForDisplayed();
    await iConsult.shipSelectAddress.waitForDisplayed();
    await iConsult.shipSelectAddress.click(); // Select existing shipping address
    await browser.pause(1500);
    await iConsult.shipSaveBtn.scrollIntoView(); // Save selected address
    await iConsult.shipSaveBtn.click();
    await browser.pause(2000);

    // Verify the iConsult page title (summary)
    await iConsult.iConsultPage.waitForDisplayed();
    expect(await iConsult.iConsultPage).toHaveText(
      iConsultEDData.iConsultED_SummaryTitle
    );
    await browser.pause(5000);

    // Validate the product name in the order summary
    const actualProductName =
      language === "en"
        ? iConsultEDData.iConsultED_Summary_GenericMedicine_en
        : iConsultEDData.iConsultED_Summary_GenericMedicine_es;
    await expect(iConsultEDFlow.prescribedMedicine).toHaveText(
      actualProductName
    );
    console.log(`Actual Product Name: ${actualProductName}`);

    // Validate subscription plan and price in the order summary
    const prodSubscriptionPlan: string =
      await iConsult.productSubscriptionPlan.getText();
    console.log(`ProdSubscriptionPlan is: ${prodSubscriptionPlan}`);
    expect(prodSubscriptionPlan).toEqual(iConsult_SubscriptionPlan);

    const prodSubscriptionPrice: string =
      await iConsult.productSubscriptionPrice.getText();
    console.log(`Product Subscription Price: ${prodSubscriptionPrice}`);
    expect(prodSubscriptionPrice).toEqual(iConsult_SubscriptionPlanAmount);

    // Complete the order
    await iConsult.cardSelection.scrollIntoView();
    await browser.pause(1000);
    await iConsult.cardSelection.click(); // Select payment card
    await browser.pause(1000);
    await iConsult.submitOrder.scrollIntoView();
    await iConsult.submitOrder.click(); // Submit order
    await browser.pause(1000);

    // Verify order completion message
    const completionMsg =
      language === "en"
        ? iConsultEDData.iConsultED_CompletionMsg
        : iConsultEDData.iConsultED_CompletionMsg_es;
    await expect(iConsultEDFlow.iConsultCompletedMessage).toHaveText(
      completionMsg
    );
    await browser.pause(2000);

    // View order details
    await iConsult.viewOrderDetailsButton.click();
    await iConsult.orderDetailsScreen.waitForDisplayed();
    await iConsult.orderListTab.waitForDisplayed();

    // Log order ID and write to a JSON file
    const orderId: string = await iConsult.getOrderID();
    console.log(`My Order ID is: ${orderId}`);
    const jsonFilePath = "./test/data/generatedOrderDetails.json";
    const orderDetails: Record<string, string> = {};
    orderDetails[iConsultEDData.iConsultED_MedicineName] = orderId;
    fs.writeFileSync(jsonFilePath, JSON.stringify(orderDetails, null, 4));
    console.log("Order details have been written to orderDetails.json");

    // Validate order details on the order summary screen
    const orderInformation = await iConsult.getOrderInformation();
    console.log(`Order Product Name is: "${orderInformation.productName}"`);
    expect(await iConsult.orderDetailProductName.getText()).toEqual(
      Recommendation_generic_medicine_title
    );
    expect(await iConsult.orderDetailsProductSubscriptionPlan).toHaveText(
      iConsult_SubscriptionPlan
    );
    expect(await iConsult.orderDetailsProductTotalPrice.getText()).toEqual(
      iConsult_SubscriptionPlanAmount
    );
  });
});

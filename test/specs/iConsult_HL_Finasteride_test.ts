/**
 * Test Case: C29656 - iConsult: Verify iConsult flow for Hair loss (Finasteride medicine)
 *
 * Objective: Automate the end-to-end iConsult feature for hair loss with Finasteride
 *            as the recommended medicine. This test case covers login, iConsult questionnaire,
 *            medicine recommendation, subscription selection, shipping, and order completion.
 */

import LoginPage from "../pageobjects/login.page.js";
import iConsult from "../pageobjects/iConsult.page.js";
import iConsultHairLoss from "../pageobjects/iConsult.HL.page.js";
import fs from "fs";
import payPalPage from "../pageobjects/paypal.page.js";

describe("iConsult Feature - End to End Flow", () => {
  /**
   * Before All Hook
   * - Navigate to the base URL
   * - Click on the sign-in button to initialize the login process
   */
  before(async () => {
    await browser.url(""); // Open base URL
    await browser.pause(2000); // Wait for the page to load
    await LoginPage.signinButton.click(); // Click the sign-in button
    await browser.pause(2000); // Wait for the login screen
  });

  /**
   * Test: C29656 - Verify iConsult Flow for Hair Loss - Finasteride Medicine
   *
   * - Logs in using credentials based on the environment (QA, Stage, or Prod)
   * - Completes iConsult flow including questionnaire, medicine recommendation, and order placement
   * - Validates the recommended medicine, subscription plan, and order completion
   */
  it("C29656 iConsult: Verify iConsult flow for Hair loss - Finasteride medicine", async () => {
    // File paths for image uploads and login data
    //  const IDProofPath: string = "./test/data/IDProof.png";
    //  const photoPath: string = "./test/data/Photo.jpg";
    const loginDataPath: string = "./test/data/loginData.json";
    const iConsultHLDataPath: string = "./test/data/iConsultHLData.json";

    // Load login data and iConsult data from JSON files
    const logindata = JSON.parse(fs.readFileSync(loginDataPath, "utf-8"));
    const iConsultHLData = JSON.parse(
      fs.readFileSync(iConsultHLDataPath, "utf-8")
    );
    const payPalData = JSON.parse(
      fs.readFileSync("./test/data/payPalData.json", "utf-8")
    );

    let loginData: any;

    // Get current URL and determine language and environment
    const url: string = await browser.getUrl();
    const language: string = await iConsult.getLanguageFromUrl(url);

    // Determine login credentials based on the environment (qa, stage, or prod)
    if (url.includes("qa")) {
      loginData = logindata.login_valid;
    } else if (url.includes("stage")) {
      loginData = logindata.stage_login_valid;
    } else {
      loginData = logindata.prod_login_valid;
    }

    // Log in using the determined credentials
    await LoginPage.login(loginData.login_email, loginData.login_password);
    await browser.pause(3000); // Wait for login to complete

    // Close side menu and start the iConsult flow
    await iConsult.sideMenuCloseButton.waitForClickable({ timeout: 3000 });
    await iConsult.sideMenuCloseButton.click(); // Close the side menu
    await browser.pause(2000);
    await iConsult.startFreeiConsultButton.waitForClickable({ timeout: 3000 });
    await iConsult.startFreeiConsultButton.click(); // Start iConsult flow
    await browser.pause(2000);

    // Accept consent and continue
    await iConsult.consentCheckbox.click(); // Select the consent checkbox
    await iConsult.consentCheckbox.waitForClickable();
    await browser.pause(1000);
    await iConsult.consentContinueButton.click(); // Proceed with the consent

    // Select iConsult for Hair Loss
    await iConsult.problemAddressQuestionsScreen.waitForDisplayed();
    await iConsult.iConsultHLSelection.click(); // Select Hair Loss condition
    await browser.pause(5000);

    // If prompted to start a new iConsult session, click the button
    if (await iConsult.startNewiConsult.isDisplayed()) {
      await iConsult.startNewiConsult.click();
      await browser.pause(2000);
    }

    // Answer the iConsult questions for Hair Loss
    await iConsultHairLoss.iConsultHLQuestionsandAnswers();

    // Validate the recommended medicine name
    const Recommendation_medicine_title = await iConsult.pillName.getText();
    console.log(`Recommended Medicine Name: ${Recommendation_medicine_title}`);
    expect(Recommendation_medicine_title).toEqual(
      iConsultHLData.iConsultHL_MedicineName
    );

    // Validate the recommended medicine description based on language
    const expectedMedicineDescription =
      language === "en"
        ? iConsultHLData.iConsultHL_MedicineDescription
        : iConsultHLData.iConsultHL_MedicineDescription_es;
    expect(await iConsult.productDescription.getText()).toEqual(
      expectedMedicineDescription
    );

    // Continue to subscription selection
    await iConsult.productContinueButton.click();
    await iConsult.subscriptionPlanOptions.waitForDisplayed();
    await iConsult.subscriptionThreeMonthOption.click(); // Select 3-month subscription
    await browser.pause(1000);

    // Validate subscription plan and amount
    const subscriptionPlanDurationValue: string =
      await iConsult.subscriptionThreeMonthOptionText.getText();
    console.log(
      `Subscription Plan selected by the User: ${subscriptionPlanDurationValue}`
    );
    const subscriptionPlanAmount: string =
      await iConsult.subscriptionThreeMonthOptionValue.getText();
    console.log(`Subscription Plan Amount: ${subscriptionPlanAmount}`);

    await browser.pause(1000);
    await iConsult.subscriptionPlanContinueButton.click();
    await browser.pause(1500);

    // Select and confirm shipping address
    await iConsult.stateResideOption.waitForDisplayed();
    await iConsult.shippingAddressOptions.waitForDisplayed();
    await iConsult.shipSelectAddress.waitForDisplayed();
    await iConsult.shipSelectAddress.click(); // Select shipping address
    await browser.pause(1500);
    await iConsult.shipSaveBtn.scrollIntoView();
    await browser.pause(2000);
    await iConsult.shipSaveBtn.click(); // Confirm the address
    await browser.pause(2000);

    // Validate order summary details
    console.log(`verify title`);
    await iConsult.iConsultPage.waitForDisplayed(); // Wait for the summary page to load
    expect(iConsult.iConsultPage).toHaveText(
      iConsultHLData.iConsultHL_SummaryTitle
    ); // Verify title
    await browser.pause(3000);

    // Validate product name in the summary
    console.log(`verify product name`);
    const actualProductName: string = await iConsult.productName.getText();
    console.log(`Actual Product Name: ${actualProductName}`);
    expect(iConsult.productName).toHaveText(
      iConsultHLData.iConsultHL_SummaryMedicine
    );

    // Validate subscription plan and price in the summary
    console.log(`verify plan`);
    const prodSubscriptionPlan: string =
      await iConsult.productSubscriptionPlan.getText();
    console.log(`ProdSubscriptionPlan is : ${prodSubscriptionPlan}`);
    expect(prodSubscriptionPlan).toEqual(subscriptionPlanDurationValue);

    console.log(`verify price`);
    const prodSubscriptionPrice: string =
      await iConsult.productSubscriptionPrice.getText();
    console.log(`Product Subscription Price: ${prodSubscriptionPrice}`);
    expect(prodSubscriptionPrice).toEqual(subscriptionPlanAmount);

    await browser.pause(2000);

    await payPalPage.switchToPayPalIframe();
    await payPalPage.clickPayPalButton();
    await payPalPage.switchToPayPalWindow();
    await payPalPage.loginToPayPal(
      payPalData.validLoginData.email,
      payPalData.validLoginData.password
    );
    await payPalPage.confirmPayPalPayment();
    await payPalPage.switchBackToMainWindow();

    /*
    // Select payment method and place the order
    await iConsult.cardSelection.scrollIntoView(); // Scroll to card selection
    await browser.pause(1000);
    await iConsult.cardSelection.click(); // Select the payment card
    await browser.pause(1000);
    await iConsult.submitOrder.scrollIntoView();
    await browser.pause(1000);
    await iConsult.submitOrder.click(); // Submit the order
    await iConsult.iConsultCompletionScreen.waitForDisplayed();

    // Validate order completion message
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
    */

    // View order details
    await iConsult.viewOrderDetailsButton.click(); // Open order details
    await iConsult.orderDetailsScreen.waitForDisplayed();
    await iConsult.orderListTab.waitForDisplayed();

    // Fetch and log Order ID
    const orderId: string = await iConsult.getOrderID();
    console.log(`My Order ID is: ${orderId}`);

    // Store order details in a JSON file
    const jsonOrderFilePath = "./test/data/generatedOrderDetails.json";
    //  const clearOrderDetails = () => {
    //    fs.writeFileSync(jsonOrderFilePath, JSON.stringify({}, null, 4)); // Write an empty object to the file
    //    console.log(`Order details have been cleared from ${jsonOrderFilePath}`);
    //  };

    const orderDetails: Record<string, string> = {};
    orderDetails[Recommendation_medicine_title] = orderId;

    fs.writeFileSync(jsonOrderFilePath, JSON.stringify(orderDetails, null, 4));
    console.log("Order details have been written to orderDetails.json");

    // Validate product name and subscription in the order details
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

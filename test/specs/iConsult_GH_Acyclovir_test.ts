/**
 * Test Case: C29657 - iConsult: Verify iConsult flow for Genital Herpes (Acyclovir medicine)
 *
 * Objective: Automate the end-to-end flow of the iConsult feature focusing on
 *            Genital Herpes with Acyclovir as the recommended medicine.
 *            Includes login, iConsult questionnaire, medicine recommendation,
 *            subscription selection, shipping details, and order completion.
 */

import LoginPage from "../pageobjects/login.page.js";
import iConsult from "../pageobjects/iConsult.page.js";
import iConsultGHPage from "../pageobjects/iConsult.GH.page.js";
import fs from "fs";
import payPalPage from "../pageobjects/paypal.page.js";
import promoCodePage from "../pageobjects/promocodeHelper.js";

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
   * Test: C29657 - Verify iConsult Flow for Genital Herpes with Acyclovir Medicine
   * - Logs in using credentials based on the environment (QA, Stage, or Prod)
   * - Completes iConsult flow including questionnaire, medicine recommendation, and order placement
   * - Validates the recommended medicine, subscription plan, and order completion
   */
  it("C29657 iConsult: Verify iConsult flow for Genital Herpes - Acyclovir medicine", async () => {
    // File paths for login data
    const loginDataPath: string = "./test/data/loginData.json";

    // Load login data and iConsult data from JSON files
    const logindata = JSON.parse(fs.readFileSync(loginDataPath, "utf-8"));
    const iConsultGHData = JSON.parse(
      fs.readFileSync("./test/data/iConsultGHData.json", "utf-8")
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
    await browser.pause(3000);

    // Accept consent and continue
    await iConsult.consentCheckbox.click(); // Select the consent checkbox
    await iConsult.consentCheckbox.waitForClickable();
    await iConsult.consentContinueButton.click(); // Proceed with the consent

    // Select iConsult for Genital Herpes
    await iConsult.problemAddressQuestionsScreen.waitForDisplayed();
    await iConsult.iConsultGHSelection.click(); // Select Genital Herpes condition
    await browser.pause(5000);

    // If prompted to start a new iConsult session, click the button
    if (await iConsult.startNewiConsult.isDisplayed()) {
      await iConsult.startNewiConsult.click();
    }

    // Answer the iConsult questions for Genital Herpes
    await iConsultGHPage.iConsultGHQuestionsandAnswers();

    // Validate the recommended medicine name
    await iConsult.recommendationPills.waitForDisplayed(); // Wait for the recommendation to appear
    const Recommendation_medicine_title = await iConsult.pillName.getText();
    console.log(`Recommended Medicine Name: ${Recommendation_medicine_title}`);
    expect(Recommendation_medicine_title).toEqual(
      iConsultGHData.iConsultGH_MedicineName
    );

    // Validate the recommended medicine description based on language
    const expectedMedicineDescription =
      language === "en"
        ? iConsultGHData.iConsultGH_MedicineDescription
        : iConsultGHData.iConsultGH_MedicineDescription_es;
    expect(await iConsult.productDescription.getText()).toEqual(
      expectedMedicineDescription
    );

    // Continue to subscription selection
    await iConsult.productContinueButton.click();
    await iConsult.subscriptionPlanOptions.waitForDisplayed();
    await iConsultGHPage.subscriptionThreeMonthsOption.click(); // Select 3-month subscription

    // Validate subscription plan and amount
    const subscriptionPlanDurationValue: string =
      await iConsultGHPage.fetchSubscriptionPlantext.getText();
    console.log(
      `Subscription Plan selected by the User: ${subscriptionPlanDurationValue}`
    );
    const subscriptionPlanAmount: string =
      await iConsultGHPage.fetchSubscriptionAmount.getText();
    console.log(`Subscription Plan Amount: ${subscriptionPlanAmount}`);
    await browser.pause(1000);
    await iConsult.subscriptionPlanContinueButton.click();
    await browser.pause(1500);

    // Select and confirm shipping address
    await iConsult.shippingAddressOptions.waitForDisplayed();
    await iConsult.shipSelectAddress.waitForDisplayed();
    await iConsult.shipSelectAddress.click(); // Select shipping address
    await browser.pause(1500);
    await iConsult.shipSaveBtn.scrollIntoView();
    await browser.pause(1500);
    await iConsult.shipSaveBtn.click(); // Confirm the address
    await browser.pause(2000);

    // Upload ID proofs (currently commented out)
    // await iConsult.uploadPhotoIDProofs(IDProofPath, photoPath);

    // Validate order summary details
    await iConsult.iConsultPage.waitForDisplayed(); // Wait for the summary page to load
    expect(iConsult.iConsultPage).toHaveText(
      iConsultGHData.iConsultGH_SummaryTitle
    ); // Verify title
    await browser.pause(5000);

    // Validate product name in the summary
    const actualProductName: string = await iConsult.productName.getText();
    console.log(`Actual Product Name: ${actualProductName}`);
    expect(iConsult.productName).toHaveText(
      iConsultGHData.iConsultGH_SummaryMedicine
    );

    // Validate subscription plan and price in the summary
    const prodSubscriptionPlan: string =
      await iConsult.productSubscriptionPlan.getText();
    console.log(`ProdSubscriptionPlan is : ${prodSubscriptionPlan}`);
    expect(prodSubscriptionPlan).toEqual(subscriptionPlanDurationValue);

    const prodSubscriptionPrice: string =
      await iConsult.productSubscriptionPrice.getText();
    console.log(`Product Subscription Price: ${prodSubscriptionPrice}`);
    expect(prodSubscriptionPrice).toEqual(subscriptionPlanAmount);

    // Apply and Validate the Promo Code
    const totalPrice: string = await promoCodePage.applyPromoCode(language, prodSubscriptionPrice);
    await browser.pause(2000);

    // Complete the order
    await iConsult.prescribedMedicine.scrollIntoView();
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
    await browser.pause(2000);
    await iConsult.cardSelection.click(); // Select the payment card
    await browser.pause(2000);
    await iConsult.submitOrder.scrollIntoView();
    await browser.pause(2000);
    await iConsult.submitOrder.click(); // Submit the order
    await iConsult.iConsultCompletionScreen.waitForDisplayed();

    // Validate order completion message
    const completionMsg =
      language === "en"
        ? iConsultGHData.iConsultGH_CompletionMsg
        : iConsultGHData.iConsultGH_CompletionMsg_es;
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
    expect(await iConsult.orderDetailsProductTotalPrice.getText().then((text) => text.replace(/[^\d.]/g, "").replace(/\.00$/, ""))).toEqual(
      totalPrice.replace(/\.00$/, "")
    );
  });
});

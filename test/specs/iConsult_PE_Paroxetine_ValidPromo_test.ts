/**
 * Test Case: C29655 - iConsult: Verify iConsult flow for Premature Ejaculation (Paroxetine medicine)
 *
 * Objective: Automate the end-to-end iConsult feature for premature ejaculation with Paroxetine
 *            as the recommended medicine. This test case covers login, iConsult questionnaire,
 *            medicine recommendation, subscription selection, shipping, and order completion.
 */

import iConsultPEFlow from "../pageobjects/iconsult.PE.page.js";
import LoginPage from "../pageobjects/login.page.js";
import iConsult from "../pageobjects/iConsult.page.js";
import fs from "fs";
import payPalPage from "../pageobjects/paypal.page.js";
import promoCodeActions from "../pageobjects/promocodeHelper.js";

describe("iConsult Features", () => {
  /**
   * Before All Hook
   * - Navigate to the base URL
   * - Click on the sign-in button to initialize the login process
   */
  before(async () => {
    await browser.url(""); // Open base URL
    await browser.pause(2000); // Wait for page to load
    await LoginPage.signinButton.click(); // Click on the sign-in button
    await browser.pause(2000); // Wait for the login page to appear
  });

  /**
   * Test: C29655 - Verify iConsult Flow for Premature Ejaculation (Paroxetine Medicine)
   *
   * - Logs in using credentials based on the environment (QA, Stage, or Prod)
   * - Completes iConsult flow, including questionnaire, medicine recommendation, and order placement
   * - Validates the recommended medicine, subscription plan, and order completion
   */
  it("C29655 iConsult: Verify iConsult flow for Premature Ejaculation - Paroxetine medicine", async () => {
    // File paths for data files
    const loginDataPath: string = "./test/data/loginData.json";
    const iConsultPEDataPath: string = "./test/data/iConsultPEData.json";

    // Load login data and iConsult PE data from JSON files
    const logindata = JSON.parse(fs.readFileSync(loginDataPath, "utf-8"));
    const iConsultPEData = JSON.parse(
      fs.readFileSync(iConsultPEDataPath, "utf-8")
    );
    const payPalData = JSON.parse(
      fs.readFileSync("./test/data/payPalData.json", "utf-8")
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

    // Log in using the determined credentials
    await LoginPage.login(loginData.login_email, loginData.login_password);
    await browser.pause(3000); // Wait for login to complete

    // Close side menu and start the iConsult flow
    await iConsult.sideMenuCloseButton.waitForClickable({ timeout: 3000 });
    await iConsult.sideMenuCloseButton.click(); // Close side menu
    await browser.pause(2000);
    await iConsult.startFreeiConsultButton.waitForClickable({ timeout: 3000 });
    await iConsult.startFreeiConsultButton.click(); // Start iConsult flow
    await browser.pause(3000);

    // Accept consent and proceed
    await iConsult.consentCheckbox.waitForClickable();
    await iConsult.consentCheckbox.click(); // Select the consent checkbox
    await iConsult.consentContinueButton.click(); // Continue with the consent

    // Select iConsult for Premature Ejaculation
    await browser.pause(5000);
    await iConsult.iConsultPESelection.click();
    await browser.pause(5000);

    // If prompted to start a new iConsult session, click to start
    if (await iConsult.startNewiConsult.isDisplayed()) {
      await iConsult.startNewiConsult.click();
      await browser.pause(2000);
    }

    // Answer the iConsult PE questions
    await iConsultPEFlow.iConsultPEQuestionsAndAnswer();

    // Validate the recommended medicine
    await iConsult.recommendationPills.waitForDisplayed();
    const Recommendation_medicine_title = await iConsult.pillName.getText();
    console.log(`Recommended Medicine Name: ${Recommendation_medicine_title}`);
    expect(await iConsult.pillName.getText()).toEqual(
      iConsultPEData.iConsultPE_MedicineName
    );

    // Validate the recommended medicine description based on the language
    language === "en"
      ? expect(await iConsult.productDescription.getText()).toHaveText(
          iConsultPEData.iConsultPE_MedicineDescription
        )
      : expect(await iConsult.productDescription.getText()).toHaveText(
          iConsultPEData.iConsultPE_MedicineDescription_es
        );

    // Continue to subscription selection
    await iConsult.productContinueButton.click();
    await browser.pause(2000);
    await iConsult.subscriptionPlanOptions.waitForDisplayed();
    await iConsultPEFlow.subscriptionOneMonthOption.click(); // Select 1-month subscription
    await browser.pause(1500);

    // Validate subscription plan and amount
    const subscriptionPlanDurationValue: string =
      await iConsultPEFlow.fetchSubscriptionPlan.getText();
    console.log(
      `Subscription Plan selected by the User: ${subscriptionPlanDurationValue}`
    );

    const subscriptionPlanAmount: string =
      await iConsultPEFlow.fetchSubscriptionAmount.getText();
    console.log(`Subscription Plan Amount: ${subscriptionPlanAmount}`);
    await browser.pause(2000);
    await iConsult.subscriptionPlanContinueButton.click(); // Continue with the subscription

    // Select and confirm shipping address
    await iConsult.shippingAddressOptions.waitForDisplayed();
    await iConsult.shipSelectAddress.waitForDisplayed();
    await iConsult.shipSelectAddress.click(); // Select shipping address
    await browser.pause(1500);
    await iConsult.shipSaveBtn.scrollIntoView();
    await browser.pause(1500);
    await iConsult.shipSaveBtn.click(); // Confirm the address
    await browser.pause(2000);

    // Skip the photo ID upload
    // await iConsult.uploadPhotoIDProofs(IDProofPath, photoPath);

    // Validate order summary
    await iConsult.iConsultPage.waitForDisplayed();
    expect(await iConsult.iConsultPage).toHaveText(
      iConsultPEData.iConsultPE_SummaryTitle
    );
    await browser.pause(5000);
    expect(await iConsultPEFlow.prescribedMedicine).toHaveText(
      iConsultPEData.iConsultPE_MedicineName
    );

    // Validate the subscription plan and price in the order summary
    const prodSubscriptionPlan: string =
      await iConsult.productSubscriptionPlan.getText();
    console.log(`ProdSubscriptionPlan is : ${prodSubscriptionPlan}`);
    expect(prodSubscriptionPlan).toEqual(subscriptionPlanDurationValue);

    const prodSubscriptionPrice: string =
      await iConsult.productSubscriptionPrice.getText();
    console.log(`Product Subscription Price: ${prodSubscriptionPrice}`);
    expect(prodSubscriptionPrice).toEqual(subscriptionPlanAmount);

    // Apply and Validate the Promo Code
    const totalDiscountedPrice: string =
      await promoCodeActions.applyValidPromoCode(
        language,
        prodSubscriptionPrice
      );
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
    await browser.pause(1000);
    await iConsult.cardSelection.click(); // Select the card
    await browser.pause(1000);
    await iConsult.submitOrder.scrollIntoView(); // Scroll to submit order button
    await browser.pause(2000);
    await iConsult.submitOrder.click(); // Submit the order
    await browser.pause(2000);

    // Validate order completion message based on language
    if (currentUrl.includes("en")) {
      expect(await iConsultPEFlow.iConsultCompletedMessage).toHaveText(
        iConsultPEData.iConsultPE_CompletionMsg
      );
    } else {
      expect(await iConsultPEFlow.iConsultCompletedMessage).toHaveText(
        iConsultPEData.iConsultPE_CompletionMsg_es
      );
    }
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
    const jsonFilePath = "./test/data/generatedOrderDetails.json";
    const orderDetails: Record<string, string> = {};
    orderDetails[Recommendation_medicine_title] = orderId;

    fs.writeFileSync(jsonFilePath, JSON.stringify(orderDetails, null, 4)); // Write order details to JSON file
    console.log("Order details have been written to orderDetails.json");

    // Validate product name and subscription plan in order details
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
    expect(
      await iConsult.orderDetailsProductTotalPrice
        .getText()
        .then((text) => text.replace(/[^\d.]/g, ""))
    ).toEqual(totalDiscountedPrice.replace(/\.00$/, ""));
  });
});

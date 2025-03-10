import iConsultWLFlow from "../pageobjects/iConsult.WL.page.js";
import LoginPage from "../pageobjects/login.page.js";
import iConsult from "../pageobjects/iConsult.page.js";
import fs from "fs";
import payPalPage from "../pageobjects/paypal.page.js";
import promoCodePage from "../pageobjects/promocodeHelper.js";

/**
 * iConsult: Semaglutide E2E Flow
 *
 * This test case verifies the end-to-end flow for a Semaglutide prescription in the iConsult feature,
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

  it("C29653 iConsult: Verify iConsult flow for Weight Loss - Semaglutide Medicine", async () => {
    // Read login and iConsult data from external JSON files
    const logindata = JSON.parse(
      fs.readFileSync("./test/data/loginData.json", "utf-8")
    );
    const iConsultWLData = JSON.parse(
      fs.readFileSync("./test/data/iConsultWLData.json", "utf-8")
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
    await iConsult.iConsultWLSelection.click();
    await browser.pause(5000);
    if (await iConsult.startNewiConsult.isDisplayed()) {
      await iConsult.startNewiConsult.click();
      await browser.pause(2000);
    }

    // Answer iConsult questions
    await iConsultWLFlow.iConsultWLQuestionsAndAnswer();

    // Validate the medicine name
    await iConsult.recommendationPills.waitForDisplayed();
    const Medicine_name =
      language === "en"
        ? iConsultWLData.iConsultWL_MedicineName_en
        : iConsultWLData.iConsultWL_MedicineName_es;
    expect(await iConsult.pillName.getText()).toEqual(Medicine_name);

    // Validate the product description
    const expectedMedicineDescription =
      language === "en"
        ? iConsultWLData.iConsultWL_MedicineDescription_en
        : iConsultWLData.iConsultWL_MedicineDescription_es;
    expect(
      await iConsult.semaglutideProductDescription.map((i) =>
        i.getText().then((text) => text.trim())
      )
    ).toEqual(expectedMedicineDescription);

    // Continue to subscription plan selection
    await iConsult.productContinueButton.click();
    await iConsult.subscriptionPlanOptions.waitForDisplayed();
    await iConsult.semaglutide4WeekKit.click(); // Select 4 Weeks Starter Kit
    await browser.pause(3000);

    // Fetch and log subscription plan details
    const iConsult_SubscriptionPlan =
      await iConsultWLFlow.fetchSubscriptionPlan.getText();
    const iConsult_SubscriptionPlanAmount =
      await iConsultWLFlow.fetchSubscriptionAmount.getText();
    console.log(
      `Subscription Plan selected by the User: ${iConsult_SubscriptionPlan}`
    );
    console.log(`Subscription Plan Amount: ${iConsult_SubscriptionPlanAmount}`);

    // Continue to shipping address
    try {
      await iConsult.subscriptionPlanContinueButton.scrollIntoView();
      await iConsult.subscriptionPlanContinueButton.click();
    } catch (error) {
      await iConsult.subscriptionPlanContinueButton.scrollIntoView();
      await iConsult.subscriptionPlanContinueButton.click();
    }
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
      iConsultWLData.iConsultWL_SummaryTitle
    );
    await browser.pause(5000);

    // Validate the product name in the order summary
    const actualProductName =
      language === "en"
        ? iConsultWLData.iConsultWL_MedicineName_en
        : iConsultWLData.iConsultWL_MedicineName_es;
    await expect(iConsult.prescribedMedicine).toHaveText(
      actualProductName
    );
    console.log(`Actual Product Name: ${actualProductName}`);

    // Validate subscription plan and price in the order summary
    const prodSubscriptionPlan: string =
      await iConsult.productSubscriptionPlan.getText();
    console.log(`ProdSubscriptionPlan is: ${prodSubscriptionPlan}`);
    expect(prodSubscriptionPlan).toEqual(iConsult_SubscriptionPlan);

    const prodSubscriptionPrice: string =
      await iConsult.productSubscriptionPrice
        .getText()
        .then((text) => text.replace(/\.00$/, ""));
    console.log(`Product Subscription Price: ${prodSubscriptionPrice}`);
    expect(prodSubscriptionPrice).toEqual(iConsult_SubscriptionPlanAmount);

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

    // View order details
    await iConsult.viewOrderDetailsButton.click();
    await iConsult.orderDetailsScreen.waitForDisplayed();
    await iConsult.orderListTab.waitForDisplayed();

    // Log order ID and write to a JSON file
    const orderId: string = await iConsult.getOrderID();
    console.log(`My Order ID is: ${orderId}`);
    const jsonFilePath = "./test/data/generatedOrderDetails.json";
    const orderDetails: Record<string, string> = {};

    const Medicine_title =
      language === "en"
        ? iConsultWLData.iConsultWL_MedicineName_en
        : iConsultWLData.iConsultWL_MedicineName_es;

    orderDetails[iConsultWLData.iConsultWL_MedicineName] = orderId;
    fs.writeFileSync(jsonFilePath, JSON.stringify(orderDetails, null, 4));
    console.log("Order details have been written to orderDetails.json");

    // Validate order details on the order summary screen
    const orderInformation = await iConsult.getOrderInformation();
    console.log(`Order Product Name is: "${orderInformation.productName}"`);
    expect(await iConsult.orderDetailProductName.getText()).toEqual(
      Medicine_title
    );
    expect(await iConsult.orderDetailsProductSubscriptionPlan).toHaveText(
      iConsult_SubscriptionPlan
    );
    const productTotalPrice = await iConsult.orderDetailsProductTotalPrice.getText().then((text) => text.replace(/[^\d.]/g, "").replace(/\.00$/, ""));
    expect(productTotalPrice).toEqual(totalPrice.replace(/\.00$/, ""));
  });
});

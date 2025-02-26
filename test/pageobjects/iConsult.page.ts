import Page from "./page.js";
import * as path from "path";

class iConsult extends Page {
  /*
   * Locators for the initial page
   */
  public get startFreeiConsultButton() {
    return $("#start-free-iconsult");
  }

  public get consentCheckbox() {
    return $('label[id$="termsAndConditions"]');
  }

  public get consentContinueButton() {
    return $('//button[@class="btn-primary btn-sm text-uppercase mt-20"]');
  }

  /*
   * Locators for the problem address questions screen
   */
  public get problemAddressQuestionsScreen() {
    return $('h5[data-aos="fade"]');
  }

  /*
   * Locators for iConsult condition selections
   */
  public get iConsultEDSelection() {
    return $('[for$="question1"]');
  }

  public get iConsultPESelection() {
    return $('[for$="question2"]');
  }

  public get iConsultHLSelection() {
    return $('[for$="question3"]');
  }

  public get iConsultGHSelection() {
    return $('[for$="question4"]');
  }

  public get firstQuestion() {
    return $('//h5[@class="title undefined aos-init aos-animate"]');
  }

  public get firstQuestionWL() {
    return $('//h5[@class="title"]');
  }

  public get sideMenuCloseButton() {
    return $('[class="btn-rounded Header_close-btn__rNA2L"]');
  }

  /*
   * Locators for date of birth page
   */
  public get dobPage() {
    return $(
      "//h5[contains(text(), '¿Cuál es tu fecha de nacimiento?') or contains(text(), 'What is your date of birth?')]"
    );
  }

  public get dobInput() {
    return $("input[name$='dateOfBirth']");
  }

  public get dobContinueButton() {
    return $("//input[@type='submit']");
  }

  /*
   * Method to enter date of birth
   */
  public async enterDOB(dob: string) {
    await this.dobInput.waitForDisplayed();
    await browser.pause(2000);
    await this.dobInput.click();
    await browser.keys(["ArrowLeft"]);
    await this.dobInput.addValue(dob);
    await browser.pause(1000);
    await this.dobContinueButton.waitForClickable();
    await this.dobContinueButton.click();
  }

  /*
   * Locators for eligibility and sign-in pages
   */
  public get iConsultEligibilityText() {
    return $(
      "//h5[contains(text(),'Congratulations') or contains(text(),'Felicidades')]"
    );
  }

  public get iConsultEligibilityContinueBtn() {
    return $("//a[contains(@href,'eligibility')]");
  }

  public get iConsultPageSignIn() {
    return $("//a[contains(@href, 'auth/signin')]");
  }

  public get iConsultRegisterSignUpPage() {
    return $("//div[contains(@class,'Register_signup-step-text')]");
  }

  public get iConsultLetsGetStartScreen() {
    return $("h5[data-aos='fade']");
  }

  public get startNewiConsult() {
    return $('[class$="btn-secondary mw-100 mt-15"]');
  }

  /*
   * Locators for age-related input
   */
  public get insertAge() {
    return $("(//input[@id=':r0:'])[1]");
  }

  public get ageContinue() {
    return $("[class$='btn-primary btn-sm text-uppercase']");
  }

  public get ageTitleMessage() {
    return $(".title.aos-init.aos-animate");
  }

  public get ageSuccessContinueBtn() {
    return $(
      "//a[@class='btn-primary btn-sm mt-15 text-uppercase aos-init aos-animate']"
    );
  }

  public get backToHomeBtn() {
    return $(
      "//a[@class='btn btn-secondary mt-15 w-100 mw-100 text-uppercase']"
    );
  }

  public get resumeiConsult() {
    return $('//button[@class="btn-primary mw-100 mt-10"]');
  }

  /*
   * Locators for recommendations
   */
  public get recommendationPills() {
    return $(".title.undefined.aos-init.aos-animate");
  }

  public get pillName() {
    return $(".ProductRecommendation_product-title__rTK2F");
  }

  public get medicineName() {
    return $(
      "body > div:nth-child(2) > main:nth-child(1) > section:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > span:nth-child(2)"
    );
  }

  public get productDescription() {
    return $(
      "//p[@class='ProductRecommendation_product-description__1QDn9']//p[1]"
    );
  }

  public get productContinueButton() {
    return $(
      "//button[@class='btn-primary text-uppercase btn-sm mw-100 text-uppercase']"
    );
  }

  /*
   * Locators for subscription plans
   */
  public get subscriptionPlanOptions() {
    return $(".title.undefined.aos-init.aos-animate");
  }

  public get subscriptionOneMonthOption() {
    return $('div[role="tabpanel"] li:nth-child(1)');
  }

  public get subscriptionThreeMonthOption() {
    return $('div[role="tabpanel"] li:nth-child(1)');
  }

  public get subscribeThreeMonthTL() {
    return $("//label[@for='sub-42']");
  }

  public get subscriptionSixMonthOption() {
    return $('div[role="tabpanel"] li:nth-child(2)');
  }

  public get subscriptionSixMonthOptionText() {
    return $('//*[@for="sub-48"]/div/div[1]/span[1]');
  }

  public get subscriptionThreeMonthOptionText() {
    return $("(//div[@class='radio-left-text'])[1]");
  }

  public get subscriptionThreeMonthOptionValue() {
    return $("//div[@class='radio-right-text']/span[2]");
  }

  public get subscriptionSixMonthOptionValue() {
    return $(
      'div[role="tabpanel"] li:nth-child(2) div[class="radio-detail"] div[class="radio-right-text"] span:nth-child(2)'
    );
  }

  public get subscriptionPlanContinueButton() {
    return $("//button[@class='btn-primary text-uppercase']");
  }

  /*
   * Locators for address information
   */
  public get stateResideOption() {
    return $('h5[data-aos="fade"]');
  }

  public get selectCountry() {
    return $('[class$="form-select"]');
  }

  public get countryContinueBtn() {
    return $('input[value="Continue"]');
  }

  public async stateSelection(stateName: string) {
    if ((await this.selectCountry).isDisplayed()) {
      await browser.pause(5000);
      await this.selectCountry.selectByVisibleText(stateName);
      await this.countryContinueBtn.click();
    }
  }

  public get shippingAddressOptions() {
    return $('h5[data-aos="fade"]');
  }

  public get addNewAddressButton() {
    return $('a[href="/en/addaddress"] button');
  }

  public get shipFnField() {
    return $("#firstName");
  }

  public get shipLnField() {
    return $("#lastName");
  }

  public get shipAddressField() {
    return $("#addressLine1");
  }

  public get shipAptField() {
    return $("#addressLine2");
  }

  public get shipPinField() {
    return $("#pincode");
  }

  public get shipSuggestionField() {
    return $('[class$="suggestion-active"]');
  }

  public get shipContinueBtn() {
    return $('[type$="submit"]');
  }

  public get shipSelectAddress() {
    return $('//h5[@data-aos="fade"]//ancestor::div/li');
  }

  public get shipSaveBtn() {
    return $("input[class$='btn-primary text-uppercase']");
  }

  /*
   * Method to add a new shipping address
   */
  public async addNewShippingAddress() {
    await this.shipFnField.setValue("WebDriverIO");
    await this.shipLnField.setValue("Automation");
    await this.shipAddressField.setValue("Test Street Address");
    await this.shipAptField.setValue("Test Apartment Name");
    await this.shipPinField.setValue("90035");
    await this.shipSuggestionField.waitForDisplayed();
    await this.shipSuggestionField.click();
    await browser.pause(1500);
    await this.shipContinueBtn.click();
    await this.shipSelectAddress.click();
    await browser.pause(1500);
    await this.shipSaveBtn.click();
    await browser.pause(2000);
  }

  /*
   * Locators for ID upload and photo
   */
  public get uploadPhotoIDScreen() {
    return $('h5[data-aos="fade"]');
  }

  public get selectPhoto() {
    return $('//*[@type="file"]');
  }

  public get uploadSaveAndContinueButton() {
    return $('button[type="submit"]');
  }

  public get uploadOrTakePhotoScreen() {
    return $('h5[data-aos="fade"]');
  }

  /*
   * Method to upload a photo
   */
  public async uploadPhoto(filePath: string) {
    const file = path.join(process.cwd(), filePath);
    const remoteFilePath = await browser.uploadFile(file);
    await this.selectPhoto.setValue(remoteFilePath);
    await this.uploadSaveAndContinueButton.click();
  }

  /*
   * Method to upload both ID and photo proofs
   */
  public async uploadPhotoIDProofs(IDProof: string, PhotoProof: string) {
    await this.uploadPhotoIDScreen.waitForDisplayed();
    await this.uploadPhoto(IDProof);
    await this.uploadOrTakePhotoScreen.waitForDisplayed();
    await this.uploadPhoto(PhotoProof);
  }

  /*
   * Locators for payment details
   */
  public get cardSelection() {
    return $('//div[contains(@class,"Subscriptions_cards-derails")]/div[1]');
  }

  public get iConsultPage() {
    return $('//h5[contains(@class, "title")]');
  }

  public get submitOrder() {
    return $("//*[@class='btn-primary btn-sm mw-100 text-uppercase']");
  }

  public get iConsultCompletionScreen() {
    return $("//h5[@class='title text-orange-600 aos-init aos-animate']");
  }

  public get viewOrderDetailsButton() {
    return $(
      "//a[@class='btn-primary btn-sm mt-15 text-uppercase aos-init aos-animate']"
    );
  }

  public get orderDetailsScreen() {
    return $('//div[@class="page-title"]/div/div/h2/div');
  }

  public get orderListTab() {
    return $('//div[contains(@class, "MyOrder_order-list")]');
  }

  public get fetchOrderId() {
    return $("//span[contains(@class,'MyOrder_order-id')]");
    //return $("//span[@class='MyOrder_order-id__wsMkB']");
  }

  public get orderDetailProductName() {
    return $("//h4[@class='mb-0']");
  }

  public get orderDetailsProductSubscriptionPlan() {
    //return $("//span[@class='badge bg-orange-200 MyOrder_badge-month__FhQJe']");
    return $("(//div[contains(@class,'MyOrder_cart-summary')])[1]/div/span");
  }

  public get orderDetailsProductTotalPrice() {
    return $("//span[contains(@class,'MyOrder_total-main-price')]");
  }

  /*
   * Method to get order ID
   */
  public async getOrderID() {
    const orderInformation: string = await this.fetchOrderId.getText();
    const orderId = orderInformation.split(":")[1].trim();
    console.log(`Order ID is: ${orderId}`);
    await browser.pause(2000);
    return orderId;
  }

  /*
   * Method to get order information
   */
  public async getOrderInformation(): Promise<{
    productName: string;
    subscriptionPlan: string;
    totalPrice: string;
  }> {
    const productName: string = await this.orderDetailProductName.getText();
    const subscriptionPlan: string =
      await this.orderDetailsProductSubscriptionPlan.getText();
    const totalPrice: string =
      await this.orderDetailsProductTotalPrice.getText();

    return {
      productName,
      subscriptionPlan,
      totalPrice,
    };
  }

  /*
   * Method to add card details
   */
  public async addCardDetails(cardNumber: string, expirationDate: string) {
    await this.cardNumberInput.waitForClickable();
    await this.cardNumberInput.setValue(cardNumber);
    await this.expirationDateInput.waitForClickable();
    await this.expirationDateInput.setValue(expirationDate);
    await this.submitButton.waitForClickable();
    await this.submitButton.click();
  }

  /*
   * Locators for payment fields
   */
  public get cardNumberInput() {
    return $('//input[@name="CreditCardNumber"]');
  }

  public get expirationDateInput() {
    return $('//input[@data-componentid="FormPatientPayment_ExpDate"]');
  }

  public get submitButton() {
    return $(
      '//div[@data-componentid="FormPatientPayment_container"]/div/div[3]'
    );
  }

  public get cardIframe() {
    return $("[name$='instamed']");
  }

  public get addNewCard() {
    return $('//div[contains(@class,"Summary_card-number")]/a');
  }

  public get productName() {
    return $("//h4[@class='mb-5']");
  }

  public get productSubscriptionPlan() {
    return $('//div[contains(@class, "Summary_cart-summary")]/div/span[2]');
  }

  public get productSubscriptionPrice() {
    return $(
      '//div[contains(@class,"Summary_total-pay")]/div/span[contains(@class, "Summary_total-main-price")]'
    );
  }

  public get optionsListOfQuestion() {
    return $("//div[@class='mt-60 form-content']");
  }

  public get iConsultWLSelection() {
    return $('[for$="question5"]');
  }

  public get semaglutide4WeekKit() {
    return $('//span[contains(text(),"4 week Starter Kit")]');
  }

  public get semaglutideProductDescription() {
    return $$(
      '//p[contains(@class,"ProductRecommendation_product-description")]//li'
    );
  }
}

export default new iConsult();

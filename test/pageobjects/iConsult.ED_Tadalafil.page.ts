import { $ } from "@wdio/globals";
import Page from "./page.js";

class iConsultEDFlow extends Page {
  // Page elements for iConsult ED Tadalafil flow

  // Start iConsult button
  public get startiConsultButton() {
    return $("#start-free-iconsult");
  }

  // Consent checkbox
  public get consentCheckbox() {
    return $('label[id$="termsAndConditions"]');
  }

  // Continue button for questionnaire
  public get continueButtonQuestionnaire() {
    return $("//button[@class='btn-primary btn-sm text-uppercase']");
  }

  // Country selection
  public get selectCountry() {
    return $("[class$='form-select']");
  }

  public get countryContinueBtn() {
    return $('input[value="Continue"]');
  }

  // Date of birth selection
  public get dobSelector() {
    return $(
      "[class$='MuiInputBase-input MuiOutlinedInput-input form-input form-date-input css-1x5jdmq']"
    );
  }

  public get inputDOB() {
    return $("[name$='dateOfBirth']");
  }

  // Eligibility continue button
  public get eligibilityContinueBtn() {
    return $(
      "[class$='btn-primary btn-sm mt-15 text-uppercase aos-init aos-animate']"
    );
  }

  // iConsult options
  public get iconsultOption() {
    return $("[class$='single-radio']");
  }

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

  public get startNewiConsult() {
    return $('[class$="btn-secondary mw-100 mt-15"]');
  }

  // Question options
  public get option1forQuestion1() {
    // How long has this problem been present?
    return $('[for$="option0"]');
  }

  public get option1forQuestion2() {
    // How did your ED start?
    return $("[for$='option0']");
  }

  public get option4forQuestion3() {
    // Have you been diagnosed with any of the following?
    return $("//label[@for='option2']");
  }

  public get option1forQuestion4() {
    // Are you taking any medication daily?
    return $("[for$='option0']");
  }

  public get option6forQuestion5() {
    // Do you take any of these medications?
    return $("[for$='option5']");
  }

  public get option5forQuestion5() {
    // Do you take any of these medications?
    return $("[for$='option4']");
  }

  public get option14forQuestion6() {
    // Have you had or do you have any of these conditions?
    return $("[for$='option13']");
  }

  public get formforQuestion7() {
    // Please share with Dr. Linares any other medical conditions treated with medications:
    return $("[class$='form-input ']");
  }

  public get option5forQuestion8() {
    // Are you allergic to any of the following medications?
    return $("//label[@for='option4']");
  }

  public get option6forQuestion9() {
    // In the past 3 months have you used, ingested, or smoked any of these substances?
    return $("[for$='option5']");
  }

  public get option3forQuestion10() {
    // How often do you wake up with an erection?
    return $("[for$='option2']");
  }

  public get option2forQuestion11() {
    // Have you tried any of these medications before?
    return $("//label[@for='option1']");
  }

  public get optionforQuestion11() {
    // Have you tried any of these medications before?
    return $("[for$='option1']");
  }

  public get option1forQuestion11() {
    // Have you tried any of these medications before?
    return $("[for$='option0']");
  }

  public get dosageSelection() {
    return $("//span[normalize-space()='10mg']");
  }

  public get chooseAgain() {
    return $("//label[@for='option0']");
  }

  // Recommendation section
  public get recommTitle() {
    return $("h5[class$='title']");
  }

  public get recommSubtitle() {
    return $("div[class='ProductRecommendation_product-detail__gH6xf'] p p");
  }

  public get recommContinueBtn() {
    return $(
      "[class$='btn-primary text-uppercase btn-sm mw-100 text-uppercase']"
    );
  }

  public get fetchSubscriptionPlan() {
    return $("//span[@class='radio-title'][contains(text(),'3')]");
  }

  public get fetchSubscriptionAmount() {
    return $("//span[normalize-space()='$125.00']");
  }

  public get subscriptionPlan() {
    return $("[for$='sub-5']");
  }

  public get subscriptionContinueBtn() {
    return $("[class$='btn-primary text-uppercase']");
  }

  // Shipping address
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
    return $("[class$='suggestion-active']");
  }

  public get shipContinueBtn() {
    return $('[type$="submit"]');
  }

  public get shipSelectAddress() {
    return $('//h5[@data-aos="fade"]//ancestor::div/li');
  }

  public get shipSaveBtn() {
    return $('input[value="Save And Continue"]');
  }

  public get uploadSaveBtn() {
    return $("[class$='btn-primary text-uppercase ']");
  }

  // Order summary
  public get iConsultSummaryTitle() {
    return $("[class='title aos-init aos-animate']");
  }

  public get prescribedMedicine() {
    return $("h4[class='mb-0']");
  }

  public get chooseCard() {
    return $('//div[contains(@class,"Subscriptions_cards-derails-list")]/div');
  }

  public get addCardBtn() {
    return $("a[class$='btn-link Subscriptions_btn-change__cCHV0']");
  }

  public get instaAddBtn() {
    return $("[class$='btn-Link btn-secondary Subscriptions_btn-add__UsS0S']");
  }

  public get selectCard() {
    return $("[class$='radio-detail']");
  }

  public get submitCard() {
    return $(
      "[class$='btn-primary btn-sm mw-100 Subscriptions_btn-save__8VZzL']"
    );
  }

  public get submitOrder() {
    return $('a[href="/en/iconsult/summary#"]');
  }

  public get iConsultCompletedMessage() {
    return $("//h5[@class='title text-orange-600 aos-init aos-animate']");
  }

  public get getOrderDetailBtn() {
    return $(
      "[class$='btn-primary btn-sm mt-15 text-uppercase aos-init aos-animate']"
    );
  }

  public get fetchOrderId() {
    return $("span[class='MyOrder_order-id__wsMkB']");
  }

  public get fetchMedicineName() {
    return $("//h4[normalize-space()='Tadalafil']");
  }

  public get fetchOrderSubscriptionPlan() {
    return $("//span[@class='badge bg-orange-200 MyOrder_badge-month__FhQJe']");
  }

  public get fetchOrderSubscriptionTotalAmount() {
    return $("//span[@class='MyOrder_total-main-price__n2pqe']");
  }

  // Interaction with the iConsult ED flow
  public async iConsultEDQuestionsAndAnswer(): Promise<void> {
    // Select options for each question in the questionnaire

    // Question 1
    await this.option1forQuestion1.click();
    await browser.pause(2000);

    // Question 2
    await this.option1forQuestion2.click();
    await browser.pause(2000);

    // Question 3
    await this.option4forQuestion3.doubleClick();
    await browser.pause(2000);
    await this.continueButtonQuestionnaire.scrollIntoView();
    await browser.pause(1000);
    await this.continueButtonQuestionnaire.click();
    await browser.pause(2000);

    // Question 4
    await this.option1forQuestion4.click();
    await browser.pause(2000);

    // Question 5
    await this.option5forQuestion5.doubleClick();
    await browser.pause(2000);
    await this.continueButtonQuestionnaire.scrollIntoView();
    await browser.pause(1000);
    await this.continueButtonQuestionnaire.click();
    await browser.pause(2000);

    // Question 6
    await this.option14forQuestion6.doubleClick();
    await browser.pause(2000);
    await this.continueButtonQuestionnaire.scrollIntoView();
    await browser.pause(2000);
    await this.continueButtonQuestionnaire.click();
    await browser.pause(2000);

    // Question 7
    await this.formforQuestion7.setValue("Automation Testing");
    await browser.pause(2000);
    await this.continueButtonQuestionnaire.click();
    await browser.pause(2000);

    // Question 8
    await this.option5forQuestion8.doubleClick();
    await browser.pause(2000);
    await this.continueButtonQuestionnaire.scrollIntoView();
    await browser.pause(2000);
    await this.continueButtonQuestionnaire.click();
    await browser.pause(2000);

    // Question 9
    await this.option6forQuestion9.doubleClick();
    await browser.pause(2000);
    await this.continueButtonQuestionnaire.scrollIntoView();
    await browser.pause(2000);
    await this.continueButtonQuestionnaire.click();
    await browser.pause(2000);

    // Question 10
    await this.option3forQuestion10.click();
    await browser.pause(2000);

    // Question 11
    await this.option2forQuestion11.click();
    await browser.pause(2000);

    // Dosage selection
    await this.dosageSelection.click();
    await browser.pause(2000);

    // Choose again
    await this.chooseAgain.click();
    await browser.pause(2000);
  }
}

export default new iConsultEDFlow();

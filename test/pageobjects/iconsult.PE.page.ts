import { $ } from "@wdio/globals";
import Page from "./page.js";

class iConsultPEFlow extends Page {
  /*
   * Locators for initial steps
   */
  public get startiConsultButton() {
    return $("#start-free-iconsult");
  }

  public get consentCheckbox() {
    return $("label[class$='label-checkbox']");
  }

  public get continueButtonQuestionnaire() {
    return $("//button[@class='btn-primary btn-sm text-uppercase']");
  }

  /*
   * Locators for country selection
   */
  public get selectCountry() {
    return $("[class$='form-select']");
  }

  public get countryContinueBtn() {
    return $(
      "[class$='btn-primary btn-sm text-uppercase aos-init aos-animate']"
    );
  }

  /*
   * Locators for date of birth
   */
  public get dobSelector() {
    return $(
      "[class$='MuiInputBase-input MuiOutlinedInput-input form-input form-date-input css-1x5jdmq']"
    );
  }

  public get inputDOB() {
    return $("[name$='dateOfBirth']");
  }

  public get eligibilityContinueBtn() {
    return $(
      "[class$='btn-primary btn-sm mt-15 text-uppercase aos-init aos-animate']"
    );
  }

  /*
   * Locators for iConsult options
   */
  public get iconsultOption() {
    return $("[class$='single-radio']");
  }

  public get iConsultEDselection() {
    return $('[for$="question1"]');
  }

  public get iConsultPEselection() {
    return $('[for$="question2"]');
  }

  public get iConsultHLselection() {
    return $('[for$="question3"]');
  }

  public get iConsultGHselection() {
    return $('[for$="question4"]');
  }

  public get startNewiConsult() {
    return $('[class$="btn-secondary mw-100 mt-15"]');
  }

  /*
   * Locators for questionnaire options
   */
  public get option4forQuestion1() {
    // How long has this problem been present?
    return $('[for$="option3"]');
  }

  public get option6forQuestion2() {
    // How did your ED start?
    return $("//label[@for='option5']");
  }

  public get option2forQuestion3() {
    // Have you been diagnosed with any of the following?
    return $("[for$='option1']");
  }

  public get option2forQuestion4() {
    // Are you taking any medication daily?
    return $("[for$='option1']");
  }

  public get option4forQuestion5() {
    // Do you take any of these medications?
    return $("[for$='option3']");
  }

  public get option5forQuestion5() {
    // Do you take any of these medications?
    return $("[for$='option4']");
  }

  public get option3forQuestion6() {
    // Have you had or do you have any of these conditions?
    return $("[for$='option2']");
  }

  public get option5forQuestion7() {
    // Please share with Dr. Linares any other medical conditions treated with medications:
    return $("//label[@for='option4']");
  }

  public get option2forQuestion8() {
    // Are you allergic to any of the following medications?
    return $("[for$='option1']");
  }

  public get option2forQuestion9() {
    // In the past 3 months have you used, ingested, or smoked any of these substances?
    return $("[for$='option1']");
  }

  public get option3forQuestion10() {
    // How often do you wake up with an erection?
    return $("[for$='option2']");
  }

  public get option3forQuestion11() {
    // Have you tried any of these medications before?
    return $("[for$='option2']");
  }

  public get option2forQuestion11() {
    // Have you tried any of these medications before?
    return $("[for$='option1']");
  }

  public get option1forQuestion11() {
    // Have you tried any of these medications before?
    return $("[for$='option0']");
  }

  /*
   * Locators for recommendations
   */
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

  /*
   * Locators for subscription plans
   */
  public get subscriptionOneMonthOption() {
    return $("//label[@for='sub-43']");
  }

  public get fetchSubscriptionPlan() {
    return $("label[for='sub-43'] span[class='radio-title']");
  }

  public get fetchSubscriptionAmount() {
    return $(
      "label[for='sub-43'] span[class='radio-title text-orange-900 text-right']"
    );
  }

  public get subscriptionPlan() {
    return $("[for$='sub-21']");
  }

  public get subscriptionContinueBtn() {
    return $("[class$='btn-primary text-uppercase']");
  }

  /*
   * Locators for address information
   */
  public get addAddressBtn() {
    return $("[class$='btn-secondary mw-100 text-uppercase']");
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
    return $(".custom-field .radio-label:nth-last-child(1 of .radio-label)");
  }

  public get shipSaveBtn() {
    return $("[class$='btn-primary text-uppercase']");
  }

  /*
   * Locators for payment details
   */
  public get uploadSaveBtn() {
    return $("[class$='btn-primary text-uppercase ']");
  }

  public get iConsultSummaryTitle() {
    return $("[class='title aos-init aos-animate']");
  }

  public get prescribedMedicine() {
    return $("//h4[@class='mb-5']");
  }

  public get chooseCard() {
    return $("[class$='custom-field Subscriptions_custom-field__d6rRh']");
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
    return $("[class$='btn-primary btn-sm mw-100 text-uppercase']");
  }

  /*
   * Locators for completion and order details
   */
  public get iConsultCompletedMessage() {
    return $("//h5[@class='title aos-init aos-animate']");
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
    return $("//h4[normalize-space()='Paroxetine']");
  }

  public get fetchOrderSubscriptionPlan() {
    return $("//span[@class='badge bg-orange-200 MyOrder_badge-month__FhQJe']");
  }

  public get fetchOrderSubscriptionTotalAmount() {
    return $("//span[@class='MyOrder_total-main-price__n2pqe']");
  }

  /*
   * Methods
   */
  public async iConsultPEQuestionsAndAnswer() {
    // Answer questions in the questionnaire
    await this.option4forQuestion1.click();
    await browser.pause(2000);
    await this.option6forQuestion2.doubleClick();
    await browser.pause(2000);
    await this.continueButtonQuestionnaire.scrollIntoView();
    await browser.pause(2000);
    await this.continueButtonQuestionnaire.click();
    await browser.pause(2000);
    await this.option2forQuestion3.click();
    await browser.pause(2000);
    await this.option2forQuestion4.click();
    await browser.pause(2000);
    await this.option4forQuestion5.click();
    await browser.pause(2000);
    await this.option3forQuestion6.click();
    await browser.pause(2000);
    await this.option5forQuestion7.doubleClick();
    await browser.pause(2000);
    await this.continueButtonQuestionnaire.scrollIntoView();
    await browser.pause(2000);
    await this.continueButtonQuestionnaire.click();
    await browser.pause(2000);
    await this.option2forQuestion8.click();
    await browser.pause(2000);
    await this.option2forQuestion9.click();
    await browser.pause(2000);
  }
}

export default new iConsultPEFlow();

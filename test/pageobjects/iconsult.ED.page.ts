import { $ } from "@wdio/globals";
import Page from "./page.js";

class iConsultEDFlow extends Page {
  public get startiConsultbutton() {
    return $("#start-free-iconsult");
  }

  public get consentCheckbox() {
    return $('label[id$="termsAndConditions"]');
  }

  public get continueButtonQuestionnaire() {
    return $("//button[@class='btn-primary btn-sm text-uppercase']");
  }

  public get selectCountry() {
    return $("[class$='form-select']");
  }

  public get countryContinueBtn() {
    return $('input[value="Continue"]');
  }

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

  public get recommTitle() {
    return $("h5[class$='title']");
  }
  public get recommsubtitle() {
    return $("div[class='ProductRecommendation_product-detail__gH6xf'] p p");
  }

  public get recommContinueBtn() {
    return $(
      "[class$='btn-primary text-uppercase btn-sm mw-100 text-uppercase']"
    );
  }
  public get fetch_subscription_plan() {
    return $("//span[@class='radio-title'][contains(text(),'3')]");
  }
  public get fetch_subscription_amount() {
    return $("//span[normalize-space()='$125.00']");
  }

  public get subscriptionPlan() {
    return $("[for$='sub-5']");
  }
  public get subscriptionContinueBtn() {
    return $("[class$='btn-primary text-uppercase']");
  }
  public get addNewAddressButton() {
    return $('a[href="/en/addaddress"] button');
  }

  public get ship_fn_field() {
    return $("#firstName");
  }

  public get ship_ln_field() {
    return $("#lastName");
  }

  public get ship_address_field() {
    return $("#addressLine1");
  }

  public get ship_apt_field() {
    return $("#addressLine2");
  }

  public get ship_pin_field() {
    return $("#pincode");
  }
  public get ship_suggestion_field() {
    return $("[class$='suggestion-active']");
  }

  public get ship_continue_btn() {
    return $('[type$="submit"]');
  }

  public get ship_select_address() {
    return $('//h5[@data-aos="fade"]//ancestor::div/li');
  }

  public get ship_save_btn() {
    return $('input[value="Save And Continue"]');
  }

  public get upload_save_btn() {
    return $("[class$='btn-primary text-uppercase ']");
  }

  public get iConsultSummaryTitle() {
    return $("[class='title aos-init aos-animate']");
  }
  public get prescribed_medicine() {
    return $("h4[class='mb-0']");
  }

  public get choose_card() {
    return $('//div[contains(@class,"Subscriptions_cards-derails-list")]/div');
  }

  public get add_card_btn() {
    return $("a[class$='btn-link Subscriptions_btn-change__cCHV0']");
  }

  public get insta_add_btn() {
    return $("[class$='btn-Link btn-secondary Subscriptions_btn-add__UsS0S']");
  }

  public get select_card() {
    return $("[class$='radio-detail']");
  }

  public get submit_card() {
    return $(
      "[class$='btn-primary btn-sm mw-100 Subscriptions_btn-save__8VZzL']"
    );
  }
  public get submit_order() {
    return $('a[href="/en/iconsult/summary#"]');
  }

  public get iConsultCompletedMessage() {
    return $("//h5[@class='title aos-init aos-animate']");
  }

  public get get_order_detail_btn() {
    return $(
      "[class$='btn-primary btn-sm mt-15 text-uppercase aos-init aos-animate']"
    );
  }

  public get fetch_orderId() {
    return $("span[class='MyOrder_order-id__wsMkB']");
  }

  public get fetch_medicine_name() {
    return $("//h4[normalize-space()='Tadalafil']");
  }

  public get fetch_order_Subscriptionplan() {
    return $("//span[@class='badge bg-orange-200 MyOrder_badge-month__FhQJe']");
  }
  public get fetch_order_SubscriptionTotalAmount() {
    return $("//span[@class='MyOrder_total-main-price__n2pqe']");
  }

  public async iConsultEDQuestionsandAnswer() {
    await this.option1forQuestion1.click();
    await browser.pause(2000);
    //await this.continueButton.click();
    await browser.pause(3000);
    await this.option1forQuestion2.click();
    //await this.continueButton.click();
    await browser.pause(2000);
    await this.option4forQuestion3.doubleClick();
    await browser.pause(2000);
    await this.continueButtonQuestionnaire.scrollIntoView();
    await browser.pause(1000);
    await this.continueButtonQuestionnaire.click();
    await browser.pause(2000);
    await this.option1forQuestion4.click();
    await browser.pause(2000);
    //await this.continueButton.click();
    // await this.option6forQuestion5.click();
    // await browser.pause(2000);
    await this.option5forQuestion5.doubleClick();
    await browser.pause(2000);
    await this.continueButtonQuestionnaire.scrollIntoView();
    await browser.pause(1000);
    await this.continueButtonQuestionnaire.click();
    await browser.pause(2000);
    await this.option14forQuestion6.doubleClick();
    await browser.pause(2000);
    await this.continueButtonQuestionnaire.scrollIntoView();
    await browser.pause(2000);
    await this.continueButtonQuestionnaire.click();
    await browser.pause(2000);
    await this.formforQuestion7.setValue("Automation Testing");
    await browser.pause(2000);
    await this.continueButtonQuestionnaire.click();
    await browser.pause(2000);
    await this.option5forQuestion8.doubleClick();
    await browser.pause(2000);
    await this.continueButtonQuestionnaire.scrollIntoView();
    await browser.pause(2000);
    await this.continueButtonQuestionnaire.click();
    await browser.pause(2000);
    await this.option6forQuestion9.doubleClick();
    await browser.pause(2000);
    await this.continueButtonQuestionnaire.scrollIntoView();
    await browser.pause(2000);
    await this.continueButtonQuestionnaire.click();
    await browser.pause(2000);
    await this.option3forQuestion10.click();
    // await this.continueButton.click();
    await browser.pause(2000);
    await this.option2forQuestion11.click();
    //await this.continueButtonQuestionnaire.click();
    await browser.pause(2000);
    await this.dosageSelection.click();
    await browser.pause(2000);
    await this.chooseAgain.click();
    await browser.pause(2000);
  }
}

export default new iConsultEDFlow();

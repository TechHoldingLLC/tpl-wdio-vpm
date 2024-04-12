import { $ } from "@wdio/globals";
import Page from "./page";
import iConsultPEData from "../data/iConsultPE.json";

class iConsultPEFlow extends Page {
  public get startiConsultbutton() {
    return $("#start-free-iconsult");
  }

  public get consentCheckbox() {
    return $("label[class$='label-checkbox']");
  }

  public get continueBtn() {
    return $('[class$="btn-primary btn-sm text-uppercase"]');
  }

  public get selectCountry() {
    return $("[class$='form-select']");
  }

  public get countryContinueBtn() {
    return $(
      "[class$='btn-primary btn-sm text-uppercase aos-init aos-animate'"
    );
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
  public get option4forQuestion1() {
    // How long has this problem been present?
    return $('[for$="option3"]');
  }
  public get option6forQuestion2() {
    // How did your ED start?
    return $("[for$='option5']");
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
    return $("[for$='option4']");
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
    return $("label[for='sub-21'] span[class='radio-title']");
  }
  public get fetch_subscription_amount() {
    return $(
      "label[for='sub-21'] span[class='radio-title text-orange-900 text-right']"
    );
  }

  public get subscriptionPlan() {
    return $("[for$='sub-21']");
  }
  public get subscriptionContinueBtn() {
    return $("[class$='btn-primary text-uppercase']");
  }
  public get addAddressBtn() {
    return $("[class$='btn-secondary mw-100 text-uppercase']");
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
    return $(".custom-field .radio-label:nth-last-child(1 of .radio-label)");
  }

  public get ship_save_btn() {
    return $("[class$='btn-primary text-uppercase']");
  }

  public get upload_save_btn() {
    return $("[class$='btn-primary text-uppercase ']");
  }
  public get iConsultSummaryTitle() {
    return $("[class='title aos-init aos-animate']");
  }
  public get prescribed_medicine() {
    return $("//h4[normalize-space()='Paroxetine']");
  }

  public get choose_card() {
    return $("[class$='custom-field Subscriptions_custom-field__d6rRh']");
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
    return $("[class$='btn-primary btn-sm mw-100 text-uppercase']");
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
    return $("//h4[normalize-space()='Paroxetine']");
  }

  public get fetch_order_Subscriptionplan() {
    return $("//span[@class='badge bg-orange-200 MyOrder_badge-month__FhQJe']");
  }
  public get fetch_order_SubscriptionTotalAmount() {
    return $("//span[@class='MyOrder_total-main-price__n2pqe']");
  }

  public async iConsultPE() {
    await this.startiConsultbutton.click();
    await browser.pause(2000);
    await this.consentCheckbox.click();
    await browser.pause(1000);
    await this.continueBtn.click();
    await browser.pause(5000);
    await this.iConsultPEselection.click();
    await browser.pause(10000);

    if (await this.startNewiConsult.isDisplayed()) {
      await browser.pause(2000);
      await this.startNewiConsult.click();
      await browser.pause(2000);
    }
    await this.option4forQuestion1.click();
    await browser.pause(2000);
    await this.continueBtn.click();
    await browser.pause(2000);
    await browser.pause(2000);
    await this.option6forQuestion2.doubleClick();
    await this.continueBtn.click();
    await browser.pause(2000);
    await this.option2forQuestion3.click();
    await browser.pause(2000);
    await this.continueBtn.click();
    await this.option2forQuestion4.click();
    await browser.pause(2000);
    await this.continueBtn.click();
    await this.option4forQuestion5.click();
    await browser.pause(2000);
    await this.continueBtn.click();
    await this.option3forQuestion6.click();
    await browser.pause(2000);
    await this.continueBtn.click();
    await this.option5forQuestion7.doubleClick();
    await browser.pause(2000);
    await this.continueBtn.click();
    await browser.pause(2000);
    await this.option2forQuestion8.click();
    await this.continueBtn.click();
    await browser.pause(2000);
    await this.option2forQuestion9.click();
    await this.continueBtn.click();
    await browser.pause(2000);
    const Recommendation_medicine_title = await this.recommTitle.getText();
    await console.log(
      `Recommended Medicine Name: ${Recommendation_medicine_title}`
    );
    await expect(this.recommTitle).toHaveText(
      iConsultPEData.iConsultPE_MedicineName
    );
    await expect(this.recommsubtitle).toHaveText(
      iConsultPEData.iConsultPE_recommSubTitle
    );
    await this.recommContinueBtn.click();
    await browser.pause(2000);
    await this.subscriptionPlan.click();
    const iConsult_SubscriptionPlan =
      await this.fetch_subscription_plan.getText();
    const iConsult_SubscriptionPlanAmount =
      await this.fetch_subscription_amount.getText();
    await console.log(
      `Selected Subscription Plan: ${iConsult_SubscriptionPlan}`
    );
    await console.log(
      `Subscription Plan Amount: ${iConsult_SubscriptionPlanAmount}`
    );
    await browser.pause(2000);
    await this.subscriptionContinueBtn.click();
    await browser.pause(2000);

    await this.ship_select_address.click();
    await browser.pause(2000);
    await this.ship_save_btn.click();
    await browser.pause(2000);

    const fileInput = await browser.$("[type$='file']");
    const filePath =
      "/Users/prabhavjoshi/Documents/Automation/VPM_Automation/Git_VPM_Wdio/tpl-wdio-vpm/test/data/10h6IV-1008052284.jpg";
    await fileInput.addValue(filePath);
    await browser.pause(5000);
    await this.upload_save_btn.click();
    await browser.pause(5000);

    const fileInput2 = await browser.$("[type$='file']");
    const filePath2 =
      "/Users/prabhavjoshi/Documents/Automation/VPM_Automation/Git_VPM_Wdio/tpl-wdio-vpm/test/data/10h6IV-1008052284.jpg";
    await fileInput2.addValue(filePath2);
    await this.upload_save_btn.click();
    await browser.pause(5000);
    await expect(this.iConsultSummaryTitle).toHaveText(
      iConsultPEData.iConsultPE_SummaryTitle
    );
    await expect(this.prescribed_medicine).toHaveText(
      iConsultPEData.iConsultPE_SummaryMedicine
    );
    await browser.pause(2000);
    await this.choose_card.click();
    await browser.pause(2000);
    await this.submit_order.click();
    await browser.pause(5000);

    await expect(this.iConsultCompletedMessage).toHaveText(
      iConsultPEData.iConsultPE_CompletionMsg
    );
    await this.get_order_detail_btn.click();
    await browser.pause(2000);
    const orderInformation = await this.fetch_orderId.getText();
    const orderId = await orderInformation.split(":")[1].trim();
    console.log(`Order ID is: ${orderId}`);
    await browser.pause(2000);

    const Order_Summary_Medicine = await this.fetch_medicine_name.getText();
    console.log(`Ordered Medicine is: ${Order_Summary_Medicine}`);
    const Order_Summary_Subscription_Plan =
      await this.fetch_order_Subscriptionplan.getText();
    console.log(
      `Ordered Subscription Plan is: ${Order_Summary_Subscription_Plan}`
    );
    const Order_Summary_Total =
      await this.fetch_order_SubscriptionTotalAmount.getText();
    console.log(`Ordered Summary Total Amount is: ${Order_Summary_Total}`);
    await browser.pause(2000);
    await expect(Recommendation_medicine_title).toEqual(Order_Summary_Medicine);
    await expect(iConsult_SubscriptionPlan).toEqual(
      Order_Summary_Subscription_Plan
    );
    await expect(iConsult_SubscriptionPlanAmount).toEqual(Order_Summary_Total);
    await browser.pause(2000);
  }

  public openiConsult() {
    return super.open("en/start-iconsult");
  }
}

export default new iConsultPEFlow();

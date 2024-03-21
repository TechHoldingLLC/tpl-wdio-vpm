import { $ } from "@wdio/globals";
import Page from "./page";

class iConsultFlow extends Page {
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
    return $("[for$='option2']");
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
  public get option1forQuestion8() {
    // Are you allergic to any of the following medications?
    return $("[for$='option0']");
  }
  public get option6forQuestion9() {
    // In the past 3 months have you used, ingested, or smoked any of these substances?
    return $("[for$='option5']");
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

  public get recommContinueBtn() {
    return $(
      "[class$='btn-primary text-uppercase btn-sm mw-100 text-uppercase']"
    );
  }

  public get subscriptionPlan() {
    return $("[for$='sub-5']");
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

  public get get_order_detail_btn() {
    return $(
      "[class$='btn-primary btn-sm mt-15 text-uppercase aos-init aos-animate']"
    );
  }

  public get fetch_orderId() {
    return $(
      "[class$='d-flex justify-content-between align-items-center MyOrder_order-id-time__4GOQk']"
    );
  }

  public async iConsultED() {
    await this.startiConsultbutton.click();
    await this.consentCheckbox.scrollIntoView();
    await this.consentCheckbox.click();
    await this.continueBtn.click();
    await this.iConsultEDselection.click();
    await browser.pause(5000);
    // const problemSelection = $(
    //   `[for='question${Math.floor(Math.random() * 4) + 1}']`
    // );

    // await problemSelection.click();
    // await browser.pause(7000);

    // if ((await this.selectCountry).isDisplayed) {
    //   await browser.pause(5000);
    //   await this.selectCountry.selectByVisibleText("California");
    //   await this.countryContinueBtn.click();
    //   // await expect(this.inputDOB).toHaveValue("MM/DD/YYYY");
    //   await this.inputDOB.doubleClick();
    //   await browser.pause(5000);
    //   const value = "09091989";
    //   const arrValue = [...value];
    //   for (let i = 0; i < arrValue.length; i++) {
    //     browser.keys(arrValue[i]);
    //     browser.pause(5000);
    //   }

    await this.startNewiConsult.click();
    await browser.pause(5000);
    await this.option1forQuestion1.click();
    await browser.pause(5000);
    await this.continueBtn.click();
    await browser.pause(2000);
    await this.option1forQuestion2.click();
    await this.continueBtn.click();
    await browser.pause(2000);
    await this.option4forQuestion3.doubleClick();
    await browser.pause(2000);
    await this.continueBtn.click();
    await this.option1forQuestion4.click();
    await browser.pause(2000);
    await this.continueBtn.click();

    await this.option6forQuestion5.click();
    await browser.pause(2000);
    await this.option5forQuestion5.click();
    await browser.pause(2000);
    await this.continueBtn.click();
    await this.option14forQuestion6.doubleClick();
    await browser.pause(2000);
    await this.continueBtn.click();
    await this.formforQuestion7.setValue("Automation Testing");
    await browser.pause(2000);
    await this.continueBtn.click();
    await browser.pause(2000);
    await this.option1forQuestion8.click();
    await this.continueBtn.click();
    await browser.pause(2000);
    await this.option6forQuestion9.doubleClick();
    await this.continueBtn.click();
    await browser.pause(2000);
    await this.option3forQuestion10.click();
    await this.continueBtn.click();
    await browser.pause(2000);
    await this.option3forQuestion11.click();
    await this.continueBtn.click();
    await browser.pause(2000);
    await expect(this.recommTitle).toHaveText("Tadalafil");
    await this.recommContinueBtn.click();
    await browser.pause(2000);
    await this.subscriptionPlan.click();
    await this.subscriptionContinueBtn.click();
    await browser.pause(2000);
    if ((await this.selectCountry).isDisplayed) {
      await browser.pause(5000);
      await this.selectCountry.selectByVisibleText("California");
      await this.countryContinueBtn.click();
    }
    await this.addAddressBtn.click();

    await this.ship_fn_field.setValue("Wdio");
    await this.ship_ln_field.setValue("Automation");
    await this.ship_address_field.setValue("Test Street Address");
    await this.ship_apt_field.setValue("Test Apartment Name");
    await this.ship_pin_field.setValue("90035");
    await this.ship_suggestion_field.click();
    await browser.pause(5000);
    await this.ship_continue_btn.click();
    await browser.pause(5000);
    await this.ship_select_address.click();

    await this.ship_save_btn.click();
    await browser.pause(2000);

    const fileInput = await browser.$("[type$='file']");
    const filePath =
      "/Users/prabhavjoshi/Documents/Automation/VPM_Automation/Git_VPM_Wdio/tpl-wdio-vpm/test/data/10h6IV-1008052284.jpg";
    console.log("Path for file:", filePath);
    await fileInput.addValue(filePath);
    await browser.pause(5000);
    await this.upload_save_btn.click();
    await browser.pause(5000);

    const fileInput2 = await browser.$("[type$='file']");
    const filePath2 =
      "/Users/prabhavjoshi/Documents/Automation/VPM_Automation/Git_VPM_Wdio/tpl-wdio-vpm/test/data/10h6IV-1008052284.jpg";
    console.log("Path for file:", filePath2);
    await fileInput2.addValue(filePath2);
    await this.upload_save_btn.click();
    await browser.pause(5000);
    //await this.add_card_btn.scrollIntoView();
    await browser.pause(2000);
    await this.choose_card.click();
    await browser.pause(2000);
    // await this.add_card_btn.click();
    // await browser.pause(5000);
    // await this.select_card.click();
    // await browser.pause(2000);
    // await this.submit_card.click();
    // await browser.pause(2000);
    await this.submit_order.click();
    await browser.pause(5000);

    await this.get_order_detail_btn.click();
    await browser.pause(2000);
    const Order = await this.fetch_orderId.getText();
    const orderId = await Order.split(" ");
    await console.log(orderId);
    await browser.pause(2000);

    // await this.insta_add_btn.click();
    // await browser.pause(5000);

    // const iframe = await browser.$("[name$='instamed']");

    // await browser.switchToFrame(iframe);
    // await browser.pause(5000);

    // const cardNumberInput = await browser.$(
    //   "#FormPatientPayment_CreditCardNumber"
    // );
    // const expirationDateInput = await browser.$("#FormPatientPayment_ExpDate");
    // const submitButton = await browser.$("#FormPatientPayment_button_Submit");

    // await cardNumberInput.click();
    // await browser.pause(2000);
    // await cardNumberInput.setValue("4111 1111 1111 1111");
    // await expirationDateInput.click();
    // await browser.pause(2000);
    // await expirationDateInput.setValue("12/28");
    // await browser.pause(2000);
    // await submitButton.click();
    // await browser.pause(2000);

    // await browser.switchToFrame(null);

    // await this.submit_card.click();
    // await browser.pause(5000);
    // await this.submit_order.click();
    // await browser.pause(5000);
  }

  public openiConsult() {
    return super.open("en/start-iconsult");
  }
}

export default new iConsultFlow();

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

  public get iConsultHLselection() {
    return $('[for$="question3"]');
  }

  public get startNewiConsult() {
    return $('[class$="btn-secondary mw-100 mt-15"]');
  }
  public get option3forQuestion1() {
    // How long has this problem been present?
    return $('[for$="option2"]');
  }
  public get option6forQuestion2() {
    // How did your ED start?
    return $("[for$='option5']");
  }
  public get option4forQuestion3() {
    // Have you been diagnosed with any of the following?
    return $("[for$='option2']");
  }
  public get option1forQuestion4() {
    // Are you taking any medication daily?
    return $("[for$='option0']");
  }
  public get option2forQuestion5() {
    // Do you take any of these medications?
    return $("[for$='option1']");
  }
  public get back_btn() {
    return $("[class$='back-button']");
  }

  public async iConsultED() {
    await this.startiConsultbutton.click();
    await this.consentCheckbox.scrollIntoView();
    await this.consentCheckbox.click();
    await this.continueBtn.click();
    await this.iConsultHLselection.click();
    await browser.pause(5000);
    await this.startNewiConsult.click();
    await browser.pause(5000);
    await this.option3forQuestion1.click();
    await browser.pause(5000);
    await this.continueBtn.click();
    await browser.pause(2000);
    await this.option6forQuestion2.doubleClick();
    await this.continueBtn.click();
    await browser.pause(2000);
    await this.option4forQuestion3.doubleClick();
    await browser.pause(2000);
    await this.continueBtn.click();
    await this.option1forQuestion4.click();
    await browser.pause(2000);
    // await this.continueBtn.click();

    await this.option2forQuestion5.click();
    await browser.pause(2000);
  }

  public openiConsult() {
    return super.open("en/start-iconsult");
  }
}

export default new iConsultFlow();

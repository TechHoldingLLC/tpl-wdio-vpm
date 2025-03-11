import { $ } from "@wdio/globals";
import Page from "./page.js";

class iConsultWLFlow extends Page {
  // Continue button for questionnaire
  public get continueButtonQuestionnaire() {
    return $("//button[@class='btn-primary btn-sm text-uppercase']");
  }

  public get fetchSubscriptionAmount() {
    return $('span[class*="radio-title text-orange"]');
  }

  public get fetchSubscriptionPlan() {
    return $('span[class*="radio-title text-font"]');
  }
  //iConsult Summary itle
  public get iConsultSummaryTitle() {
    return $("[class='title undefined aos-init aos-animate']");
  }

  public get iConsultCompletedMessage() {
    return $("//h5[@class='title text-orange-600 aos-init aos-animate']");
  }

  // Eligible Screen
  public get successText() {
    return $('//div[contains(@class,"infoData InfoScreen")]//p');
  }

  // Question options
  public get option1forQuestion1() {
    // What is your weight loss goal?
    return $('[for$="option0"]');
  }

  public get dropdownforQuestion2_1() {
    // What is your height?
    return $('//select[@id="dropdown0"]');
  }

  public get answerforQuestion2_1() {
    return $('//option[@value="192"]');
  }

  public get answerforQuestion2_2() {
    // What is your weight?
    return $('//input[@type="text"]');
  }

  public get option2forQuestion3() {
    // Have you ever taken Ozempic, Rybelsus, a Semaglutide, Trulicity, Wegovy, or Zepbound?
    return $("[for$='option1']");
  }

  public get option4forQuestion4() {
    // Are you taking any of the following medications?
    return $("[for$='option3']");
  }

  public get option2forQuestion5() {
    // Do you or anyone in your immediate family (grandparents, parents, siblings) suffer from a rare diagnosis known as multiple endocrine neoplasia Type 2?
    return $("[for$='option1']");
  }

  public get option2forQuestion6() {
    // Have you ever been diagnosed with any type of cancer?
    return $("[for$='option1']");
  }

  public get option5forQuestion7() {
    // Have you ever had or currently suffer from any of the following conditions?
    return $('[for$="option5"]');
  }

  public get option2forQuestion8() {
    // Are you currently pregnant, breastfeeding, or planning to become pregnant in the next 6 months?
    return $("//label[@for='option1']");
  }

  public get answerforQuestion9() {
    // And finally, do you have any allergies or other medical conditions?
    return $('//textarea[@id="textarea0"]');
  }

  public get answerforQuestion10() {
    // Is there anything else you want the provider to know?
    return $('//textarea[@id="textarea0"]');
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

  // Interaction with the iConsult ED flow
  public async iConsultWLQuestionsAndAnswer(): Promise<void> {
    // Select options for each question in the questionnaire

    // Question 1
    await this.option1forQuestion1.waitForDisplayed();
    await this.option1forQuestion1.click();

    // Question 2.1
    await this.dropdownforQuestion2_1.waitForDisplayed();
    await this.dropdownforQuestion2_1.click();
    await this.answerforQuestion2_1.waitForDisplayed();
    await this.answerforQuestion2_1.click();

    // Question 2.2
    await this.answerforQuestion2_2.clearValue();
    await this.answerforQuestion2_2.addValue("300");
    await this.continueButtonQuestionnaire.click();

    // Confirmation Screen
    await browser.pause(2000);
    await this.continueButtonQuestionnaire.click();

    // Question 3
    await this.option2forQuestion3.waitForDisplayed();
    await this.option2forQuestion3.click();

    // Question 4
    await this.option4forQuestion4.waitForDisplayed();
    await this.option4forQuestion4.click();
    await this.option4forQuestion4.click();
    await this.continueButtonQuestionnaire.click();

    // Question 5
    await browser.pause(2000);
    await this.option2forQuestion5.click();

    // Question 6
    await browser.pause(2000);
    await this.option2forQuestion6.click();

    // Question 7
    await this.option5forQuestion7.waitForDisplayed();
    await this.option5forQuestion7.click();
    await this.option5forQuestion7.click();
    await this.continueButtonQuestionnaire.scrollIntoView();
    await browser.pause(2000);
    await this.continueButtonQuestionnaire.click();

    // Question 8
    await browser.pause(2000);
    await this.option2forQuestion8.click();

    // Question 9
    await this.answerforQuestion9.waitForDisplayed();
    await this.answerforQuestion9.clearValue();
    await this.answerforQuestion9.addValue("No");
    await this.continueButtonQuestionnaire.click();

    // Question 10
    await browser.pause(2000);
    await this.answerforQuestion10.clearValue();
    await this.answerforQuestion10.addValue("No");
    await this.continueButtonQuestionnaire.click();
    await browser.pause(2000);
  }
}

export default new iConsultWLFlow();

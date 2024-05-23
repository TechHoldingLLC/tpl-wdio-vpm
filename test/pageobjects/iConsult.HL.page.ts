//import { $ } from "@wdio/globals";
import Page from "./page.js";

class iConsultHairLossPage extends Page {
  /*
    How long has this problem been present?
    Problem been present since how long?
    */
  public get problemPresentQuestion() {
    return $('h5[data-aos="fade"]');
  }

  public get problemPresentOptionMonthToYear() {
    return $('label[for="option0"]');
  }

  public get problemPresentOption1to3Year() {
    return $('[for$="option1"]');
  }

  public get problemPresentOption3to5Year() {
    return $('[for$="option2"]');
  }

  public get problemPresentOption5PlusYear() {
    return $('[for$="option3"]');
  }

  public get continueButton() {
    return $('//a[@class="btn-primary btn-sm text-uppercase"]');
  }

  /*
    Have you been diagnosed with any of the following?
    */
  public get diagnosedQuestions() {
    return $('h5[data-aos="fade"]');
  }

  public get noneOfTheAboveProblem() {
    return $('label[for="option5"]');
  }

  // Continue button

  /*
    Do you have any of these other medical conditions?
    */

  public get medicalConditionQuestions() {
    return $('h5[data-aos="fade"]');
  }

  public get noneOfTheseApplyMeOption() {
    return $('label[for="option3"]');
  }

  // Continue button
  /*
    Are you taking any medication daily? Yes OR No
    */

  public get medicationDailyQuestions() {
    return $('h5[data-aos="fade"]');
  }

  public get medicationDailyNoAnswer() {
    return $('label[for="option1"]');
  }

  public get medicationDailyYesAnswer() {
    return $('label[for="option0"]');
  }

  // Continue button

  /*
    Are you allergic to any type of medication? Yes OR No
    */

  public get allergicMedicationQuestions() {
    return $('h5[data-aos="fade"]');
  }

  public get allergicMedicationYesAnswer() {
    return $('label[for="option0"]');
  }

  public get allergicMedicationNoAnswer() {
    return $('label[for="option1"]');
  }

  public async iConsultHLQuestionsandAnswers(): Promise<void> {
    await this.problemPresentOption3to5Year.doubleClick();
    await browser.pause(2000);
    await this.problemPresentOption5PlusYear.doubleClick();
    await browser.pause(2000);
    await this.continueButton.click();
    await browser.pause(2500);
    //await this.diagnosedQuestions.waitForDisplayed()
    if (!(await this.noneOfTheAboveProblem.isSelected())) {
      await this.noneOfTheAboveProblem.doubleClick();
      await browser.pause(1500);
      await this.continueButton.click();
      await browser.pause(1000);
    } else {
      await browser.pause(1500);
      await this.continueButton.click();
    }
    await browser.pause(2000);
    await this.medicalConditionQuestions.waitForDisplayed();
    if (!(await this.noneOfTheseApplyMeOption.isSelected())) {
      await this.noneOfTheseApplyMeOption.doubleClick();
      await browser.pause(1500);
      await this.continueButton.click();
      await browser.pause(1000);
    } else {
      await browser.pause(1500);
      await this.continueButton.click();
    }
    await browser.pause(2000);
    await this.medicationDailyQuestions.waitForDisplayed();
    await this.medicationDailyNoAnswer.click();
    await browser.pause(2000);
    await this.continueButton.click();
    await browser.pause(2000);
    await this.allergicMedicationQuestions.waitForDisplayed();
    await this.allergicMedicationNoAnswer.click();
    await browser.pause(2000);
    await this.continueButton.click();
    await browser.pause(4000);
  }
}

export default new iConsultHairLossPage();

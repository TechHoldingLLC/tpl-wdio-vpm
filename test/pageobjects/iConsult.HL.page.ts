import Page from "./page.js";

class iConsultHairLossPage extends Page {
  /*
   * Locators for problem presence question
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

  /*
   * Locators for diagnosed condition question
   */
  public get diagnosedQuestions() {
    return $('h5[data-aos="fade"]');
  }

  public get noneOfTheAboveProblem() {
    return $('label[for="option5"]');
  }

  /*
   * Locators for medical condition question
   */
  public get medicalConditionQuestions() {
    return $('h5[data-aos="fade"]');
  }

  public get noneOfTheseApplyMeOption() {
    return $('label[for="option3"]');
  }

  /*
   * Locators for daily medication question
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

  /*
   * Locators for allergic medication question
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

  /*
   * Locator for the continue button
   */
  public get continueButtonQuestionnaire() {
    return $("//button[@class='btn-primary btn-sm text-uppercase']");
  }

  /*
   * Method to handle the iConsult Hair Loss questionnaire flow
   */
  public async iConsultHLQuestionsandAnswers(): Promise<void> {
    // Wait for and select the problem presence option
    await browser.pause(2000);
    await this.problemPresentOption5PlusYear.click();
    await browser.pause(2000);

    // Handle the diagnosed condition question
    if (!(await this.noneOfTheAboveProblem.isSelected())) {
      await this.noneOfTheAboveProblem.doubleClick();
      await browser.pause(1500);
    }
    await this.continueButtonQuestionnaire.scrollIntoView();
    await browser.pause(1000);
    await this.continueButtonQuestionnaire.click();
    await browser.pause(1000);

    // Handle the medical condition question
    await this.medicalConditionQuestions.waitForDisplayed();
    if (!(await this.noneOfTheseApplyMeOption.isSelected())) {
      await this.noneOfTheseApplyMeOption.doubleClick();
      await browser.pause(1500);
    }
    await this.continueButtonQuestionnaire.scrollIntoView();
    await this.continueButtonQuestionnaire.click();
    await browser.pause(1000);

    // Handle the daily medication question
    await this.medicationDailyQuestions.waitForDisplayed();
    await this.medicationDailyNoAnswer.click();
    await browser.pause(2000);

    // Handle the allergic medication question
    await this.allergicMedicationNoAnswer.waitForDisplayed();
    await this.allergicMedicationNoAnswer.scrollIntoView();
    await browser.pause(1000);
    await this.allergicMedicationNoAnswer.click();
    await browser.pause(2000);
    await this.allergicMedicationNoAnswer.click();
    await browser.pause(2000);
  }
}

export default new iConsultHairLossPage();

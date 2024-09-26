import Page from "./page.js";

class iConsultEDSlidenafil extends Page {
  /*
   * Locators for problem presentation question
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
    return $('//label[@for="option3"]');
  }

  /*
   * Locators for questionnaire continuation
   */
  public get continueButton() {
    return $('//a[@class="btn-primary btn-sm text-uppercase"]');
  }

  public get continueButtonQuestionnaire() {
    return $("//button[@class='btn-primary btn-sm text-uppercase']");
  }

  /*
   * Locators for ED start questions
   */
  public get EDStartQuestions() {
    return $('h5[data-aos="fade"]');
  }

  public get EDStartGradually() {
    return $('//label[@for="option0"]');
  }

  public get EDStartSuddenly() {
    return $('[for$="option1"]');
  }

  public get EDStartSuddenlyWithOtherSymptoms() {
    return $('[for$="option2"]');
  }

  /*
   * Locators for diagnosed conditions
   */
  public get diagnosedWithAnyOfTheFollowing() {
    return $('h5[data-aos="fade"]');
  }

  public get noneOfTheAboveSelection() {
    // Have you been diagnosed with any of the following?
    return $("//label[@for='option2']");
  }

  /*
   * Locators for medication questions
   */
  public get medicationDailyQuestions() {
    return $('h5[data-aos="fade"]');
  }

  public get medicationYes() {
    return $('[for$="option0"]');
  }

  public get medicationNo() {
    return $("//label[@for='option1']");
  }

  public get takeAnyMedicationsQuestions() {
    return $('h5[data-aos="fade"]');
  }

  public get noneOfTheAboveSelectionForMedications() {
    // Do you take any of these medications?
    return $("[for$='option4']");
  }

  public get haveYouHadAnyOfConditionsQuestions() {
    // Have you had or do you have any of these conditions?
    return $('h5[data-aos="fade"]');
  }

  public get noneOfTheAboveOption() {
    return $("//label[@for='option13']");
  }

  public get shareWithDoctorAnyMedication() {
    return $('h5[data-aos="fade"]');
  }

  public get shareWithDoctorAnyMedicationTextBox() {
    // Please share with Dr. Linares any other medical conditions treated with medications:
    return $("//textarea[@id='textarea0']");
  }

  public get allergicToAnyMedications() {
    return $('h5[data-aos="fade"]');
  }

  public get notAllergicToAnyMedicationOption() {
    return $("//label[@for='option4']");
  }

  /*
   * Locators for substance use and erection frequency
   */
  public get past3MonthsUsedAnySubstancesQuestions() {
    return $('h5[data-aos="fade"]');
  }

  public get noDrugsUsed() {
    return $("//label[@for='option4']");
  }

  public get wakeUpWithErectionOptions() {
    return $('h5[data-aos="fade"]');
  }

  public get oneToThreeTimesOption() {
    return $("//label[@for='option2']");
  }

  /*
   * Locators for previous medication use and dosage
   */
  public get anyMedicationBeforeQuestions() {
    return $('h5[data-aos="fade"]');
  }

  public get sildenafilMedicationOption() {
    return $("//label[@for='option0']");
  }

  public get tadalafilMedicationOption() {
    return $('label[for="option1"]');
  }

  public get noneOfTheAboveMedicationOption() {
    return $('label[for="option2"]');
  }

  public get dosageYouTakeOptions() {
    return $('h5[data-aos="fade"]');
  }

  public get twentyFiveMgOption() {
    return $('label[for="option0"]');
  }

  public get fiftyMgOption() {
    return $('label[for="option1"]');
  }

  public get hundredMgOption() {
    return $('label[for="option2"]');
  }

  public get medicationAgainQuestion() {
    return $('h5[data-aos="fade"]');
  }

  public get medicationAgainYes() {
    return $('label[for="option0"]');
  }

  public get medicationAgainNo() {
    return $('label[for="option1"]');
  }

  public get dosageStrengthFiftyMG() {
    return $("//span[normalize-space()='50mg']");
  }

  public get dosageStrengthHundredMG() {
    return $("//label[@for='dosage-option-4-1']");
  }

  /*
   * Locators for subscription options
   */
  public get fifteenDosesSelection() {
    return $('[id="tab:r1:1"]');
  }

  public get threeMonthSubscriptionOption() {
    return $("//label[@for='sub-36']");
  }

  public get threeMonthSubscriptionText() {
    return $("//span[@class='radio-title'][contains(text(),'3')]");
  }

  public get threeMonthSubscriptionAmount() {
    return $("//span[normalize-space()='$139.95']");
  }

  /*
   * Method to complete the iConsult ED flow
   */
  public async iConsultEDSQuestionsAndAnswers(): Promise<void> {
    // Answer problem presentation question
    await this.problemPresentQuestion.waitForDisplayed();
    await this.problemPresentOption5PlusYear.click();
    await browser.pause(2000);

    // Answer ED start questions
    await this.EDStartQuestions.waitForDisplayed();
    await this.EDStartGradually.click();
    await browser.pause(3000);

    // Answer diagnosed conditions question
    await this.diagnosedWithAnyOfTheFollowing.waitForDisplayed();
    await this.noneOfTheAboveSelection.doubleClick();
    await browser.pause(2000);
    await this.continueButtonQuestionnaire.scrollIntoView();
    await browser.pause(1000);
    await this.continueButtonQuestionnaire.click();
    await browser.pause(3500);

    // Answer medication daily questions
    await this.medicationDailyQuestions.waitForDisplayed();
    await this.medicationNo.click();
    await browser.pause(3500);

    // Answer take any medications questions
    await this.takeAnyMedicationsQuestions.waitForDisplayed();
    await this.noneOfTheAboveSelectionForMedications.doubleClick();
    await browser.pause(2000);
    await this.continueButtonQuestionnaire.scrollIntoView();
    await browser.pause(1500);
    await this.continueButtonQuestionnaire.click();
    await browser.pause(3500);

    // Answer conditions questions
    await this.haveYouHadAnyOfConditionsQuestions.waitForDisplayed();
    await this.noneOfTheAboveOption.doubleClick();
    await browser.pause(3500);
    await this.continueButtonQuestionnaire.scrollIntoView();
    await browser.pause(1500);
    await this.continueButtonQuestionnaire.click();
    await browser.pause(3500);

    // Provide additional information to doctor
    await this.shareWithDoctorAnyMedication.waitForDisplayed();
    await this.shareWithDoctorAnyMedicationTextBox.setValue(
      "Automation Testing"
    );
    await browser.pause(2000);
    await this.continueButtonQuestionnaire.scrollIntoView();
    await browser.pause(1000);
    await this.continueButtonQuestionnaire.click();
    await browser.pause(3500);

    // Answer allergy and substance use questions
    await this.allergicToAnyMedications.waitForDisplayed();
    await this.notAllergicToAnyMedicationOption.doubleClick();
    await browser.pause(2000);
    await this.continueButtonQuestionnaire.scrollIntoView();
    await browser.pause(1000);
    await this.continueButtonQuestionnaire.click();
    await browser.pause(3500);

    await this.past3MonthsUsedAnySubstancesQuestions.waitForDisplayed();
    await this.noDrugsUsed.doubleClick();
    await browser.pause(2000);
    await this.continueButtonQuestionnaire.scrollIntoView();
    await browser.pause(1000);
    await this.continueButtonQuestionnaire.click();
    await browser.pause(3500);

    // Answer wake-up with erection and medication questions
    await this.wakeUpWithErectionOptions.waitForDisplayed();
    await this.oneToThreeTimesOption.doubleClick();
    await browser.pause(3500);

    await this.anyMedicationBeforeQuestions.waitForDisplayed();
    await browser.pause(3000);
    await this.sildenafilMedicationOption.click();
    await browser.pause(1000);

    await this.dosageYouTakeOptions.waitForDisplayed();
    await this.hundredMgOption.click();
    await browser.pause(2000);

    await this.medicationAgainQuestion.waitForDisplayed();
    await this.medicationAgainYes.click();
    await browser.pause(2000);
  }
}

export default new iConsultEDSlidenafil();

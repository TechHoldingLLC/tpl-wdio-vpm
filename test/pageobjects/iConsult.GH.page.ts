import Page from "./page.js";

class iConsultGenitalHerpesPage extends Page {
  // Page Elements

  // Diagnosed with genital herpes before?
  public get diagnosedWithGHBeforeQuestions() {
    return $('h5[data-aos="fade"]');
  }

  public get diagnosedWithGHBeforeYes() {
    return $('label[for="option0"]');
  }

  public get diagnosedWithGHBeforeNo() {
    return $('label[for="option1"]');
  }

  // Continue button
  public get continueButton() {
    return $('//a[@class="btn-primary btn-sm text-uppercase"]');
  }

  public get continueButtonQuestionnaire() {
    return $("//button[@class='btn-primary btn-sm text-uppercase']");
  }

  // Problem presence duration
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

  // Medical conditions
  public get medicalConditionQuestions() {
    return $('h5[data-aos="fade"]');
  }

  public get noneOfTheseApplyMeOption() {
    return $('label[for="option5"]');
  }

  // Herpes location
  public get herpeslocationQuestion() {
    return $(".title.undefined.aos-init.aos-animate");
  }

  public get noneOfTheAboveSelection() {
    return $("//label[@for='option3']");
  }

  // Symptoms before outbreak
  public get notTakingMedicineGHOutBreakQuestion() {
    return $('h5[data-aos="fade"]');
  }

  public get GHOutBreakNo() {
    return $('label[for="option1"]');
  }

  public get GHOutBreakYes() {
    return $('label[for="option0"]');
  }

  // Daily medication
  public get takeMedicationQuestion() {
    return $('h5[data-aos="fade"]');
  }

  public get takeMedicationAnswer() {
    return $('label[for="option4"]');
  }

  public get medicationDailyYesAnswer() {
    return $('label[for="option0"]');
  }

  // Allergic to any medication
  public get allergicMedicationQuestions() {
    return $('h5[data-aos="fade"]');
  }

  public get allergicMedicationYesAnswer() {
    return $('label[for="option0"]');
  }

  public get allergicMedicationNoAnswer() {
    return $('label[for="option1"]');
  }

  // Medications taken in the past
  public get anyMedicationInPastQuestion() {
    return $('h5[data-aos="fade"]');
  }

  public get noneOfTheseMedicationAnswer() {
    return $("label[for='option2']");
  }

  // Reason for prescription today
  public get reasonForPrescriptionTodayQuestion() {
    return $('h5[data-aos="fade"]');
  }

  public get believeOutBreakRightNow() {
    return $('label[for="option2"]');
  }

  // Outbreak frequency
  public get outBreaksQuestion() {
    return $('h5[data-aos="fade"]');
  }

  public get onceAYearOutBreak() {
    return $('label[for="option2"]');
  }

  // Subscription plan
  public get subscriptionThreeMonthsOption() {
    return $("label[for='sub-26']");
  }

  public get fetchSubscriptionPlantext() {
    return $("label[for='sub-26'] span[class='radio-title']");
  }

  public get fetchSubscriptionAmount() {
    return $(
      "label[for='sub-26'] span[class='radio-title text-orange-900 text-right']"
    );
  }

  // Methods

  /**
   * Fill out the iConsult Genital Herpes questionnaire with predefined answers.
   * @returns {Promise<void>}
   */
  public async iConsultGHQuestionsandAnswers(): Promise<void> {
    // Answer: Diagnosed with GH before
    await this.diagnosedWithGHBeforeQuestions.waitForDisplayed();
    await this.diagnosedWithGHBeforeYes.click();
    await browser.pause(2000);

    // Answer: Problem presence duration
    await this.problemPresentQuestion.waitForDisplayed();
    await this.problemPresentOption5PlusYear.click();
    await browser.pause(2000);

    // Answer: Medical conditions
    await this.medicalConditionQuestions.waitForDisplayed();
    if (!(await this.noneOfTheseApplyMeOption.isSelected())) {
      await this.noneOfTheseApplyMeOption.doubleClick();
      await browser.pause(1500);
      await this.continueButtonQuestionnaire.scrollIntoView();
      await browser.pause(1000);
      await this.continueButtonQuestionnaire.click();
      await browser.pause(1000);
    } else {
      await browser.pause(1500);
      await this.continueButtonQuestionnaire.scrollIntoView();
      await browser.pause(1000);
      await this.continueButtonQuestionnaire.click();
    }

    // Answer: Herpes location
    await this.herpeslocationQuestion.waitForDisplayed();
    await this.noneOfTheAboveSelection.waitForExist();
    if (!(await this.noneOfTheAboveSelection.isSelected())) {
      await this.noneOfTheAboveSelection.doubleClick();
      await browser.pause(1500);
      await this.continueButtonQuestionnaire.scrollIntoView();
      await browser.pause(1000);
      await this.continueButtonQuestionnaire.click();
      await browser.pause(1000);
    } else {
      await browser.pause(1500);
      await this.continueButtonQuestionnaire.scrollIntoView();
      await browser.pause(1000);
      await this.continueButtonQuestionnaire.click();
    }

    // Answer: Symptoms before outbreak
    await this.notTakingMedicineGHOutBreakQuestion.waitForDisplayed();
    await this.GHOutBreakNo.click();
    await browser.pause(2000);

    // Answer: Do you take medication
    await this.takeMedicationQuestion.waitForDisplayed();
    await this.takeMedicationAnswer.click();
    await browser.pause(2000);

    // Answer: Allergic to medication
    await this.allergicMedicationQuestions.waitForDisplayed();
    await this.allergicMedicationNoAnswer.click();
    await browser.pause(2000);

    // Answer: Medications taken in the past
    await this.anyMedicationInPastQuestion.waitForDisplayed();
    await this.noneOfTheseMedicationAnswer.doubleClick();
    await browser.pause(1500);
    await this.continueButtonQuestionnaire.scrollIntoView();
    await browser.pause(1000);
    await this.continueButtonQuestionnaire.click();
    await browser.pause(2000);

    // Answer: Reason for prescription today
    await this.reasonForPrescriptionTodayQuestion.waitForDisplayed();
    await this.believeOutBreakRightNow.click();
    await browser.pause(2000);

    // Answer: Outbreak frequency
    await this.outBreaksQuestion.waitForDisplayed();
    await this.onceAYearOutBreak.click();
    await browser.pause(2000);
  }
}

export default new iConsultGenitalHerpesPage();

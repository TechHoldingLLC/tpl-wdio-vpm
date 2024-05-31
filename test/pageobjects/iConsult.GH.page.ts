import Page from "./page.js";

class iConsultGenitalHerpesPage extends Page {
  // Have you been diagnosed with genital herpes by a doctor before?
  public get diagnosedWithGHBeforeQuestions() {
    return $('h5[data-aos="fade"]');
  }

  public get diagnosedWithGHBeforeYes() {
    return $('label[for="option0"]');
  }

  public get diagnosedWithGHBeforeNo() {
    return $('label[for="option1"]');
  }

  public get continueButton() {
    return $('//a[@class="btn-primary btn-sm text-uppercase"]');
  }

  //How long has this problem been present?
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
    Do you have any of these other medical conditions?
    */
  public get medicalConditionQuestions() {
    return $('h5[data-aos="fade"]');
  }

  public get noneOfTheseApplyMeOption() {
    return $('label[for="option5"]');
  }

  /*
    When you have an outbreak of genital herpes and you are not on medication, where are the herpes located?
    Please select all that apply.
    */

  public get herpeslocationQuestion() {
    return $('h5[data-aos="fade"]');
  }

  public get noneOfTheAboveSelection() {
    return $("//label[@for='option3']");
  }

  /*
    When you are NOT taking medication,
    do you have any symptoms including
    pain, burning, tingling, or itching a few hours to a couple of days
    before your genital herpes outbreak?
    */

  public get notTakingMedicineGHOutBreakQuestion() {
    return $('h5[data-aos="fade"]');
  }

  public get GHOutBreakNo() {
    return $('label[for="option1"]');
  }

  public get GHOutBreakYes() {
    return $('label[for="option0"]');
  }

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

  /*
    Have you taken any of these medications in the past?
    */

  public get anyMedicationInPastQuestion() {
    return $('h5[data-aos="fade"]');
  }

  public get noneOfTheseMedicationAnswer() {
    return $("label[for='option2']");
  }

  //What is the reason you are asking for this prescription today?
  public get reasonForPrescriptionTodayQuestion() {
    return $('h5[data-aos="fade"]');
  }

  public get believeOutBreakRightNow() {
    return $('label[for="option2"]');
  }

  // When you are not on medicine how often do you have outbreaks:
  public get outBreaksQuestion() {
    return $('h5[data-aos="fade"]');
  }

  public get onceAYearOutBreak() {
    return $('label[for="option2"]');
  }

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

  public async iConsultGHQuestionsandAnswers(): Promise<void> {
    await this.diagnosedWithGHBeforeQuestions.waitForDisplayed();
    await this.diagnosedWithGHBeforeYes.click();
    await browser.pause(1000);
    await this.continueButton.click();
    await browser.pause(1000);

    await this.problemPresentQuestion.waitForDisplayed();
    await this.problemPresentOption5PlusYear.click();
    await browser.pause(1000);
    await this.continueButton.click();
    await browser.pause(1000);

    await this.medicalConditionQuestions.waitForDisplayed();
    const flag = await this.noneOfTheseApplyMeOption.isSelected();

    if (!(await this.noneOfTheseApplyMeOption.isSelected())) {
      await this.noneOfTheseApplyMeOption.doubleClick();
      await browser.pause(1500);
      await this.continueButton.click();
      await browser.pause(1000);
    } else {
      await browser.pause(1500);
      await this.continueButton.click();
    }

    await this.herpeslocationQuestion.waitForDisplayed();
    await this.noneOfTheAboveSelection.waitForExist();
    if (!(await this.noneOfTheAboveSelection.isSelected())) {
      await this.noneOfTheAboveSelection.doubleClick();
      await browser.pause(1500);
      await this.continueButton.click();
      await browser.pause(1000);
    } else {
      await browser.pause(1500);
      await this.continueButton.click();
    }

    await this.notTakingMedicineGHOutBreakQuestion.waitForDisplayed();
    await this.GHOutBreakNo.click();
    await browser.pause(1500);
    await this.continueButton.click();
    await browser.pause(1500);

    await this.medicationDailyQuestions.waitForDisplayed();
    await this.medicationDailyNoAnswer.click();
    await browser.pause(1500);
    await this.continueButton.click();
    await browser.pause(1500);

    await this.allergicMedicationQuestions.waitForDisplayed();
    await this.allergicMedicationNoAnswer.click();
    await browser.pause(1500);
    await this.continueButton.click();
    await browser.pause(2000);

    await this.anyMedicationInPastQuestion.waitForDisplayed();
    await this.noneOfTheseMedicationAnswer.doubleClick();
    await browser.pause(1500);
    await this.continueButton.click();
    await browser.pause(1500);

    await this.reasonForPrescriptionTodayQuestion.waitForDisplayed();
    await this.believeOutBreakRightNow.click();
    await browser.pause(1500);
    await this.continueButton.click();
    await browser.pause(1500);

    await this.outBreaksQuestion.waitForDisplayed();
    await this.onceAYearOutBreak.click();
    await browser.pause(1500);
    await this.continueButton.click();
    await browser.pause(2000);
  }
}

export default new iConsultGenitalHerpesPage();

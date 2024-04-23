import Page from "./page.js";

class iConsultEDSlidenafil extends Page{
/*
    How long has this problem been present?
    Problem been present since how long?
    */
    public get problemPresentQuestion(){
        return $('h5[data-aos="fade"]')
    }

    public get problemPresentOptionMonthToYear(){
        return $('label[for="option0"]')
    }
    
    public get problemPresentOption1to3Year(){
        return $('[for$="option1"]')
    }
    
    public get problemPresentOption3to5Year(){
        return $('[for$="option2"]')
    }
    
    public get problemPresentOption5PlusYear(){
        return $('[for$="option3"]')
    }

    public get continueButton(){
        return $('//a[@class="btn-primary btn-sm text-uppercase"]')
    }

    public get EDStartQuestions(){
        return $('h5[data-aos="fade"]')
    }

    public get EDStartGradually(){
        return $('[for$="option0"]')
    }

    public get EDStartSuddenly(){
        return $('[for$="option1"]')
    }

    public get EDStartSuddenlywithOtherSymptoms(){
        return $('[for$="option2"]')
    }

    public get diagnosedWithAnyOfTheFollowing(){
        return $('h5[data-aos="fade"]')
    }

    public get noneOfTheAboveSelection() {
        // Have you been diagnosed with any of the following?
        return $("[for$='option2']")
    }

    public get medicationDailyQuestions(){
        return $('h5[data-aos="fade"]')
    }

    public get medicationYes(){
        return $('[for$="option0"]')
    }

    public get medicationNo(){
        return $('[for$="option1"]')
    }

    public get takeAnyMedicationsQuestions(){
        return $('h5[data-aos="fade"]')
    }

    public get noneOfTheAboveSelectionForMedications() {
        // Do you take any of these medications?
        return $("[for$='option4']")
    }

    public get haveYouHadAnyOfConditionsQuestions(){
        //Have you had or do you have any of these conditions?
        return $('h5[data-aos="fade"]')
    }

    public get shareWithDoctorAnyMedication(){
        return $('h5[data-aos="fade"]')
    }

    public get shareWithDoctorAnyMedicationTextBox() {
        // Please share with Dr. Linares any other medical conditions treated with medications:
        return $("[class$='form-input ']");
    }

    public get allergicToAnyMedications(){
        return $('h5[data-aos="fade"]')
    }

    public get past3MonthsUsedAnySubstancesQuestions(){
        return $('h5[data-aos="fade"]')
    }

    public get wakeUpWithErectionOptions(){
        return $('h5[data-aos="fade"]')
    }

    public get anyMedicationBeforeQuestions(){
        return $('h5[data-aos="fade"]')
    }

    public get sildenafilMedicationOption(){
        return $('label[for="option0"]')
    }

    public get tadalafilMedicationOption(){
        return $('label[for="option1"]')
    }

    public get noneOfTheAboveMedicationOption(){
        return $('label[for="option2"]')
    }

    public get dosageYouTakeOptions(){
        return $('h5[data-aos="fade"]')
    }

    public get twentyFiveMgOption(){
        return $('label[for="option0"]')
    }

    public get fiftyMgOption(){
        return $('label[for="option1"]')
    }

    public get hundredMgOption(){
        return $('label[for="option2"]')
    }

    public get medicationAgainQuestion(){
        return $('h5[data-aos="fade"]')
    }

    public get medicationAgainYes(){
        return $('label[for="option0"]')
    }

    public get medicationAgainNo(){
        return $('label[for="option1"]')
    }

    public get dosageStrengthFiftyMG(){
        return $('(//div[contains(@class,"ProductRecommendation_dosage-strength")]/ul/li)[1]')
    }

    public get dosageStrengthHundredMG(){
        return $('(//div[contains(@class,"ProductRecommendation_dosage-strength")]/ul/li)[2]')
    }






    
    

}

export default new iConsultEDSlidenafil()

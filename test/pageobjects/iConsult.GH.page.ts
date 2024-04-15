import Page from "./page.js";

class iConsultGenitalHerpesPage extends Page{

    // Have you been diagnosed with genital herpes by a doctor before?
    public get diagnosedWithGHBeforeQuestions(){
        return $('h5[data-aos="fade"]')
    }

    public get diagnosedWithGHBeforeYes(){
        return $('label[for="option0"]')
    }

    public get diagnosedWithGHBeforeNo(){
        return $('label[for="option1"]')
    }

    public get continueButton(){
        return $('//a[@class="btn-primary btn-sm text-uppercase"]')
    }

    //How long has this problem been present?
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

    /*
    Do you have any of these other medical conditions?
    */
    public get medicalConditionQuestions(){
        return $('h5[data-aos="fade"]')
    }
    
    public get noneOfTheseApplyMeOption(){
        return $('label[for="option5"]')
    }

    /*
    When you have an outbreak of genital herpes and you are not on medication, where are the herpes located? 
    Please select all that apply.
    */

    public get herpeslocationQuestion(){
        return $('h5[data-aos="fade"]')
    }

    public get noneOfTheAboveSelection(){
        return $("//label[@for='option5']")
    }

    /*
    When you are NOT taking medication, 
    do you have any symptoms including 
    pain, burning, tingling, or itching a few hours to a couple of days 
    before your genital herpes outbreak?
    */

    public get notTakingMedicineGHOutBreakQuestion(){
        return $('h5[data-aos="fade"]')
    }

    public get GHOutBreakNo(){
        return $('label[for="option1"]')
    }

    public get GHOutBreakYes(){
        return $('label[for="option0"]')
    }

    /*
    Are you taking any medication daily? Yes OR No
    */

    public get medicationDailyQuestions(){
        return $('h5[data-aos="fade"]')
    }
    
    public get medicationDailyNoAnswer(){
        return $('label[for="option1"]')
    }
    
    public get medicationDailyYesAnswer(){
        return $('label[for="option0"]')
    }

    /*
    Are you allergic to any type of medication? Yes OR No
    */

    public get allergicMedicationQuestions(){
        return $('h5[data-aos="fade"]')
    }
    
    public get allergicMedicationYesAnswer(){
        return $('label[for="option0"]')
    }
    
    public get allergicMedicationNoAnswer(){
        return $('label[for="option1"]')
    }

    /*
    Have you taken any of these medications in the past?
    */

    public get anyMedicationInPastQuestion(){
        return $('h5[data-aos="fade"]')
    }

    public get noneOfTheseMedicationAnswer(){
        return $("label[for='option2']")
    }

    //What is the reason you are asking for this prescription today?
    public get reasonForPrescriptionTodayQuestion(){
        return $('h5[data-aos="fade"]')
    }

    public get believeOutBreakRightNow(){
        return $('label[for="option2"]')
    }

    // When you are not on medicine how often do you have outbreaks:
    public get outBreaksQuestion(){
        return $('h5[data-aos="fade"]')
    }

    public get onceAYearOutBreak(){
        return $('label[for="option2"]')
    }







}

export default new iConsultGenitalHerpesPage()

import Page from "./page.js"

class ProfileCardPage extends Page{

    public get cardIframe(){
        return $("[name$='instamed']")
    }
    
    public get cardNumberInput(){
        return $('//input[@name="CreditCardNumber"]')
    }

    public get expirationDateInput(){
        return $('//input[@data-componentid="FormPatientPayment_ExpDate"]')
    }

    public get submitButton(){
        return $('//div[@data-componentid="FormPatientPayment_container"]/div/div[3]')
    }
    
    public async addCardDetails(cardNumber:string, expirationDate: string){
        await this.cardNumberInput.waitForClickable()
        await this.cardNumberInput.setValue(cardNumber)
        await this.expirationDateInput.waitForClickable()
        await this.expirationDateInput.setValue(expirationDate)
        await this.submitButton.waitForClickable()
        await this.submitButton.click()
    }

    public get cardAddMessage(){
        return $("//div[@class='Toastify__toast-container Toastify__toast-container--top-right']")
    }
}

export default new ProfileCardPage()

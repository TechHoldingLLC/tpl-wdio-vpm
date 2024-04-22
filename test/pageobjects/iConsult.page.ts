import Page from "./page.js"
import * as path from 'path'

class iConsult extends Page{

    public get startFreeiConsultbutton() {
        return $('#start-free-iconsult')
    }

    public get consentCheckbox() {
        return $('label[id$="termsAndConditions"]')
    }

    public get consentContinueButton(){
        return $('[class$="btn-primary btn-sm text-uppercase"]')
    }

    public get problemAddressQuestionsScreen(){
        return $('h5[data-aos="fade"]')
    }

    public get iConsultEDselection() {
        return $('[for$="question1"]')
    }

    public get iConsultPEselection() {
        return $('[for$="question2"]')
    }

    public get iConsultHLselection() {
        return $('[for$="question3"]')
    }

    public get iConsultGHselection() {
        return $('[for$="question4"]')
    }

    public get startNewiConsult() {
        return $('[class$="btn-secondary mw-100 mt-15"]')
    }

    public get resumeiConsult(){
        return $('//button[@class="btn-primary  mw-100 mt-10"]')
    }

    public get recommendationPills(){
        return $('h5[data-aos="fade"]')
    }
    
    public get pillName(){
        return $('//h5[@class="title"]')
    }
    
    public get productDescription(){
        return $('//h5[@class="title"]/parent::div/p')
    }
    
    public get productContinueButton(){
        return $('//div[contains(@class,"ProductRecommendation_product-detail")]/div[2]/div/button')
    }

    // Choose a subscription plan: Monthly/3 Months/6 Months
    public get subscriptionPlanOptions(){
        return $('h5[data-aos="fade"]')
    }
    
    public get subscriptionOneMonthOption(){
        return $('div[role="tabpanel"] li:nth-child(1)')
    }
    
    public get subscriptionThreeMonthOption(){
        return $('div[role="tabpanel"] li:nth-child(2)')
    }
    
    public get subscriptionSixMonthOption(){
        return $('div[role="tabpanel"] li:nth-child(3)')
    }

    public get subscriptionSixMonthOptionText(){
        return $('div[role="tabpanel"] li:nth-child(3) div[class="radio-detail"] div[class="radio-left-text"]')
    }

    public get subscriptionSixMonthOptionValue(){
        return $('div[role="tabpanel"] li:nth-child(3) div[class="radio-detail"] div[class="radio-right-text"] span:nth-child(2)')
    }
    
    public get subscriptionPlanContinueButton(){
        return $('//div[@class="subscription-plan-tab"]/following-sibling::div/a/button')
    }

    // In what state do you reside?
    public get stateResideOption(){
        return $('h5[data-aos="fade"]')
    }

    public get selectCountry() {
        return $('[class$="form-select"]')
    }

    public async stateSelection(stateName: string){
        if ((await this.selectCountry).isDisplayed) {
            await browser.pause(5000)
            await this.selectCountry.selectByVisibleText(stateName)
            await this.countryContinueBtn.click()
        }
    }

    public get countryContinueBtn() {
        return $('input[value="Continue"]')
    }

    // Choose Shipping Address
    public get shippingAddressOptions(){
        return $('h5[data-aos="fade"]')
    }

    public get addNewAddressButton() {
        return $('a[href="/en/addaddress"] button')
    }

    public get ship_fn_field() {
        return $('#firstName')
    }
    
    public get ship_ln_field() {
        return $('#lastName')
    }
    
    public get ship_address_field() {
        return $('#addressLine1')
    }
    
    public get ship_apt_field() {
        return $('#addressLine2')
    }
    
    public get ship_pin_field() {
        return $('#pincode')
    }
    
    public get ship_suggestion_field() {
        return $('[class$="suggestion-active"]')
    }
    
    public get ship_continue_btn() {
        return $('[type$="submit"]')
    }
    
    public get ship_select_address() {
        return $('//h5[@data-aos="fade"]//ancestor::div/li')
    }
    
    public get ship_save_btn() {
        return $('input[type="submit"]')
    }

    public async addNewShippingAddress(){
        await this.ship_fn_field.setValue("WebDriverIO")
        await this.ship_ln_field.setValue("Automation")
        await this.ship_address_field.setValue("Test Street Address")
        await this.ship_apt_field.setValue("Test Apartment Name")
        await this.ship_pin_field.setValue("90035")
        await this.ship_suggestion_field.waitForDisplayed()
        await this.ship_suggestion_field.click()
        await browser.pause(1500)
        await this.ship_continue_btn.click()
        await this.ship_select_address.click()
        await browser.pause(1500)
        await this.ship_save_btn.scrollIntoView()
        await this.ship_save_btn.click()
        await browser.pause(2000)
    }

    // Upload or take a photo of your ID
    public get uploadPhotoIDScreen(){
        return $('h5[data-aos="fade"]')
    }

    public get uploadSaveAndContinueButton(){
        return $('button[type="submit"]')
    }

    public async uploadPhoto(filePath:string){
        const fileInput = await browser.$('[type$="file"]')
        const file = path.join(process.cwd(), filePath)
        await fileInput.addValue(file)
        await browser.pause(5000)
        await this.uploadSaveAndContinueButton.click()
    }

    public get uploadOrTakePhotoScreen(){
        return $('h5[data-aos="fade"]')
    }

    public get iConsultPage(){
        return $('//h5[contains(@class, "title")]')
    }

    public get productName(){
        return $('//div[contains(@class, "Summary_cart-item")]/div/h4')
    }
    
    public get productSubscriptionPlan(){
        return $('//div[contains(@class, "Summary_cart-summary")]/div/span[2]')
    }

    public get productSubscriptionPrice(){
        return $('//div[contains(@class,"Summary_total-pay")]/div/span[contains(@class, "Summary_total-main-price")]')
    }
    
    public get addNewCard(){
        return $('//div[contains(@class,"Summary_card-number")]/a')
    }
    
    public get cardSelection(){
        return $('//div[contains(@class,"Subscriptions_cards-derails")]/div[1]')
    }

    public get submitOrder() {
        return $('a[href*="/iconsult/summary#"]')
    }
    
    public get iConsultCompletionScreen(){
        return $('h5[data-aos="fade"]')
    }

    public get viewOrderDetailsButton() {
        return $("//a[contains(@href,'iconsult/complete')]")
    }
    
    public get orderDetailsScreen(){
        return $('//div[@class="page-title"]/div/div/h2/div')
    }
    
    public get orderListTab(){
        return $('//div[contains(@class, "MyOrder_order-list")]')
    }

    public get fetchOrderId() {
        return $('//span[contains(@class,"MyOrder_order-id")]')
    }
    
    public async getOrderID(){
        const orderInformation: string = await this.fetchOrderId.getText()
        const orderId = await orderInformation.split(":")[1].trim()
        console.log(`Order ID is: ${orderId}`)
        await browser.pause(2000)
        return orderId
    }

    public get orderDetailProductName(){
        return $('//div[contains(@class,"MyOrder_title")]/h4')
    }
    
    public get orderDetailsProductSubscriptionPlan(){
        return $("//div[contains(@class, 'MyOrder_cart-summary')]/div[contains(@class, 'MyOrder_title-item-price')]/span[contains(@class,'MyOrder_badge-month')]")
    }

    public get orderDetailsProductTotalPrice(){
        return $("//div[contains(@class,'text-right MyOrder_total-price')]/span[contains(@class,'MyOrder_total-main-price')]")
    }

    public async getLanguageFromUrl(url: string): Promise<string> {
        return url.includes('/en/') ? 'en' : 'es';
    }

    public async getOrderInformation(): Promise<{
        productName: string;
        subscriptionPlan: string;
        totalPrice: string;
    }> {
        const productName: string = await this.orderDetailProductName.getText();
        const subscriptionPlan: string = await this.orderDetailsProductSubscriptionPlan.getText();
        const totalPrice: string = await this.orderDetailsProductTotalPrice.getText();
    
        console.log(`Order Product Name is: "${productName}"`);
        console.log(`Order Details: Product Subscription Plan is: "${subscriptionPlan}"`);
        console.log(`Order Details: Product Total Price is: "${totalPrice}"`);
    
        return {
            productName,
            subscriptionPlan,
            totalPrice
        };
    }
}

export default new iConsult()

import Page from "./page.js";
import iConsult from "./iConsult.page.js";

class promoCode extends Page {

// Locators for promo code

  public get promoCodeInputBox() {
    return $('//input[@type="text"]');
  }
  
  public get applyCouponCodeButton() {
    return $('//button[contains(@class,"Summary_promo-apply-button")]');
  }

  public get validationMessage() {
    return $('//span[contains(@class,"Summary_promo-message")]');
  }

  public get discountApplied() {
    return $('//span[contains(text(),"-$")]');
  }

  public get subtotalPrice() {
    return $('//span[contains(@class,"Summary_total-main-price")]');
  }

  // Valid PromoCode
  public async applyPromoCode(language: string, productSubscriptionPrice: string): Promise<string> {

    

    await iConsult.iConsultPage.scrollIntoView();
    await browser.pause(2000);
    await this.promoCodeInputBox.setValue("VIP10");
    await browser.pause(2000);
    await this.applyCouponCodeButton.click();
    browser.pause(2000);

    //Verify the promo code validation
    console.log(await this.validationMessage.getText());
  
    language === "en"
      ? expect(await this.validationMessage.getText()).toContain("Promo Applied Successfully!")
      : expect(await this.validationMessage.getText()).toContain("¡Código aplicado con éxito!");
        
    //Verify the discounted price
      const originalPrice = parseInt(await productSubscriptionPrice.replace(/[^\d.]/g, ""));
      console.log("Original Price: ",originalPrice);
      const appliedDiscount = parseInt(await this.discountApplied.getText().then((text) => text.replace(/[^\d.]/g, "").replace(/\.00$/, "")));
      console.log("Discount Applied: ",appliedDiscount);
  
      const discountedPrice = originalPrice - appliedDiscount;
      console.log("Discounted Price: ",discountedPrice);

      const totalPrice = await this.subtotalPrice.getText().then((text) => text.replace(/[^\d.]/g, ""))
      expect(discountedPrice).toEqual(parseInt(totalPrice));

      return totalPrice;
  }
}
export default new promoCode();

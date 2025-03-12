import Page from "./page.js";
import iConsult from "./iConsult.page.js";
import fs from "fs";

class PromoCode extends Page {
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

  public get iConsultSummaryTotalPrice() {
    return $('//span[contains(@class,"Summary_total-main-price")]');
  }

  public get alertToast() {
    return $(
      '//div[@class="Toastify__toast Toastify__toast-theme--colored Toastify__toast--error Toastify__toast--close-on-click"]'
    );
  }

  // Valid PromoCode
  public async applyValidPromoCode(
    language: string,
    productSubscriptionPrice: string
  ): Promise<string> {
    // Load promo codes from JSON
    const promoCodes = JSON.parse(
      fs.readFileSync("./test/data/promoCodeData.json", "utf-8")
    );

    const validPromoCode: string = "VIP10";
    await iConsult.iConsultPage.scrollIntoView();
    await this.promoCodeInputBox.waitForDisplayed();
    await this.promoCodeInputBox.setValue(validPromoCode);
    await this.applyCouponCodeButton.click();

    //Apply Promo Code
    await this.validationMessage.waitForDisplayed();
    console.log(await this.validationMessage.getText());

    // Verify the promo code validation
    const validationText = await this.validationMessage.getText();
    const expectedMessage =
      language === "en"
        ? "Promo Applied Successfully!"
        : "¡Código aplicado con éxito!";
    expect(validationText).toContain(expectedMessage);

    // Parse Prices and verify the applied discount
    const originalPrice = parseFloat(
      await productSubscriptionPrice.replace(/[^\d.]/g, "")
    );
    console.log("Original Price: ", originalPrice);
    const appliedDiscount = parseFloat(
      await this.discountApplied
        .getText()
        .then((text) => text.replace(/[^\d.]/g, "").replace(/\.00$/, ""))
    );
    console.log("Discount Applied: ", appliedDiscount);

    const discountedPrice = originalPrice - appliedDiscount;
    console.log("Discounted Price: ", discountedPrice);

    const totalDiscountedPrice = await this.iConsultSummaryTotalPrice
      .getText()
      .then((text) => text.replace(/[^\d.]/g, ""));
    expect(discountedPrice).toEqual(parseFloat(totalDiscountedPrice));

    // Validate Promo Code matches with the JSON
    const expectedDiscount = promoCodes[validPromoCode];
    expect(appliedDiscount).toEqual(expectedDiscount);

    return totalDiscountedPrice;
  }

  // Invalid Promo Code
  public async applyInvalidPromoCode(language: string): Promise<void> {
    const invalidPromoCode: string = "INVALID";
    await iConsult.iConsultPage.scrollIntoView();
    await this.promoCodeInputBox.waitForDisplayed();
    await this.promoCodeInputBox.setValue(invalidPromoCode);
    await this.applyCouponCodeButton.click();

    //Apply Promo Code
    await this.validationMessage.waitForDisplayed();
    console.log(await this.validationMessage.getText());

    // Verify the promo code validation message
    const validationText = await this.validationMessage.getText();
    const expectedMessage =
      language === "en"
        ? "Promo Is Not Valid."
        : "Código promocional inválido.";
    expect(validationText).toContain(expectedMessage);
  }

  // Empty Promo Code
  public async applyEmptyPromoCode(language: string): Promise<void> {
    await iConsult.iConsultPage.scrollIntoView();
    await this.promoCodeInputBox.waitForDisplayed();
    await this.promoCodeInputBox.setValue("");
    await this.applyCouponCodeButton.click();

    // Verify the promo code validation message
    await this.alertToast.waitForDisplayed();
    console.log(await this.alertToast.getText());
    const validationText = await this.alertToast.getText();
    const expectedMessage =
      language === "en"
        ? "Please enter a promo code."
        : "Por favor, ingrese un código promocional.";
    expect(validationText).toContain(expectedMessage);
  }
}
export default new PromoCode();

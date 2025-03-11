import Page from "./page.js";
import iConsult from "./iConsult.page.js";

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

  // Valid PromoCode
  public async applyValidPromoCode(
    language: string,
    productSubscriptionPrice: string
  ): Promise<string> {
    const validPromoCode: string = "VIP10";
    await iConsult.iConsultPage.scrollIntoView();
    await this.promoCodeInputBox.waitForDisplayed();
    await this.promoCodeInputBox.setValue(validPromoCode);
    await this.applyCouponCodeButton.click();

    //Verify the promo code validation
    await this.validationMessage.waitForDisplayed();
    console.log(await this.validationMessage.getText());

    const validationText = await this.validationMessage.getText();

    // Verify the promo code validation message
    const expectedMessage =
      language === "en"
        ? "Promo Applied Successfully!"
        : "¡Código aplicado con éxito!";

    expect(validationText).toContain(expectedMessage);

    // Parse Prices
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

    return totalDiscountedPrice;
  }
}
export default new PromoCode();

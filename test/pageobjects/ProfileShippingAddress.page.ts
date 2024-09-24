import { $ } from "@wdio/globals";
import Page from "./page.js";
import * as fs from "fs";

class ProfileShippingAddress extends Page {
  /**
   * @description Gets the profile shipping address link element.
   * @returns {WebdriverIO.Element} The link element for navigating to the shipping address page.
   */
  public get profile_shippingAddress() {
    return $("//a[contains(@href, '/shippingaddress')]");
  }

  /**
   * @description Gets the title element on the shipping address page.
   * @returns {WebdriverIO.Element} The shipping address title element.
   */
  public get ship_title() {
    return $("[class*='d-none d-md-block']");
  }

  /**
   * @description Gets the add new shipping address button.
   * @returns {WebdriverIO.Element} The button for adding a new shipping address.
   */
  public get ship_addBtn() {
    return $(
      "//a[@class='btn-primary btn-xs mw-auto ShippingAddress_btn-add-title__F7LHg']"
    );
  }

  /**
   * @description Gets the input field for the first name on the shipping address form.
   * @returns {WebdriverIO.Element} The input field for the first name.
   */
  public get ship_fn_field() {
    return $("#firstName");
  }

  /**
   * @description Gets the input field for the last name on the shipping address form.
   * @returns {WebdriverIO.Element} The input field for the last name.
   */
  public get ship_ln_field() {
    return $("#lastName");
  }

  /**
   * @description Gets the input field for the street address on the shipping form.
   * @returns {WebdriverIO.Element} The input field for the street address.
   */
  public get ship_street_field() {
    return $("#addressLine1");
  }

  /**
   * @description Gets the active suggestion for the street address.
   * @returns {WebdriverIO.Element} The active suggestion for the street address.
   */
  public get ship_street_suggestion() {
    return $(".suggestion-active");
  }

  /**
   * @description Gets the input field for apartment or suite number on the shipping form.
   * @returns {WebdriverIO.Element} The input field for apartment or suite.
   */
  public get ship_apt_field() {
    return $("#addressLine2");
  }

  /**
   * @description Gets the input field for the postal code on the shipping form.
   * @returns {WebdriverIO.Element} The input field for the postal code.
   */
  public get ship_pin_field() {
    return $("#pincode");
  }

  /**
   * @description Gets the active suggestion for the postal code.
   * @returns {WebdriverIO.Element} The active suggestion for the postal code.
   */
  public get ship_suggestion_field() {
    return $("//li[@class='suggestion-active']");
  }

  /**
   * @description Gets the save address button on the shipping form.
   * @returns {WebdriverIO.Element} The save address button.
   */
  public get ship_save_address_btn() {
    return $(
      "//div[contains(@class,'row-custom ShippingAddress_btn-group')]/div[2]/button"
    );
  }

  /**
   * @description Gets the success toast message element after saving the shipping address.
   * @returns {WebdriverIO.Element} The success toast message element.
   */
  public get ship_success_toast_message() {
    return $(
      "[class*=Toastify__toast-body] div:nth-child(2) div"
    ).waitForDisplayed({ timeout: 6000 });
  }

  /**
   * @description Adds a new shipping address using data from a JSON file.
   * @returns {Promise<void>} A promise that resolves after the shipping address is added.
   */
  public async addShippingAddress(): Promise<void> {
    const shippingData = JSON.parse(
      fs.readFileSync("./test/data/profileShippingData.json", "utf-8")
    );

    await this.profile_shippingAddress.click();
    await browser.pause(5000);

    await this.ship_addBtn.click();
    await browser.pause(2000);

    await this.ship_fn_field.setValue(shippingData.shipping_firstname);
    await this.ship_ln_field.setValue(shippingData.shipping_lastname);
    await browser.pause(5000);

    await this.ship_pin_field.setValue(shippingData.shipping_zipcode);
    await browser.pause(5000);

    await this.ship_suggestion_field.click();
    await browser.pause(8000);

    await this.ship_street_field.setValue(shippingData.shipping_street);
    await browser.pause(8000);

    await this.ship_street_suggestion.click();
    await browser.pause(5000);

    await this.ship_save_address_btn.click();
    await browser.pause(2000);
  }

  /**
   * @description Determines the language based on the URL.
   * @param {string} url - The URL to check.
   * @returns {Promise<string>} A promise that resolves to either "en" for English or "es" for Spanish.
   */
  public async getLanguageFromUrl(url: string): Promise<string> {
    return url.includes("/en/") ? "en" : "es";
  }
}

export default new ProfileShippingAddress();

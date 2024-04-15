import { $ } from "@wdio/globals";
import Page from "./page";
import shippingData from "../data/profile_shipping.json";

class profile_shipping extends Page {
  public get profile_shippingAddress() {
    return $("[href$='/en/shippingaddress']");
  }
  public get ship_title() {
    return $("[class*='d-none d-md-block']");
  }
  public get ship_addBtn() {
    return $(
      "[class*='btn-primary btn-xs mw-auto ShippingAddress_btn-add-title__F7LHg']"
    );
  }

  public get ship_fn_field() {
    return $("#firstName");
  }

  public get ship_ln_field() {
    return $("#lastName");
  }

  public get ship_street_field() {
    return $("#addressLine1");
  }
  public get ship_apt_field() {
    return $("#addressLine2");
  }

  public get ship_pin_field() {
    return $("#pincode");
  }
  public get ship_suggestion_field() {
    return $("li[class*='suggestion-active']");
  }

  public get ship_save_address_btn() {
    return $("//button[normalize-space()='Save Address']");
  }

  public get ship_success_toast_message() {
    return $("[class*=Toastify__toast-body]");
  }

  public async addShippingAddress() {
    await this.profile_shippingAddress.click();
    await browser.pause(2000);
    await this.ship_addBtn.click();
    await browser.pause(2000);
    await this.ship_fn_field.setValue(shippingData.shipping_firstname);
    await this.ship_ln_field.setValue(shippingData.shipping_lastname);
    await this.ship_street_field.setValue(shippingData.shipping_street);
    await this.ship_apt_field.setValue(shippingData.shipping_apartmentName);
    await this.ship_pin_field.setValue(shippingData.shipping_zipcode);
    await browser.pause(5000);
    await this.ship_suggestion_field.click();
    await browser.pause(5000);
    await this.ship_save_address_btn.click();
    await browser.pause(2000);
  }
}

export default new profile_shipping();

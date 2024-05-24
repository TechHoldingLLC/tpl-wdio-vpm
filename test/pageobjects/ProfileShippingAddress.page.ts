import { $ } from "@wdio/globals";
import Page from "./page.js";
import * as fs from "fs";

class ProfileShippingAddress extends Page {
  public get profile_shippingAddress() {
    return $("//a[contains(@href, '/shippingaddress')]");
  }

  public get ship_title() {
    return $("[class*='d-none d-md-block']");
  }

  public get ship_addBtn() {
    return $(
      "//a[@class='btn-primary btn-xs mw-auto ShippingAddress_btn-add-title__F7LHg']"
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
    return $("//li[@class='suggestion-active']");
  }

  public get ship_save_address_btn() {
    return $(
      "//div[contains(@class,'row-custom ShippingAddress_btn-group')]/div[2]/button"
    );
  }

  public get ship_success_toast_message() {
    return $("[class*=Toastify__toast-body] div:nth-child(2) div");
  }

  public async addShippingAddress() {
    const shippingData = JSON.parse(
      fs.readFileSync("./test/data/profile_shipping.json", "utf-8")
    );
    await this.profile_shippingAddress.click();
    await browser.pause(5000);
    await this.ship_addBtn.click();
    await browser.pause(2000);
    await this.ship_fn_field.setValue(shippingData.shipping_firstname);
    await this.ship_ln_field.setValue(shippingData.shipping_lastname);
    await this.ship_street_field.setValue(shippingData.shipping_street);
    // await this.ship_apt_field.setValue(shippingData.shipping_apartmentName);
    // await this.ship_pin_field.setValue(shippingData.shipping_zipcode);
    await browser.pause(5000);
    await this.ship_suggestion_field.click();
    await browser.pause(5000);
    await this.ship_save_address_btn.click();
    await browser.pause(2000);
  }

  public async getLanguageFromUrl(url: string): Promise<string> {
    return url.includes("/en/") ? "en" : "es";
  }
}

export default new ProfileShippingAddress();

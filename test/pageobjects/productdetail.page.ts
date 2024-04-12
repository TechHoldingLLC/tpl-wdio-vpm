import { $ } from "@wdio/globals";
import Page from "./page";

class ProductDetail extends Page {
  public randomProduct = (ProductName: string) => {
    return $(`[href$='/en/products/'${ProductName}']`);
  };

  public get productDropdown() {
    return $('[class$="Header_nav-link__lThrF"]');
  }

  public get languageDropdown() {
    return $(".Header_lang-item__zDx_0");
  }

  public get spanishSelection() {
    return $('[href="/en/products/Semaglutide#"]');
  }
  public get tadalafilProduct() {
    return $("[href$='/en/products/Tadalafil']");
  }

  public get sildenafilProduct() {
    return $("[href$='/en/products/Sildenafil']");
  }

  public get paroxetineProduct() {
    return $("[href$='/en/products/Paroxetine']");
  }

  public get finasterideProduct() {
    return $("[href$='/en/products/Finasteride']");
  }

  public get acyclovirProduct() {
    return $("[href$='/en/products/Acyclovir']");
  }

  public get productTitle() {
    return $("h1");
  }

  public get productfaq() {
    return $("h3");
  }

  public get wlfirstname() {
    return $("#firstName");
  }
  public get wllastname() {
    return $("#lastName");
  }
  public get wlmobilenum() {
    return $("#phone");
  }
  public get wlemail() {
    return $("#email");
  }
  public get wlcheckbox() {
    return $("label[for='termsAndConditions']");
  }

  public get btnSubmit() {
    return $('[type$="submit"]');
  }

  public get wlsuccessmessage() {
    return $(
      "[class$='Toastify__toast Toastify__toast-theme--colored Toastify__toast--success Toastify__toast--close-on-click']"
    );
  }

  async submitSemaglutideform(
    wl_firstname: string,
    wl_lastname: string,
    wl_cellnum: number
  ) {
    await this.wlfirstname.setValue(wl_firstname);
    await this.wllastname.setValue(wl_lastname);
    await this.wlmobilenum.setValue(wl_cellnum);
    await this.wlemail.setValue(
      `wdio_auto${Math.floor(Math.random() * 1e9)}@gmail.com`
    );
    await browser.pause(3000);
    await this.wlcheckbox.click();
    await browser.pause(3000);
    await this.btnSubmit.click();
  }

  public openHomepage(Product: string) {
    return super.open(`/en/products/${Product}`);
  }
}

export default new ProductDetail();

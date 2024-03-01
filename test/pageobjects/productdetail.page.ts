import { $ } from "@wdio/globals";
import Page from "./page";

class ProductDetail extends Page {
  public randomProduct = (ProductName: string) => {
    return $(`[href$='/en/products/'${ProductName}']`);
  };

  public get productDropdown() {
    return $('[class$="Header_nav-link__lThrF"]');
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
    return $("[for$='termsAndConditions']");
  }

  public get btnSubmit() {
    return $('[type$="submit"]');
  }

  public get wlsuccessmessage() {
    return $(
      "[class$='Toastify__toast Toastify__toast-theme--colored Toastify__toast--success Toastify__toast--close-on-click']"
    );
  }

  //   public async productSelection() {
  //     await this.productDropdown.click();
  //     await this.tadalafilProduct.click();
  //   }

  async submitSemaglutideform(
    wl_firstname: string,
    wl_lastname: string,
    wl_cellnum: number,
    wl_email: string
  ) {
    await this.wlfirstname.setValue(wl_firstname);
    await this.wllastname.setValue(wl_lastname);
    await this.wlmobilenum.setValue(wl_cellnum);
    await this.wlemail.setValue(wl_email);
    await this.wlcheckbox.click();
    await browser.pause(3000);
    await this.btnSubmit.click();
  }

  public openHomepage(Product: string) {
    return super.open(`/en/products/${Product}`);
  }
}

export default new ProductDetail();

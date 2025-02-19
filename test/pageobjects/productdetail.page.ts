import { $ } from "@wdio/globals";
import Page from "./page.js";

class ProductDetail extends Page {
  /**
   * Returns a product element based on the provided product name.
   * @param {string} ProductName - The name of the product.
   * @returns {WebdriverIO.Element} - The product element.
   */
  public randomProduct = (ProductName: string) => {
    return $(`[href$='/en/products/'${ProductName}']`);
  };

  /**
   * Selectors for various UI elements on the product detail page.
   */
  public get productDropdown() {
    return $("span[class='Header_nav-link__lThrF']");
  }

  public get pageTitle() {
    return $("/html/head/title");
  }

  public get productTadalafil() {
    return $(
      "body > div:nth-child(2) > nav:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(1) > ul:nth-child(2) > li:nth-child(1) > a:nth-child(1)"
    );
  }

  public get productSildenafil() {
    return $(
      "body > div:nth-child(2) > nav:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(1) > ul:nth-child(2) > li:nth-child(2) > a:nth-child(1)"
    );
  }

  public get productParoxetine() {
    return $(
      "body > div:nth-child(2) > nav:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(1) > ul:nth-child(2) > li:nth-child(3) > a:nth-child(1)"
    );
  }

  public get productFinasteride() {
    return $(
      "body > div:nth-child(2) > nav:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(1) > ul:nth-child(2) > li:nth-child(4) > a:nth-child(1)"
    );
  }

  public get productAcyclovir() {
    return $(
      "body > div:nth-child(2) > nav:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(1) > ul:nth-child(2) > li:nth-child(5) > a:nth-child(1)"
    );
  }

  public get productSemaglutide() {
    return $(
      "body > div:nth-child(2) > nav:nth-child(1) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(1) > ul:nth-child(2) > li:nth-child(6) > a:nth-child(1)"
    );
  }

  /**
   * Language selection elements
   */
  public get languageDropdown() {
    return $(".Header_lang-item__zDx_0");
  }

  public get spanishSelection() {
    return $('[href="/en/products/Semaglutide#"]');
  }

  /**
   * Product elements based on product type.
   */
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

  /**
   * Generic UI elements for product details.
   */
  public get productTitle() {
    return $("h1");
  }

  public get productName() {
    return $(
      "//div[contains(@class,'ProductDetail_product-detail-banner-content')]/h1"
    );
  }

  public get productfaq() {
    return $("h3");
  }

  /**
   * Form elements for submitting details on the Semaglutide product page.
   */
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
    return $("//span[contains(@class,'ProductDetail_and-text')]");
  }

  public get wlconsentcheckbox() {
    return $("//label[@for='consentSMS']");
  }

  public get btnSubmit() {
    return $('[type$="submit"]');
  }

  public get wlsuccessmessage() {
    return $(
      "[class$='Toastify__toast Toastify__toast-theme--colored Toastify__toast--success Toastify__toast--close-on-click']"
    );
  }

  /**
   * Fills out and submits the Semaglutide form with given user details.
   *
   * @param {string} wl_firstname - First name.
   * @param {string} wl_lastname - Last name.
   * @param {number} wl_cellnum - Mobile number.
   */
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

    await browser.pause(2000);
    await this.wlcheckbox.doubleClick();
    await this.wlconsentcheckbox.doubleClick();
    await this.btnSubmit.click();
  }

  /**
   * Product description and details elements.
   */
  public get productDescription() {
    return $("//div[contains(@class,'ProductDetail_product-detail')]/p");
  }

  public get productDetails() {
    return $$("//div[contains(@class,'ProductDetail_accordion-wrapper')]");
  }

  /**
   * Fetch and display product information from the accordion content.
   */
  public async productInfo() {
    const productDetails = await browser.$$(
      "//div[contains(@class,'ProductDetail_accordion-wrapper')]"
    );
    for await (const [index, collapseOption] of productDetails.entries()) {
      await collapseOption.click();
      await browser.scroll(0, 100);
      const textArray = await collapseOption.$$(
        "//div[contains(@class,'ProductDetail_accordion-content-contentfull')]"
      );
      await browser.pause(2500);
      let productDetailsText = await textArray[index].getText();
      console.log("Text is: " + productDetailsText);
      if (productDetailsText.trim() === "") {
        return false;
      }
    }
    return true;
  }

  /**
   * Elements and methods related to FAQs.
   */
  public get edFAQs() {
    return $$("//div[@class='accordion-item']");
  }

  public get edFAQsAnswers() {
    return $$("//div[@class='answer-content']");
  }

  public async FAQsInfo() {
    const faqSection = browser.$("//h3");
    await faqSection.scrollIntoView();
    const FAQs = await browser.$$("//div[@class='accordion-item']");
    for (let i = 0; i < FAQs.length; i++) {
      const collapse = FAQs[i];
      await collapse.click();
      await browser.pause(2000);
      await browser.scroll(0, 100);
      const text = await $$("//div[@class='answer-content ']/p[1]");
      if (text.length === 0) {
        console.error(`No text found for FAQ ${i + 1}`);
        return false;
      }
      let faqText = await text[i].getText();
      console.log("Text is: " + faqText);
      if (faqText.trim() === "") {
        return false;
      }
    }
    return true;
  }
  /**
   * Validation elements on the Semaglutide form.
   */
  public get validationFnameOnSemaglutideForm() {
    return $(
      "(//div[contains(@class,'postal-code-error TextError_errorText')])[1]"
    );
  }

  public get validationLnameOnSemaglutideForm() {
    return $(
      "(//div[contains(@class,'postal-code-error TextError_errorText')])[2]"
    );
  }

  public get validationMobileOnSemaglutideForm() {
    return $(
      "(//div[contains(@class,'postal-code-error TextError_errorText')])[3]"
    );
  }

  public get validationEmailOnSemaglutideForm() {
    return $(
      "(//div[contains(@class,'postal-code-error TextError_errorText')])[4]"
    );
  }
}

export default new ProductDetail();

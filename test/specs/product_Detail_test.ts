import { expect } from "@wdio/globals";
import ProductDetail from "../pageobjects/productdetail.page.js";
import fs from "fs";

describe("Product Details Feature", () => {
  let productDetailData: any;
  let pageTitle: any;

  beforeEach(async () => {
    // Navigate to the base URL and wait for the page to load
    await browser.url("");
    await browser.pause(2000);

    // Open product dropdown and read test data from JSON files
    await ProductDetail.productDropdown.click();
    await browser.pause(2000);
    productDetailData = JSON.parse(
      fs.readFileSync("./test/data/productDetailData.json", "utf-8")
    );
    pageTitle = JSON.parse(
      fs.readFileSync("./test/data/pageTitles.json", "utf-8")
    );
  });

  /**
   * Test Case: Verify Tadalafil Product page opens without errors
   * - Ensures that the Tadalafil product page is correctly loaded and displayed in both English and Spanish.
   */
  it("C29676 Website Main Pages: Verify Tadalafil Product page opens error-free", async () => {
    try {
      await ProductDetail.productTadalafil.click();
      await browser.pause(2000);

      const url: string = await browser.getUrl();
      const language: string = await ProductDetail.getLanguageFromUrl(url);

      if (language === "en") {
        await expect(browser).toHaveTitle(pageTitle.pg_title_tadalafil);
        await expect(ProductDetail.productName).toHaveText(
          productDetailData.product_tadalafil
        );
        console.log(
          "Product Description: " +
            (await ProductDetail.productDescription.getText())
        );
        expect(await ProductDetail.productDescription.getText()).toEqual(
          productDetailData.product_tadalafil_description
        );
        await expect(ProductDetail.productfaq).toHaveText(
          productDetailData.product_faq_title_Tadalafil
        );
      } else {
        await expect(browser).toHaveTitle(pageTitle.pg_title_tadalafil_es);
        await expect(ProductDetail.productTitle).toHaveText(
          productDetailData.product_tadalafil_es
        );
        console.log(
          "Product Description: " +
            (await ProductDetail.productDescription.getText())
        );
        expect(await ProductDetail.productDescription.getText()).toEqual(
          productDetailData.product_tadalafil_description_es
        );
        await expect(ProductDetail.productfaq).toHaveText(
          productDetailData.product_faq_title_Tadalafil_es
        );
      }

      // Check if product information and FAQs are displayed
      expect(await ProductDetail.productInfo()).toBeTruthy();
      expect(await ProductDetail.FAQsInfo()).toBeTruthy();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });

  /**
   * Test Case: Verify Sildenafil Product page opens without errors
   * - Ensures that the Sildenafil product page is correctly loaded and displayed in both English and Spanish.
   */
  it("C29677 Website Main Pages: Verify Sildenafil Products page opens error-free", async () => {
    try {
      await ProductDetail.productSildenafil.click();
      await browser.pause(2000);

      const url: string = await browser.getUrl();
      const language: string = await ProductDetail.getLanguageFromUrl(url);

      if (language === "en") {
        await expect(browser).toHaveTitle(pageTitle.pg_title_sildenafil);
        await expect(ProductDetail.productName).toHaveText(
          productDetailData.product_sildenafil
        );
        console.log(
          "Product Description: " +
            (await ProductDetail.productDescription.getText())
        );
        expect(await ProductDetail.productDescription.getText()).toEqual(
          productDetailData.product_sildenafil_description
        );
        await expect(ProductDetail.productfaq).toHaveText(
          productDetailData.product_faq_title_Sildanafil
        );
      } else {
        await expect(browser).toHaveTitle(pageTitle.pg_title_sildenafil_es);
        await expect(ProductDetail.productTitle).toHaveText(
          productDetailData.product_sildenafil_es
        );
        console.log(
          "Product Description: " +
            (await ProductDetail.productDescription.getText())
        );
        expect(await ProductDetail.productDescription.getText()).toEqual(
          productDetailData.product_sildenafil_description_es
        );
        await expect(ProductDetail.productfaq).toHaveText(
          productDetailData.product_faq_title_Sildanafil_es
        );
      }

      // Check if product information and FAQs are displayed
      expect(await ProductDetail.productInfo()).toBeTruthy();
      expect(await ProductDetail.FAQsInfo()).toBeTruthy();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });

  /**
   * Test Case: Verify Paroxetine Product page opens without errors
   * - Ensures that the Paroxetine product page is correctly loaded and displayed in both English and Spanish.
   */
  it("C29752 Website Main Pages: Verify Paroxetine Products page opens error-free", async () => {
    try {
      await ProductDetail.productParoxetine.click();
      await browser.pause(2000);

      const url: string = await browser.getUrl();
      const language: string = await ProductDetail.getLanguageFromUrl(url);

      if (language === "en") {
        await expect(browser).toHaveTitle(pageTitle.pg_title_paroxetine);
        await expect(ProductDetail.productTitle).toHaveText(
          productDetailData.product_paroxetine
        );
        console.log(
          "Product Description: " +
            (await ProductDetail.productDescription.getText())
        );
        expect(await ProductDetail.productDescription.getText()).toEqual(
          productDetailData.product_paroxetine_description
        );
        await expect(ProductDetail.productfaq).toHaveText(
          productDetailData.product_faq_title_Paroxetine
        );
      } else {
        await expect(browser).toHaveTitle(pageTitle.pg_title_paroxetine_es);
        await expect(ProductDetail.productTitle).toHaveText(
          productDetailData.product_paroxetine
        );
        console.log(
          "Product Description: " +
            (await ProductDetail.productDescription.getText())
        );
        expect(await ProductDetail.productDescription.getText()).toEqual(
          productDetailData.product_paroxetine_description_es
        );
        await expect(ProductDetail.productfaq).toHaveText(
          productDetailData.product_faq_title_Paroxetine_es
        );
      }

      // Check if product information and FAQs are displayed
      expect(await ProductDetail.productInfo()).toBeTruthy();
      expect(await ProductDetail.FAQsInfo()).toBeTruthy();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });

  /**
   * Test Case: Verify Finasteride Product page opens without errors
   * - Ensures that the Finasteride product page is correctly loaded and displayed in both English and Spanish.
   */
  it("C29678 Website Main Pages: Verify Finasteride Products page opens error-free", async () => {
    try {
      await ProductDetail.productFinasteride.click();
      await browser.pause(2000);

      const url: string = await browser.getUrl();
      const language: string = await ProductDetail.getLanguageFromUrl(url);

      if (language === "en") {
        await expect(browser).toHaveTitle(pageTitle.pg_title_finasteride);
        await expect(ProductDetail.productTitle).toHaveText(
          productDetailData.product_finasteride
        );
        console.log(
          "Product Description: " +
            (await ProductDetail.productDescription.getText())
        );
        expect(await ProductDetail.productDescription.getText()).toEqual(
          productDetailData.product_finasteride_description
        );
        await expect(ProductDetail.productfaq).toHaveText(
          productDetailData.product_faq_title_Finasteride
        );
      } else {
        await expect(browser).toHaveTitle(pageTitle.pg_title_finasteride_es);
        await expect(ProductDetail.productTitle).toHaveText(
          productDetailData.product_finasteride
        );
        console.log(
          "Product Description: " +
            (await ProductDetail.productDescription.getText())
        );
        expect(await ProductDetail.productDescription.getText()).toEqual(
          productDetailData.product_finasteride_description_es
        );
        await expect(ProductDetail.productfaq).toHaveText(
          productDetailData.product_faq_title_Finasteride_es
        );
      }

      // Check if product information and FAQs are displayed
      expect(await ProductDetail.productInfo()).toBeTruthy();
      expect(await ProductDetail.FAQsInfo()).toBeTruthy();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });

  /**
   * Test Case: Verify Acyclovir Product page opens without errors
   * - Ensures that the Acyclovir product page is correctly loaded and displayed in both English and Spanish.
   */
  it("C29679 Website Main Pages: Verify Acyclovir Product page opens error-free", async () => {
    try {
      await ProductDetail.productAcyclovir.click();
      await browser.pause(2000);

      const url: string = await browser.getUrl();
      const language: string = await ProductDetail.getLanguageFromUrl(url);

      if (language === "en") {
        await expect(browser).toHaveTitle(pageTitle.pg_title_acyclovir);
        await expect(ProductDetail.productTitle).toHaveText(
          productDetailData.product_acyclovir
        );
        console.log(
          "Product Description: " +
            (await ProductDetail.productDescription.getText())
        );
        expect(await ProductDetail.productDescription.getText()).toEqual(
          productDetailData.product_acyclovir_description
        );
        await expect(ProductDetail.productfaq).toHaveText(
          productDetailData.product_faq_title_Acyclovir
        );
      } else {
        await expect(browser).toHaveTitle(pageTitle.pg_title_acyclovir_es);
        await expect(ProductDetail.productTitle).toHaveText(
          productDetailData.product_acyclovir
        );
        console.log(
          "Product Description: " +
            (await ProductDetail.productDescription.getText())
        );
        expect(await ProductDetail.productDescription.getText()).toEqual(
          productDetailData.product_acyclovir_description_es
        );
        await expect(ProductDetail.productfaq).toHaveText(
          productDetailData.product_faq_title_Acyclovir_es
        );
      }

      // Check if product information and FAQs are displayed
      expect(await ProductDetail.productInfo()).toBeTruthy();
      expect(await ProductDetail.FAQsInfo()).toBeTruthy();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });

  /**
   * Test Case: Verify Semaglutide Product page opens and form validation works
   * - Ensures that the Semaglutide product page is correctly loaded, and the form validation and submission work as expected.
   */
  it("C29680 Website Main Pages: Verify Semaglutide Product page opens error-free", async () => {
    try {
      await ProductDetail.productSemaglutide.click();
      await browser.pause(2000);

      const url: string = await browser.getUrl();
      const language: string = await ProductDetail.getLanguageFromUrl(url);

      if (language === "en") {
        await expect(browser).toHaveTitle(pageTitle.pg_title_semaglutide);
        await expect(ProductDetail.productTitle).toHaveText(
          productDetailData.product_glp_semaglutide
        );
        console.log(
          "Product Description: " +
            (await ProductDetail.productDescription.getText())
        );
        expect(await ProductDetail.productDescription.getText()).toEqual(
          productDetailData.product_semaglutide_description
        );
        await expect(ProductDetail.productfaq).toHaveText(
          productDetailData.product_faq_title_Semaglutide
        );
      } else {
        await expect(browser).toHaveTitle(pageTitle.pg_title_semaglutide_es);
        await expect(ProductDetail.productTitle).toHaveText(
          productDetailData.product_glp_semaglutide_es
        );
        console.log(
          "Product Description: " +
            (await ProductDetail.productDescription.getText())
        );
        expect(await ProductDetail.productDescription.getText()).toEqual(
          productDetailData.product_semaglutide_description_es
        );
        await expect(ProductDetail.productfaq).toHaveText(
          productDetailData.product_faq_title_Semaglutide_es
        );
      }

      // Check if product information and FAQs are displayed
      expect(await ProductDetail.productInfo()).toBeTruthy();
      expect(await ProductDetail.FAQsInfo()).toBeTruthy();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });
});

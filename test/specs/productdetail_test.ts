import { expect } from "@wdio/globals";
import ProductDetail from "../pageobjects/productdetail.page";
import productDetaildata from "../data/productDetail.json";
import pagetitle from "../data/pageTitles.json";

describe("Product Detail Feature", () => {
  it("Verify Product Detail Page - Tadalafil - TC08", async () => {
    await ProductDetail.openHomepage(productDetaildata.ProductED);
    await browser.pause(5000);
    await expect(browser).toHaveTitle(pagetitle.pg_title_tadalafil);
    await expect(ProductDetail.productfaq).toHaveText(
      productDetaildata.faq_title_Tadalafil
    );
  });
  it("Verify Product Detail Page - Sildenafil - TC09", async () => {
    await ProductDetail.openHomepage(productDetaildata.ProductED2);
    await browser.pause(5000);
    await expect(browser).toHaveTitle(pagetitle.pg_title_sildenafil);
    await expect(ProductDetail.productfaq).toHaveText(
      productDetaildata.faq_title_Sildanafil
    );
  });
  it("Verify Product Detail Page - Paroxetine - TC10", async () => {
    await ProductDetail.openHomepage(productDetaildata.ProductPE);
    await browser.pause(5000);
    await expect(browser).toHaveTitle(pagetitle.pg_title_paroxetine);
    await expect(ProductDetail.productfaq).toHaveText(
      productDetaildata.faq_title_Paroxetine
    );
  });
  it("Verify Product Detail Page - Finasteride - TC11", async () => {
    await ProductDetail.openHomepage(productDetaildata.ProductHL);
    await browser.pause(5000);
    await expect(browser).toHaveTitle(pagetitle.pg_title_finasteride);
    await expect(ProductDetail.productfaq).toHaveText(
      productDetaildata.faq_title_Finasteride
    );
  });
  it("Verify Product Detail Page - Acyclovir - TC12", async () => {
    await ProductDetail.openHomepage(productDetaildata.ProductGH);
    await browser.pause(5000);
    await expect(browser).toHaveTitle(pagetitle.pg_title_acyclovir);
    await expect(ProductDetail.productfaq).toHaveText(
      productDetaildata.faq_title_Acyclovir
    );
  });
  it("Verify Product Detail Page - GLP-1 Semaglutide - TC13", async () => {
    await ProductDetail.openHomepage(productDetaildata.ProductWL);
    await browser.pause(5000);
    await expect(browser).toHaveTitle(pagetitle.pg_title_semaglutide);
    await ProductDetail.submitSemaglutideform(
      productDetaildata.semaglutide_form.wl_firstname,
      productDetaildata.semaglutide_form.wl_lastname,
      productDetaildata.semaglutide_form.wl_cellnum,
      productDetaildata.semaglutide_form.wl_email
    );
    await expect(ProductDetail.wlsuccessmessage).toHaveText(
      productDetaildata.semaglutide_form.wl_success
    );
    await browser.pause(5000);
  });
});

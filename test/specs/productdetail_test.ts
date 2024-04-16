import { expect } from "@wdio/globals"
import ProductDetail from "../pageobjects/productdetail.page.js"
import productdetailPage from "../pageobjects/productdetail.page.js"
import * as fs from 'fs'

describe("Product Detail Feature", () => {

  let productDetaildata: any;
  let pagetitle: any;

  before(async ()=>{
    const rawData = fs.readFileSync('./test/data/productDetail.json', 'utf-8');
    productDetaildata = JSON.parse(rawData);
    const rawData2 = fs.readFileSync('./test/data/pageTitles.json', 'utf-8');
    pagetitle = JSON.parse(rawData2);
    await browser.maximizeWindow();
  })
  it("Verify Product Detail Page - Tadalafil - TC10", async () => {
    await ProductDetail.openHomepage(productDetaildata.product_tadalafil);
    await expect(browser).toHaveTitle(pagetitle.pg_title_tadalafil);
    await expect(productdetailPage.productTitle).toHaveText(
      productDetaildata.product_tadalafil
    );
    await expect(ProductDetail.productfaq).toHaveText(
      productDetaildata.product_faq_title_Tadalafil
    );
  });
  it("Verify Product Detail Page - Sildenafil - TC20", async () => {
    await ProductDetail.openHomepage(productDetaildata.product_sildenafil);
    await expect(browser).toHaveTitle(pagetitle.pg_title_sildenafil);
    await expect(productdetailPage.productTitle).toHaveText(
      productDetaildata.product_sildenafil
    );
    await expect(ProductDetail.productfaq).toHaveText(
      productDetaildata.product_faq_title_Sildanafil
    );
  });
  it("Verify Product Detail Page - Paroxetine - TC21", async () => {
    await ProductDetail.openHomepage(productDetaildata.product_paroxetine);
    await expect(browser).toHaveTitle(pagetitle.pg_title_paroxetine);
    await expect(productdetailPage.productTitle).toHaveText(
      productDetaildata.product_paroxetine
    );
    await expect(ProductDetail.productfaq).toHaveText(
      productDetaildata.product_faq_title_Paroxetine
    );
  });
  it("Verify Product Detail Page - Finasteride - TC22", async () => {
    await ProductDetail.openHomepage(productDetaildata.product_finasteride);
    await expect(browser).toHaveTitle(pagetitle.pg_title_finasteride);
    await expect(productdetailPage.productTitle).toHaveText(
      productDetaildata.product_finasteride
    );
    await expect(ProductDetail.productfaq).toHaveText(
      productDetaildata.product_faq_title_Finasteride
    );
  });
  it("Verify Product Detail Page - Acyclovir - TC23", async () => {
    await ProductDetail.openHomepage(productDetaildata.product_acyclovir);
    await expect(browser).toHaveTitle(pagetitle.pg_title_acyclovir);
    await expect(productdetailPage.productTitle).toHaveText(
      productDetaildata.product_acyclovir
    );
    await expect(ProductDetail.productfaq).toHaveText(
      productDetaildata.product_faq_title_Acyclovir
    );
  });
  it("Verify Product Detail Page - GLP-1 Semaglutide - TC24", async () => {
    await ProductDetail.openHomepage(productDetaildata.product_semaglutide);
    await expect(browser).toHaveTitle(pagetitle.pg_title_semaglutide);
    await expect(productdetailPage.productTitle).toHaveText(
      productDetaildata.product_glp_semaglutide
    );
    await ProductDetail.submitSemaglutideform(
      productDetaildata.product_semaglutide_form.product_wl_firstname,
      productDetaildata.product_semaglutide_form.product_wl_lastname,
      productDetaildata.product_semaglutide_form.product_wl_cellnum
    );
    await expect(ProductDetail.wlsuccessmessage).toHaveText(
      productDetaildata.product_semaglutide_form.product_wl_success
    );
  });
});

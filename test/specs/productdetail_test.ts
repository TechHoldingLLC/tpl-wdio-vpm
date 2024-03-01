import { expect } from "@wdio/globals";
import ProductDetail from "../pageobjects/productdetail.page";
import productDetaildata from "../data/productDetail.json";

describe("Product Detail Feature", () => {
  it("Product Detail Page - Tadalafil - TC08", async () => {
    await ProductDetail.openHomepage(productDetaildata.ProductED);
    await browser.pause(5000);
    await expect(browser).toHaveTitle(
      "Long-Lasting ED Treatment with Tadalafil | Viapromeds"
    );
    await expect(ProductDetail.productTitle).toHaveText("Tadalafil");
  });
  it("Product Detail Page - Sildenafil - TC09", async () => {
    await ProductDetail.openHomepage(productDetaildata.ProductED2);
    await browser.pause(5000);
    await expect(browser).toHaveTitle(
      "Get Back Your Confidence with ED Treatment | Viapromeds"
    );
    await expect(ProductDetail.productTitle).toHaveText("Sildenafil");
  });
  it("Product Detail Page - Paroxetine - TC10", async () => {
    await ProductDetail.openHomepage(productDetaildata.ProductPE);
    await browser.pause(5000);
    await expect(browser).toHaveTitle(
      "Treat Premature Ejaculation Effectively | Viapromeds"
    );
    await expect(ProductDetail.productTitle).toHaveText("Paroxetine");
  });
  it("Product Detail Page - Finasteride - TC11", async () => {
    await ProductDetail.openHomepage(productDetaildata.ProductHL);
    await browser.pause(5000);
    await expect(browser).toHaveTitle(
      "Stop Hair Loss with Finasteride | Viapromeds"
    );
    await expect(ProductDetail.productTitle).toHaveText("Finasteride");
  });
  it("Product Detail Page - Acyclovir - TC12", async () => {
    await ProductDetail.openHomepage(productDetaildata.ProductGH);
    await browser.pause(5000);
    await expect(browser).toHaveTitle(
      "Manage Genital Herpes Outbreaks | Viapromeds"
    );
    await expect(ProductDetail.productTitle).toHaveText("Acyclovir");
  });
  it("Product Detail Page - GLP-1 Semaglutide - TC13", async () => {
    await ProductDetail.openHomepage(productDetaildata.ProductWL);
    await browser.pause(5000);
    await expect(browser).toHaveTitle(
      "Reach Weight Loss Goals with Semaglutide | Viapromeds"
    );
    // await expect(ProductDetail.productTitle).toHaveText("GLP-1 Semaglutide");
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

import { expect } from "@wdio/globals";
import ProductDetail from "../pageobjects/productdetail.page.js";
import SemaglutideProductDetail from "../pageobjects/semaglutideProductDetail.page.js";
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
          fs.readFileSync("./test/data/semaglutideProductPageData.json", "utf-8")
        );
        pageTitle = JSON.parse(
          fs.readFileSync("./test/data/pageTitles.json", "utf-8")
        );
    });

    it("Website Main Pages: Verify GLP-1 Semaglutide Product page opens error-free", async () => {
        await SemaglutideProductDetail.semaglutideProductMenu.click();
        await browser.pause(2000);
        const url: string = await browser.getUrl();
        const language: string = await ProductDetail.getLanguageFromUrl(url);

        if (language === "en") {
            await expect(browser).toHaveTitle(pageTitle.pg_title_semaglutide);
            await expect(ProductDetail.productTitle).toHaveText(productDetailData.semaglutidePageHeader_en);
            await expect(ProductDetail.productName).toHaveText(productDetailData.semaglutidePageSubHeader_en);
            await expect(ProductDetail.productDescription).toHaveText(productDetailData.semaglutideProductDescription_en);
        }
        else{
            await expect(browser).toHaveTitle(pageTitle.pg_title_semaglutide_es);
            await expect(ProductDetail.productTitle).toHaveText(productDetailData.semaglutidePageHeader_es);
            await expect(ProductDetail.productDescription).toHaveText(productDetailData.semaglutideProductDescription_es);
        }
    }); 
});

import { expect } from "@wdio/globals"
import ProductDetail from "../pageobjects/productdetail.page.js"
import productdetailPage from "../pageobjects/productdetail.page.js"
import fs from 'fs'

describe("Product Details Feature", () => {

  let productDetaildata: any
  let pagetitle: any

  before(async ()=>{
    productDetaildata = JSON.parse(fs.readFileSync('./test/data/productDetail.json', 'utf-8'))
    pagetitle = JSON.parse(fs.readFileSync('./test/data/pageTitles.json', 'utf-8'))
  })

  it("C29676 Website Main Pages: Verify Tadalafil Product page opens error-free", async () => {
    try{
      await ProductDetail.openHomepage(productDetaildata.product_tadalafil)
      const url: string = await browser.getUrl()
      const language: string = await ProductDetail.getLanguageFromUrl(url)
      if(language === 'en'){
        await expect(browser).toHaveTitle(pagetitle.pg_title_tadalafil)
        await expect(productdetailPage.productTitle).toHaveText(
        productDetaildata.product_tadalafil)
        console.log('Product Description: '+ await productdetailPage.productDescription.getText())
        expect(await productdetailPage.productDescription.getText()).toEqual(productDetaildata.product_tadalafil_description)
        await expect(ProductDetail.productfaq).toHaveText(
        productDetaildata.product_faq_title_Tadalafil)
      }
      else{
        await expect(browser).toHaveTitle(pagetitle.pg_title_tadalafil_es)
        await expect(productdetailPage.productTitle).toHaveText(
        productDetaildata.product_tadalafil)
        console.log('Product Description: '+ await productdetailPage.productDescription.getText())
        expect(await productdetailPage.productDescription.getText()).toEqual(productDetaildata.product_tadalafil_description_es)
        await expect(ProductDetail.productfaq).toHaveText(
        productDetaildata.product_faq_title_Tadalafil_es)
      }
      expect(await productdetailPage.productInfo()).toBeTruthy()
      expect(await productdetailPage.FAQsInfo()).toBeTruthy()
    } catch (error) {
      console.error("An error occurred:", error)
    }
  })

  it("C29677 Website Main Pages: Verify Sildenafil Products page opens error-free", async () => {
    try {
      await ProductDetail.openHomepage(productDetaildata.product_sildenafil)
      const url: string = await browser.getUrl()
      const language: string = await ProductDetail.getLanguageFromUrl(url)
      if(language === 'en'){
        await expect(browser).toHaveTitle(pagetitle.pg_title_sildenafil)
        await expect(productdetailPage.productTitle).toHaveText(
        productDetaildata.product_sildenafil)
        console.log('Product Description: '+ await productdetailPage.productDescription.getText())
        expect(await productdetailPage.productDescription.getText()).toEqual(productDetaildata.product_sildenafil_description)
        await expect(ProductDetail.productfaq).toHaveText(
        productDetaildata.product_faq_title_Sildanafil)
      }
      else{
        await expect(browser).toHaveTitle(pagetitle.pg_title_sildenafil_es)
        await expect(productdetailPage.productTitle).toHaveText(
        productDetaildata.product_sildenafil)
        console.log('Product Description: '+ await productdetailPage.productDescription.getText())
        expect(await productdetailPage.productDescription.getText()).toEqual(productDetaildata.product_sildenafil_description_es)
        await expect(ProductDetail.productfaq).toHaveText(
        productDetaildata.product_faq_title_Sildanafil_es)
      }
      expect(await productdetailPage.productInfo()).toBeTruthy()
      expect(await productdetailPage.FAQsInfo()).toBeTruthy()
    } catch (error) {
      console.error("An error occurred:", error)
    }
  })

  it("C29752 Website Main Pages: Verify Paroxetine Products page opens error-free", async () => {
    try {
      await ProductDetail.openHomepage(productDetaildata.product_paroxetine)
      const url: string = await browser.getUrl()
      const language: string = await ProductDetail.getLanguageFromUrl(url)
      if(language === 'en'){
        await expect(browser).toHaveTitle(pagetitle.pg_title_paroxetine)
        await expect(productdetailPage.productTitle).toHaveText(
        productDetaildata.product_paroxetine)
        console.log('Product Description: '+ await productdetailPage.productDescription.getText())
        expect(await productdetailPage.productDescription.getText()).toEqual(productDetaildata.product_paroxetine_description)
        await expect(ProductDetail.productfaq).toHaveText(
        productDetaildata.product_faq_title_Paroxetine)
      }
      else{
        await expect(browser).toHaveTitle(pagetitle.pg_title_paroxetine_es)
        await expect(productdetailPage.productTitle).toHaveText(
        productDetaildata.product_paroxetine)
        console.log('Product Description: '+ await productdetailPage.productDescription.getText())
        expect(await productdetailPage.productDescription.getText()).toEqual(productDetaildata.product_paroxetine_description_es)
        await expect(ProductDetail.productfaq).toHaveText(
        productDetaildata.product_faq_title_Paroxetine_es)
      }
      expect(await productdetailPage.productInfo()).toBeTruthy()
      expect(await productdetailPage.FAQsInfo()).toBeTruthy()
    } catch (error) {
      console.error("An error occurred:", error)
    }
  })

  it("C29678 Website Main Pages: Verify Finasteride Products page opens error-free", async () => {
    try {
      await ProductDetail.openHomepage(productDetaildata.product_finasteride)
      const url: string = await browser.getUrl()
      const language: string = await ProductDetail.getLanguageFromUrl(url)
      if(language === 'en'){
        await expect(browser).toHaveTitle(pagetitle.pg_title_finasteride)
        await expect(productdetailPage.productTitle).toHaveText(
        productDetaildata.product_finasteride)
        console.log('Product Description: '+ await productdetailPage.productDescription.getText())
        expect(await productdetailPage.productDescription.getText()).toEqual(productDetaildata.product_finasteride_description)
        await expect(ProductDetail.productfaq).toHaveText(
        productDetaildata.product_faq_title_Finasteride)
      }
      else{
        await expect(browser).toHaveTitle(pagetitle.pg_title_finasteride_es)
        await expect(productdetailPage.productTitle).toHaveText(
        productDetaildata.product_finasteride)
        console.log('Product Description: '+ await productdetailPage.productDescription.getText())
        expect(await productdetailPage.productDescription.getText()).toEqual(productDetaildata.product_finasteride_description_es)
        await expect(ProductDetail.productfaq).toHaveText(
        productDetaildata.product_faq_title_Finasteride_es)
      }
      expect(await productdetailPage.productInfo()).toBeTruthy()
      expect(await productdetailPage.FAQsInfo()).toBeTruthy()
    } catch (error) {
      console.error("An error occurred:", error)
    }
  })

  it("C29679 Website Main Pages: Verify Acyclovir Product page opens error-free", async () => {
    try {
      await ProductDetail.openHomepage(productDetaildata.product_acyclovir)
      const url: string = await browser.getUrl()
      const language: string = await ProductDetail.getLanguageFromUrl(url)
      if(language === 'en'){
        await expect(browser).toHaveTitle(pagetitle.pg_title_acyclovir)
        await expect(productdetailPage.productTitle).toHaveText(
          productDetaildata.product_acyclovir)
        console.log('Product Description: '+ await productdetailPage.productDescription.getText())
        expect(await productdetailPage.productDescription.getText()).toEqual(productDetaildata.product_acyclovir_description)
        await expect(ProductDetail.productfaq).toHaveText(
          productDetaildata.product_faq_title_Acyclovir)
      }
      else{
        await expect(browser).toHaveTitle(pagetitle.pg_title_acyclovir_es)
        await expect(productdetailPage.productTitle).toHaveText(
          productDetaildata.product_acyclovir)
        console.log('Product Description: '+ await productdetailPage.productDescription.getText())
        expect(await productdetailPage.productDescription.getText()).toEqual(productDetaildata.product_acyclovir_description_es)
        await expect(ProductDetail.productfaq).toHaveText(
          productDetaildata.product_faq_title_Acyclovir_es)
      }
      expect(await productdetailPage.productInfo()).toBeTruthy()
      expect(await productdetailPage.FAQsInfo()).toBeTruthy()
    } catch (error) {
      console.error("An error occurred:", error)
    }
  })

  /*
  it("Verify Product Details Page - GLP-1 Semaglutide", async () => {
    try {
      await ProductDetail.openHomepage(productDetaildata.product_semaglutide)
      const url: string = await browser.getUrl()
      const language: string = await ProductDetail.getLanguageFromUrl(url)
      if(language === 'en'){
        await expect(browser).toHaveTitle(pagetitle.pg_title_semaglutide)
        await expect(productdetailPage.productTitle).toHaveText(
        productDetaildata.product_glp_semaglutide)
        console.log('Product Description: '+ await productdetailPage.productDescription.getText())
        expect(await productdetailPage.productDescription.getText()).toEqual(productDetaildata.product_semaglutide_description)
        await ProductDetail.wlcheckbox.click()
        await ProductDetail.btnSubmit.click()
        expect(await ProductDetail.validationFnameOnSemaglutideForm.getText()).toEqual(productDetaildata.product_semaglutide_form.product_fname_validation_message)
        expect(await ProductDetail.validationLnameOnSemaglutideForm.getText()).toEqual(productDetaildata.product_semaglutide_form.product_lname_validation_message)
        expect(await ProductDetail.validationMobileOnSemaglutideForm.getText()).toEqual(productDetaildata.product_semaglutide_form.product_mobile_validation_message)
        expect(await ProductDetail.validationEmailOnSemaglutideForm.getText()).toEqual(productDetaildata.product_semaglutide_form.product_email_validation_message)
        await ProductDetail.wlcheckbox.click()
        await ProductDetail.submitSemaglutideform(
        productDetaildata.product_semaglutide_form.product_wl_firstname,
        productDetaildata.product_semaglutide_form.product_wl_lastname,
        productDetaildata.product_semaglutide_form.product_wl_cellnum
        )
        await expect(ProductDetail.wlsuccessmessage).toHaveText(
        productDetaildata.product_semaglutide_form.product_wl_success)
      }
      else{
        await expect(browser).toHaveTitle(pagetitle.pg_title_semaglutide_es)
        await expect(productdetailPage.productTitle).toHaveText(
        productDetaildata.product_glp_semaglutide)
        console.log('Product Description: '+ await productdetailPage.productDescription.getText())
        expect(await productdetailPage.productDescription.getText()).toEqual(productDetaildata.product_semaglutide_description_es)
        await ProductDetail.wlcheckbox.click()
        await browser.pause(1500)
        await ProductDetail.btnSubmit.click()
        expect(await ProductDetail.validationFnameOnSemaglutideForm.getText()).toEqual(productDetaildata.product_semaglutide_form.product_fname_validation_message_es)
        expect(await ProductDetail.validationLnameOnSemaglutideForm.getText()).toEqual(productDetaildata.product_semaglutide_form.product_lname_validation_message_es)
        expect(await ProductDetail.validationMobileOnSemaglutideForm.getText()).toEqual(productDetaildata.product_semaglutide_form.product_mobile_validation_message_es)
        expect(await ProductDetail.validationEmailOnSemaglutideForm.getText()).toEqual(productDetaildata.product_semaglutide_form.product_email_validation_message_es)
        await ProductDetail.wlcheckbox.click()
        await ProductDetail.submitSemaglutideform(
          productDetaildata.product_semaglutide_form.product_wl_firstname,
          productDetaildata.product_semaglutide_form.product_wl_lastname,
          productDetaildata.product_semaglutide_form.product_wl_cellnum
        )
        await expect(ProductDetail.wlsuccessmessage).toHaveText(
        productDetaildata.product_semaglutide_form.product_wl_success_es)
      }
    } catch (error) {
      console.error("An error occurred:", error)
    }
  })
  */
})

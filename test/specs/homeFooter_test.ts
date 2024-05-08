import homePage from "../pageobjects/home.page.js"
import fs from 'fs'

describe('Home Page Footer Links and Page Redirection', () => {

    let pagetitle: any
    let homePageData: any

    before(async () => {
        await homePage.openHomepage()
        pagetitle = JSON.parse(fs.readFileSync('./test/data/pageTitles.json', 'utf-8'))
        homePageData = JSON.parse(fs.readFileSync('./test/data/homePage.json', 'utf-8'))
    })

    it("Website Main Pages: Verify the Headers options available in the Home Page Footer.", async()=>{
        const language = await homePage.getLanguageFromUrl(await browser.getUrl())
        const expectedFooterHeaders: string[] = language === 'en' ? ["PRODUCTS", "LEGAL", "SUPPORT"] : ["PRODUCTOS", "LEGAL", "APOYO"]
        await homePage.navigateToFooter()
        const listOfFooterHeaders = await homePage.footerHeaders
        const actualFooterHeaders: string[] = []
        for(const footerHeader of listOfFooterHeaders){
            actualFooterHeaders.push((await footerHeader.getText()).trim())
        }
        console.log(actualFooterHeaders)
        expect(actualFooterHeaders).toEqual(expectedFooterHeaders)
    })

    it('Website Main Pages: Verify the Product options available in the Home Page Footer.', async() => {
        const expectedProducts: string[]= ['Tadalafil', 'Sildenafil', 'Paroxetine', 'Finasteride', 'Acyclovir']
        const listOfProducts = await homePage.productList
        const actualProducts: string[] = []
        for(const product of listOfProducts){
            actualProducts.push(await product.getText())
        }
        console.log(actualProducts)
        expect(actualProducts).toEqual(expectedProducts)
    })

    it('Website Main Pages: Verify the Legal options available in the Home Page Footer.',async() => {
        const language = await homePage.getLanguageFromUrl(await browser.getUrl())
        const expectedLegalOptions: string[] = language === "en" ? ["Terms of Use", "Telehealth Consent", "Privacy Notice"] : ["Términos y Condiciones", "Consentimiento de Telemedicina", "Política de Privacidad"]
        const listOfLegalOptions = await homePage.legalList
        const actualLegalOptions: string[] = []
        for(const legalOption of listOfLegalOptions){
            actualLegalOptions.push(await legalOption.getText())
        }
        console.log(actualLegalOptions)
        expect(actualLegalOptions).toEqual(expectedLegalOptions)
    })

    it('Website Main Pages: Verify the Support options available in the Home Page Footer.', async() => {
        const language = await homePage.getLanguageFromUrl(await browser.getUrl())
        const expectedSupportOptions: string[] = language === "en" ? ["About Us", "Contact Us", "How It Works", "FAQ", "Blog"] : ["Sobre Nosotros", "Contáctenos", "Cómo funciona", "Preguntas Frecuentes", "Blog"]
        const listOfSupportOptions = await homePage.supportList
        const actualSupportOptions: string[] = []
        for(const supportOption of listOfSupportOptions){
            actualSupportOptions.push(await supportOption.getText())
        }
        console.log(actualSupportOptions)
        expect(actualSupportOptions).toEqual(expectedSupportOptions)
    })

    it("C29681 Website Main Pages: Verify FAQ page opens error-free", async () => {
        await homePage.faqLink.scrollIntoView()
        expect(await homePage.aboutUs.isDisplayed()).toBe(true)
        await homePage.faqLink.click()
        await browser.pause(4000)
        const url: string = await browser.getUrl()
        const language: string = await homePage.getLanguageFromUrl(url)
    
        const expectedPageTitle: string = language === 'en' ? pagetitle.pg_title_faq : pagetitle.pg_title_faq_es
        const expectedFAQBannerText: string = language === 'en' ? "FAQs" : "Preguntas Frecuentes"
        expect(await browser.getTitle()).toEqual(expectedPageTitle)
        expect(await homePage.faqBanner).toHaveText(expectedFAQBannerText)
    
        await homePage.faq_iConsult_link.click()
        await browser.pause(1000)
        expect(await homePage.faq_iConsult_link).toHaveText(homePageData.faq_iConsult)
        expect(await homePage.faq_iConsult_header).toHaveText(homePageData.faq_iConsult)
        expect(await homePage.iConsultFAQsInfo()).toBeTruthy()
        
        await homePage.faq_General_Questions_link.click()
        await browser.pause(2000)
        const expectedFAQGeneralQuestionText : string = language === 'en' ? pagetitle.faq_General_Que: pagetitle.faq_General_Que_es
        expect(await homePage.faq_gq_header).toHaveText(expectedFAQGeneralQuestionText);
        expect(await homePage.generalFAQsInfo()).toBeTruthy()
    
        await homePage.faq_General_Medical_Questions_link.click()
        await browser.pause(1000)
        const expectedFAQGeneralMedicalQuestionText: string = language === 'en' ? pagetitle.faq_General_Medical_Questions : pagetitle.faq_General_Medical_Questions_es
        expect(await homePage.faq_General_Medical_Questions_link).toHaveText(expectedFAQGeneralMedicalQuestionText)
        expect(await homePage.generalMedicalQuestionsFAQsInfo()).toBeTruthy()
    
        await homePage.faq_ED_link.click()
        await browser.pause(1000)
        const expectedFAQEDLinkText: string = language === 'en' ? pagetitle.faq_ED : pagetitle.faq_ED_es
        expect(await homePage.faq_ED_link).toHaveText(expectedFAQEDLinkText)
        expect(await homePage.EDFAQsInfo()).toBeTruthy()
    
        await homePage.faq_PE_link.click()
        await browser.pause(1000)
        const expectedFAQPELinkText: string = language === 'en' ? pagetitle.faq_PE : pagetitle.faq_PE_es
        expect(await homePage.faq_PE_link).toHaveText(expectedFAQPELinkText)
        expect(await homePage.PEFAQsInfo()).toBeTruthy()
    
        await homePage.faq_HL_link.click()
        await browser.pause(1000)
        const expectedFAQHLLinkText: string = language === 'en' ? pagetitle.faq_HL : pagetitle.faq_HL_es
        expect(await homePage.faq_HL_link).toHaveText(expectedFAQHLLinkText)
        expect(await homePage.HLFAQsInfo()).toBeTruthy()
    
        await homePage.faq_GH_link.click()
        await browser.pause(1000)
        const expectedFAQGHLinkText: string = language === 'en' ? pagetitle.faq_GH : pagetitle.faq_GH_es
        expect(await homePage.faq_GH_link).toHaveText(expectedFAQGHLinkText)
        expect(await homePage.GHFAQsInfo()).toBeTruthy()
        
    })
    
    it("C29682 Website Main Pages: Verify How It Works page opens error-free", async () => {
        await homePage.howitworksLink.scrollIntoView()
        expect(await homePage.howitworksLink.isDisplayed()).toBe(true)
        await homePage.howitworksLink.click()
    
        const url: string = await browser.getUrl()
        const language: string = await homePage.getLanguageFromUrl(url)
        
        const expectedPageTitle: string = language === 'en' ? pagetitle.pg_title_howitworks : pagetitle.pg_title_howitworks_es
        const expectedHowItWorksPageHeaderText: string = language === 'en' ? pagetitle.pg_title_howitworks_header : pagetitle.pg_title_howitworks_header_es
        const expectedHowItWorksPoints: string[] = language === 'en' ?
         ['iConsult', 'Free and Discreet Deliveries', 'Continuous Care'] : 
         ['iConsult', 'Entregas Gratuitas y Discretas', 'Cuidado Continuo']
    
        await expect(browser).toHaveTitle(expectedPageTitle)
        const howitworksHeaderText = await homePage.howitworksHeader.getText()
        expect(howitworksHeaderText).toHaveText(expectedHowItWorksPageHeaderText)
        
        const validateHowItWorksOptions = await homePage.validateHowItWorksItems(expectedHowItWorksPoints)
        expect(validateHowItWorksOptions).toBeTruthy()
    })
    
    it("Website Main Pages: Verify the Terms of Use Page from the Home Page Footer.", async () => {
        await homePage.TermsOfUseLink.scrollIntoView()
        await homePage.TermsOfUseLink.click()
        const url: string = await browser.getUrl()
        const language: string = await homePage.getLanguageFromUrl(url)
    
        const windowHandles = await browser.getWindowHandles()
        console.log(windowHandles)
        if (windowHandles.length < 2) {
          throw new Error("Terms of Use page did not open in a new window.")

        }
        await browser.switchToWindow(windowHandles[1])
        await browser.pause(1500)
        await expect(browser).toHaveUrl(expect.stringContaining('terms-conditions'))
    
        const expectedTermsOfUsePageTitleText: string = language === 'en' ? pagetitle.pg_title_TermsOfUse : pagetitle.pg_title_TermsOfUse_es
        await expect(browser).toHaveTitle(expectedTermsOfUsePageTitleText)
        const expectedTermsOfUsePageHeaderText: string = language === 'en' ? homePageData.terms_of_use_title : homePageData.terms_of_use_title_es
        await expect(await homePage.title).toHaveText(expectedTermsOfUsePageHeaderText)
    
        await browser.closeWindow()
        await browser.pause(1000)
        await browser.switchToWindow(windowHandles[0])
        expect(browser).toHaveUrl(expect.stringContaining('viapromeds'))
        await browser.pause(3000)
    })
    
    it("Website Main Pages: Verify the Telehealth Consent Page from the Home Page Footer.", async () => {
        await homePage.TeleHealthConsentLink.scrollIntoView()
        await homePage.TeleHealthConsentLink.click()
      
        const windowHandles = await browser.getWindowHandles()
        if (windowHandles.length < 2) {
          throw new Error("Telehealth Consent page did not open in a new window.")

        }
        await browser.switchToWindow(windowHandles[1])
    
        const url: string = await browser.getUrl()
        const language: string = await homePage.getLanguageFromUrl(url)
    
        const expectedTeleHealthConsentPageTitle: string = language === 'en' ? pagetitle.pg_title_Telehealth_Consent : pagetitle.pg_title_Telehealth_Consent_es
        const expectedTeleHealthConsentPageHeaderText: string = language === 'en' ? homePageData.telehealth_consent_title : homePageData.telehealth_consent_title_es
        
        await expect(browser).toHaveUrl(expect.stringContaining('telehealth-consent'))
        await expect(browser).toHaveTitle(expectedTeleHealthConsentPageTitle)
        expect(await homePage.title).toHaveText(expectedTeleHealthConsentPageHeaderText)
    
        await browser.closeWindow()
        await browser.switchToWindow(windowHandles[0])
        expect(browser).toHaveUrl(expect.stringContaining('viapromeds'))
        await browser.pause(2000)
    })
    
    it("Website Main Pages: Verify the Privacy Policy Page from the Home Page Footer.", async () => {
        await homePage.PrivacyPolicyLink.scrollIntoView()
        await homePage.PrivacyPolicyLink.click()
        const windowHandles = await browser.getWindowHandles()
        console.log(windowHandles)
        await browser.switchToWindow(windowHandles[1])
        const url = await browser.getUrl()
        const language: string = await homePage.getLanguageFromUrl(url)
        await expect(browser).toHaveUrl(expect.stringContaining('privacy-policy'))

        const expectedPrivacyPolicyPageTitle: string = language === 'en' ? pagetitle.pg_title_PrivacyPolicy : pagetitle.pg_title_PrivacyPolicy_es
        const expectedPrivacyPolicyPageHeaderText: string = language === 'en' ? homePageData.privacy_policy_title : homePageData.privacy_policy_title_es
        
        await expect(browser).toHaveTitle(expectedPrivacyPolicyPageTitle)
        expect(await homePage.title).toHaveText(expectedPrivacyPolicyPageHeaderText)
        
        await browser.closeWindow()
        await browser.switchToWindow(windowHandles[0])
        expect(browser).toHaveUrl(expect.stringContaining('viapromeds'))
    })
    
})

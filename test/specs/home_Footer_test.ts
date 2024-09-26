import homePage from "../pageobjects/home.page.js";
import fs from "fs";

/**
 * Test Suite: Home Page Footer Links and Page Redirection
 * Description: This test suite verifies the functionality of the footer on the home page,
 * including the correct redirection for footer links and validation of footer sections (Products, Legal, Support).
 */
describe("Home Page Footer Links and Page Redirection", () => {
  let pagetitle: any;
  let homePageData: any;

  /**
   * Before hook: Load necessary data and navigate to the homepage.
   * This hook runs once before all tests in this suite.
   */
  before(async () => {
    await browser.url(""); // Navigate to the home page
    await browser.pause(2000);
    pagetitle = JSON.parse(
      fs.readFileSync("./test/data/pageTitles.json", "utf-8")
    );
    homePageData = JSON.parse(
      fs.readFileSync("./test/data/homePageData.json", "utf-8")
    );
  });

  /**
   * Test Case: C29963 - Verify Footer Headers on the Home Page.
   * Description: Check if the footer contains the correct header options based on the current language.
   */
  it("C29963 Website Main Pages: Verify the Headers options available in the Home Page Footer.", async () => {
    const language = await homePage.getLanguageFromUrl(await browser.getUrl());
    const expectedFooterHeaders: string[] =
      language === "en"
        ? ["PRODUCTS", "LEGAL", "SUPPORT"]
        : ["PRODUCTOS", "LEGAL", "APOYO"];

    await homePage.navigateToFooter(); // Scroll to footer
    const listOfFooterHeaders = await homePage.footerHeaders; // Get footer headers
    const actualFooterHeaders: string[] = [];

    for (const footerHeader of listOfFooterHeaders) {
      actualFooterHeaders.push((await footerHeader.getText()).trim());
    }

    console.log(actualFooterHeaders);
    expect(actualFooterHeaders).toEqual(expectedFooterHeaders); // Assert headers match
  });

  /**
   * Test Case: C29962 - Verify Product Options in Footer.
   * Description: Validate the product options displayed in the footer.
   */
  it("C29962 Website Main Pages: Verify the Product options available in the Home Page Footer.", async () => {
    const expectedProducts: string[] = [
      "Tadalafil",
      "Sildenafil",
      "Paroxetine",
      "Finasteride",
      "Acyclovir",
      "GLP-1 Semaglutide",
    ];
    const listOfProducts = await homePage.productList; // Get footer product list
    const actualProducts: string[] = [];

    for (const product of listOfProducts) {
      actualProducts.push(await product.getText());
    }

    console.log(actualProducts);
    expect(actualProducts).toEqual(expectedProducts); // Assert products match
  });

  /**
   * Test Case: C29961 - Verify Legal Options in Footer.
   * Description: Check the legal section links in the footer for the selected language.
   */
  it("C29961 Website Main Pages: Verify the Legal options available in the Home Page Footer.", async () => {
    const language = await homePage.getLanguageFromUrl(await browser.getUrl());
    const expectedLegalOptions: string[] =
      language === "en"
        ? ["Terms of Use", "Telehealth Consent", "Privacy Notice"]
        : [
            "Términos y Condiciones",
            "Consentimiento de Telemedicina",
            "Política de Privacidad",
          ];

    const listOfLegalOptions = await homePage.legalList; // Get footer legal options
    const actualLegalOptions: string[] = [];

    for (const legalOption of listOfLegalOptions) {
      actualLegalOptions.push(await legalOption.getText());
    }

    console.log(actualLegalOptions);
    expect(actualLegalOptions).toEqual(expectedLegalOptions); // Assert legal options match
  });

  /**
   * Test Case: C29960 - Verify Support Options in Footer.
   * Description: Validate the support links in the footer based on environment (QA, Staging, etc.).
   */
  it("C29960 Website Main Pages: Verify the Support options available in the Home Page Footer.", async () => {
    const language = await homePage.getLanguageFromUrl(await browser.getUrl());
    const url = await browser.getUrl();
    let expectedSupportOptions: string[];

    // Set expected support options based on the environment (QA, Stage)
    if (url.includes("qa") || url.includes("stage")) {
      expectedSupportOptions =
        language === "en"
          ? ["About Us", "Contact Us", "How It Works", "FAQ", "Blog"]
          : [
              "Sobre Nosotros",
              "Contáctenos",
              "Cómo funciona",
              "Preguntas Frecuentes",
              "Blog",
            ];
    } else {
      expectedSupportOptions =
        language === "en"
          ? ["About Us", "Contact Us", "How It Works", "FAQ"]
          : [
              "Sobre Nosotros",
              "Contáctenos",
              "Cómo funciona",
              "Preguntas Frecuentes",
            ];
    }

    const listOfSupportOptions = await homePage.supportList; // Get footer support options
    const actualSupportOptions: string[] = [];

    for (const supportOption of listOfSupportOptions) {
      actualSupportOptions.push(await supportOption.getText());
    }

    console.log(actualSupportOptions);
    expect(actualSupportOptions).toEqual(expectedSupportOptions); // Assert support options match
  });

  /**
   * Test Case: C29959 - Verify Terms of Use Page Redirection.
   * Description: Check that the Terms of Use page opens in a new tab and verify its content.
   */
  it("C29959 Website Main Pages: Verify the Terms of Use Page from the Home Page Footer.", async () => {
    await homePage.TermsOfUseLink.scrollIntoView(); // Scroll to Terms of Use link
    await homePage.TermsOfUseLink.click(); // Click the link

    const windowHandles = await browser.getWindowHandles();
    if (windowHandles.length < 2) {
      throw new Error("Terms of Use page did not open in a new window.");
    }

    await browser.switchToWindow(windowHandles[1]); // Switch to new tab
    await browser.pause(1500);
    await expect(browser).toHaveUrl(
      expect.stringContaining("terms-conditions")
    ); // Assert correct URL

    const language = await homePage.getLanguageFromUrl(await browser.getUrl());
    const expectedTitle =
      language === "en"
        ? pagetitle.pg_title_TermsOfUse
        : pagetitle.pg_title_TermsOfUse_es;
    await expect(browser).toHaveTitle(expectedTitle); // Assert title matches

    await browser.closeWindow(); // Close the tab
    await browser.switchToWindow(windowHandles[0]); // Switch back to main window
  });

  /**
   * Test Case: C29958 - Verify Telehealth Consent Page Redirection.
   * Description: Check that the Telehealth Consent page opens in a new tab and verify its content.
   */
  it("C29958 Website Main Pages: Verify the Telehealth Consent Page from the Home Page Footer.", async () => {
    await homePage.TeleHealthConsentLink.scrollIntoView(); // Scroll to link
    await homePage.TeleHealthConsentLink.click(); // Click the link

    const windowHandles = await browser.getWindowHandles();
    if (windowHandles.length < 2) {
      throw new Error("Telehealth Consent page did not open in a new window.");
    }

    await browser.switchToWindow(windowHandles[1]); // Switch to new tab
    const language = await homePage.getLanguageFromUrl(await browser.getUrl());
    const expectedTitle =
      language === "en"
        ? pagetitle.pg_title_Telehealth_Consent
        : pagetitle.pg_title_Telehealth_Consent_es;
    await expect(browser).toHaveTitle(expectedTitle); // Assert title matches

    await browser.closeWindow(); // Close the tab
    await browser.switchToWindow(windowHandles[0]); // Switch back to main window
  });

  /**
   * Test Case: C29957 - Verify Privacy Policy Page Redirection.
   * Description: Check that the Privacy Policy page opens in a new tab and verify its content.
   */
  it("C29957 Website Main Pages: Verify the Privacy Policy Page from the Home Page Footer.", async () => {
    await homePage.PrivacyPolicyLink.scrollIntoView(); // Scroll to link
    await homePage.PrivacyPolicyLink.click(); // Click the link

    const windowHandles = await browser.getWindowHandles();
    await browser.switchToWindow(windowHandles[1]); // Switch to new tab

    const language = await homePage.getLanguageFromUrl(await browser.getUrl());
    const expectedTitle =
      language === "en"
        ? pagetitle.pg_title_PrivacyPolicy
        : pagetitle.pg_title_PrivacyPolicy_es;
    await expect(browser).toHaveTitle(expectedTitle); // Assert title matches

    await browser.closeWindow(); // Close the tab
    await browser.switchToWindow(windowHandles[0]); // Switch back to main window
  });

  /**
   * Test Case: C29681 - Verify FAQ Page Opens Error-Free
   * Description: Validate the FAQ page, its banner, iConsult section, general questions, medical questions, and various FAQs related to ED, PE, HL, and GH.
   */
  it("C29681 Website Main Pages: Verify FAQ page opens error-free", async () => {
    await homePage.faqLink.scrollIntoView(); // Scroll to FAQ link
    await homePage.faqLink.click(); // Click the FAQ link
    await browser.pause(5000);

    const url: string = await browser.getUrl();
    const language: string = await homePage.getLanguageFromUrl(url);

    // Expected titles and banners based on language
    const expectedPageTitle: string =
      language === "en" ? pagetitle.pg_title_faq : pagetitle.pg_title_faq_es;
    const expectedFAQBannerText: string =
      language === "en" ? "FAQs" : "Preguntas Frecuentes";

    // Validate the page title and banner text
    expect(await browser.getTitle()).toEqual(expectedPageTitle);
    expect(await homePage.faqBanner).toHaveText(expectedFAQBannerText);

    // Validate iConsult section
    await homePage.faq_iConsult_link.click();
    await browser.pause(1000);
    expect(await homePage.faq_iConsult_link).toHaveText(
      homePageData.faq_iConsult
    );
    expect(await homePage.faq_iConsult_header).toHaveText(
      homePageData.faq_iConsult
    );
    expect(await homePage.iConsultFAQsInfo()).toBeTruthy();

    // Validate General Questions section
    await homePage.faq_General_Questions_link.click();
    await browser.pause(2000);
    const expectedFAQGeneralQuestionText: string =
      language === "en"
        ? pagetitle.faq_General_Que
        : pagetitle.faq_General_Que_es;
    expect(await homePage.faq_gq_header).toHaveText(
      expectedFAQGeneralQuestionText
    );
    expect(await homePage.generalFAQsInfo()).toBeTruthy();

    // Validate General Medical Questions section
    await homePage.faq_General_Medical_Questions_link.click();
    await browser.pause(1000);
    const expectedFAQGeneralMedicalQuestionText: string =
      language === "en"
        ? pagetitle.faq_General_Medical_Questions
        : pagetitle.faq_General_Medical_Questions_es;
    expect(await homePage.faq_General_Medical_Questions_link).toHaveText(
      expectedFAQGeneralMedicalQuestionText
    );
    expect(await homePage.generalMedicalQuestionsFAQsInfo()).toBeTruthy();

    // Validate ED section
    await homePage.faq_ED_link.click();
    await browser.pause(1000);
    const expectedFAQEDLinkText: string =
      language === "en" ? pagetitle.faq_ED : pagetitle.faq_ED_es;
    expect(await homePage.faq_ED_link).toHaveText(expectedFAQEDLinkText);
    expect(await homePage.EDFAQsInfo()).toBeTruthy();

    // Validate PE section
    await homePage.faq_PE_link.click();
    await browser.pause(1000);
    const expectedFAQPELinkText: string =
      language === "en" ? pagetitle.faq_PE : pagetitle.faq_PE_es;
    expect(await homePage.faq_PE_link).toHaveText(expectedFAQPELinkText);
    expect(await homePage.PEFAQsInfo()).toBeTruthy();

    // Validate HL section
    await homePage.faq_HL_link.click();
    await browser.pause(1000);
    const expectedFAQHLLinkText: string =
      language === "en" ? pagetitle.faq_HL : pagetitle.faq_HL_es;
    expect(await homePage.faq_HL_link).toHaveText(expectedFAQHLLinkText);
    expect(await homePage.HLFAQsInfo()).toBeTruthy();

    // Validate GH section
    await homePage.faq_GH_link.click();
    await browser.pause(1000);
    const expectedFAQGHLinkText: string =
      language === "en" ? pagetitle.faq_GH : pagetitle.faq_GH_es;
    expect(await homePage.faq_GH_link).toHaveText(expectedFAQGHLinkText);
    expect(await homePage.GHFAQsInfo()).toBeTruthy();
  });

  /**
   * Test Case: C29682 - Verify How It Works Page Opens Error-Free
   * Description: Validate the How It Works page, including header text and specific points like iConsult, deliveries, and continuous care.
   */
  it("C29682 Website Main Pages: Verify How It Works page opens error-free", async () => {
    await homePage.howitworksLink.scrollIntoView(); // Scroll to 'How It Works' link
    expect(await homePage.howitworksLink.isDisplayed()).toBe(true); // Check if 'How It Works' link is displayed
    await homePage.howitworksLink.click(); // Click 'How It Works' link

    const url: string = await browser.getUrl();
    const language: string = await homePage.getLanguageFromUrl(url);

    // Expected page titles and headers based on language
    const expectedPageTitle: string =
      language === "en"
        ? pagetitle.pg_title_howitworks
        : pagetitle.pg_title_howitworks_es;
    const expectedHowItWorksPageHeaderText: string =
      language === "en"
        ? pagetitle.pg_title_howitworks_header
        : pagetitle.pg_title_howitworks_header_es;

    // Points to validate on the 'How It Works' page
    const expectedHowItWorksPoints: string[] =
      language === "en"
        ? ["iConsult", "Free and Discreet Deliveries", "Continuous Care"]
        : ["iConsult", "Entregas Gratuitas y Discretas", "Cuidado Continuo"];

    // Validate the page title and header text
    await expect(browser).toHaveTitle(expectedPageTitle);
    const howitworksHeaderText = await homePage.howitworksHeader.getText();
    expect(howitworksHeaderText).toHaveText(expectedHowItWorksPageHeaderText);

    // Validate the 'How It Works' points
    const validateHowItWorksOptions = await homePage.validateHowItWorksItems(
      expectedHowItWorksPoints
    );
    expect(validateHowItWorksOptions).toBeTruthy();
  });
});

import { expect } from "@wdio/globals"
import aboutUsPage from "../pageobjects/aboutus.page.js"
import fs from 'fs'

describe("About Us Feature", () => {
  before(async () => {
    await aboutUsPage.openAboutus()
    await browser.maximizeWindow()
  })

  it("Verify About Us Page - TC01", async () => {

    try {
      const pageTitle = JSON.parse(fs.readFileSync('./test/data/pageTitles.json', 'utf-8'))
      const aboutUsData = JSON.parse(fs.readFileSync('./test/data/aboutUs.json', 'utf-8'))

      const currentUrl = await browser.getUrl()
      const language = await aboutUsPage.getLanguageFromUrl(currentUrl)
      let expectedHeaders: string[]

      if(language === 'en'){
        expectedHeaders = ['Bridging the Healthcare Gap for Latinos', 'Dr. Linares’ commitment & Platform holistic approach', 'Respected Expert & Trusted Figure'];
        await expect(browser).toHaveTitle(pageTitle.pg_title_about_us)
        await expect(browser).toHaveTitle(pageTitle.pg_title_about_us)
        expect(await aboutUsPage.aboutViaProMeds.getText()).toHaveText(aboutUsData.aboutVPM)
        expect(await aboutUsPage.aboutUsDoctorMission.getText()).toEqual(aboutUsData.aboutUsDoctorMission)
        expect(await aboutUsPage.aboutusContent).toBeDisplayed()
      } else {
        expectedHeaders = ['Cerrando la brecha de atención médica para la gente latino', 'El compromiso del Dr. Linares y el enfoque holístico de la plataforma', 'Experto respetado y figura de confianza']
        await expect(browser).toHaveTitle(pageTitle.pg_title_about_us_spanish)
        expect(await aboutUsPage.aboutViaProMeds.getText()).toHaveText(aboutUsData.aboutVPM_spanish)
        expect(await aboutUsPage.aboutUsDoctorMission.getText()).toEqual(aboutUsData.aboutUsDoctorMission_spanish)
        expect(await aboutUsPage.aboutusContent).toBeDisplayed()
      }
      const isValidContent = await aboutUsPage.validateAboutUsItemContent(expectedHeaders);
      expect(isValidContent).toBeTruthy()
      await aboutUsPage.aboutUsPage()
      expect(await aboutUsPage.iconsultIntro).toBeDisplayed()
      } catch (error) {
        console.error("An error occurred:", error)
    }
  })
})

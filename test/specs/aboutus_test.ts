import { expect } from "@wdio/globals"
import aboutUsPage from "../pageobjects/aboutus.page.js"
import fs from 'fs'

describe("About Us Feature", () => {
  before(async () => {
    await aboutUsPage.openAboutus()
  })

  it("C29680 Verify About Us Page", async () => {

    try {
      const pageTitle = JSON.parse(fs.readFileSync('./test/data/pageTitles.json', 'utf-8'))
      const aboutUsData = JSON.parse(fs.readFileSync('./test/data/aboutUs.json', 'utf-8'))

      const currentUrl = await browser.getUrl()
      const language = await aboutUsPage.getLanguageFromUrl(currentUrl)
      let expectedHeaders: string[]
      let aboutVPMText: string
      let doctorMissionText: string

      if(language === 'en'){
        expectedHeaders = ['Bridging the Healthcare Gap for Latinos', 'Dr. Linares’ commitment & Platform holistic approach', 'Respected Expert & Trusted Figure']
        aboutVPMText = aboutUsData.aboutVPM
        doctorMissionText = aboutUsData.aboutUsDoctorMission
        await expect(browser).toHaveTitle(pageTitle.pg_title_about_us)
      } else {
        expectedHeaders = ['Cerrando la brecha de atención médica para la gente latino', 'El compromiso del Dr. Linares y el enfoque holístico de la plataforma', 'Experto respetado y figura de confianza']
        aboutVPMText = aboutUsData.aboutVPM_spanish
        doctorMissionText = aboutUsData.aboutUsDoctorMission_spanish
        await expect(browser).toHaveTitle(pageTitle.pg_title_about_us_spanish)
      }

      //Retrieve the text from the 'aboutViaProMeds' element
      const aboutViaProMedsText = await (await aboutUsPage.aboutViaProMeds).getText()
      
      // Replace any sequence of whitespace characters with \s* to allow flexibility
      const regexPattern = new RegExp(aboutVPMText.replace(/\s+/g, '\\s*'))

      // Assert that the received text matches the regular expression pattern
      await expect(aboutViaProMedsText).toMatch(regexPattern)

      expect(await aboutUsPage.aboutUsDoctorMission.getText()).toEqual(doctorMissionText)
      expect(await aboutUsPage.aboutusContent).toBeDisplayed()

      const isValidContent = await aboutUsPage.validateAboutUsItemContent(expectedHeaders)
      expect(isValidContent).toBeTruthy()
      await aboutUsPage.aboutUsPage()
      expect(await aboutUsPage.iconsultIntro).toBeDisplayed()
      } catch (error) {
        console.error("An error occurred:", error)
    }
  })
})

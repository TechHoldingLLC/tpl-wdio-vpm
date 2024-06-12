import iConsult from "../pageobjects/iConsult.page.js";
import { Key } from "webdriverio";
import fs from "fs";

describe("iConsult feature- End to End flow", () => {
  beforeEach(async () => {
    await browser.url("");
    await browser.pause(2000);
  });

  it("C29979 iConsult: Verify iConsult flow with Invalid Age", async () => {
    const iConsultEDData = JSON.parse(
      fs.readFileSync("./test/data/iConsultED.json", "utf-8")
    );

    const url: string = await browser.getUrl();
    const language: string = await iConsult.getLanguageFromUrl(url);

    await iConsult.startFreeiConsultbutton.click();
    await browser.pause(2000);
    await iConsult.consentCheckbox.click();
    await browser.pause(2000);
    await iConsult.consentContinueButton.click();
    await browser.pause(5000);
    await iConsult.iConsultEDselection.click();
    await browser.pause(2000);
    await iConsult.insertAge.click();
    await browser.keys([Key.Ctrl, "Left arrow"]);
    await browser.pause(2000);
    const dobLessThan25Years = new Date(
      new Date().setFullYear(
        new Date().getFullYear() - 25,
        new Date().getMonth(),
        new Date().getDate() + 1
      )
    )
      .toISOString()
      .split("T")[0];

    const convertDateFormat = (date: string): string =>
      date.split("-").reverse().slice(0, 2).reverse().join("-") +
      "-" +
      date.split("-")[0];
    const myDate = convertDateFormat(dobLessThan25Years);
    console.log(`Date of birth Less than 25 Years: ${myDate}`);
    await browser.pause(2000);
    const arrValue = [...myDate];
    for (let i = 0; i < arrValue.length; i++) {
      await browser.keys(arrValue[i]);
      await browser.pause(50);
    }
    await browser.pause(1000);
    await iConsult.ageContinue.click();
    await browser.pause(2000);

    const invalidAgeMsg =
      language === "en"
        ? iConsultEDData.iConsultED_InvalidAgeMessage_en
        : iConsultEDData.iConsultED_InvalidAgeMessage_es;
    const iConsultInvalidAgeMessage: string =
      await iConsult.ageTitleMessage.getText();
    console.log(`iConsultInvalidAgeMessage is: ${iConsultInvalidAgeMessage}`);
    expect(await iConsult.ageTitleMessage.getText()).toEqual(invalidAgeMsg);
    await browser.pause(2000);
    await iConsult.backtoHomebtn.click();
    await browser.pause(2000);
  });

  it("C29980 iConsult: Verify iConsult flow with Valid Age", async () => {
    const iConsultEDData = JSON.parse(
      fs.readFileSync("./test/data/iConsultED.json", "utf-8")
    );

    const url: string = await browser.getUrl();
    const language: string = await iConsult.getLanguageFromUrl(url);

    await iConsult.startFreeiConsultbutton.click();
    await iConsult.consentCheckbox.click();
    await iConsult.consentContinueButton.click();
    await browser.pause(5000);
    await iConsult.iConsultEDselection.click();
    await browser.pause(5000);
    await iConsult.insertAge.click();
    await browser.keys([Key.Ctrl, "Left arrow"]);
    await browser.pause(2000);
    const dobMoreThan25Years = new Date(
      new Date().setFullYear(
        new Date().getFullYear() - 26,
        new Date().getMonth(),
        new Date().getDate() + 1
      )
    )
      .toISOString()
      .split("T")[0];

    const convertDateFormat = (date: string): string =>
      date.split("-").reverse().slice(0, 2).reverse().join("-") +
      "-" +
      date.split("-")[0];
    const myDate = convertDateFormat(dobMoreThan25Years);
    console.log(`Date of birth More than 25 Years: ${myDate}`);
    await browser.pause(2000);
    const arrValue = [...myDate];
    for (let i = 0; i < arrValue.length; i++) {
      await browser.keys(arrValue[i]);
      await browser.pause(50);
    }
    await browser.pause(1000);
    await iConsult.ageContinue.click();
    await browser.pause(2000);

    const validAgeMsg =
      language === "en"
        ? iConsultEDData.iConsultED_ValidAgeMessage_en
        : iConsultEDData.iConsultED_ValidAgeMessage_es;
    const iConsultValidAgeMessage: string =
      await iConsult.ageTitleMessage.getText();
    console.log(`iConsultValidAgeMessage is: ${iConsultValidAgeMessage}`);
    expect(await iConsult.ageTitleMessage.getText()).toEqual(validAgeMsg);
    await browser.pause(2000);
    await iConsult.ageSuccessContinuebtn.click();
    await browser.pause(5000);

    const letsStartMsg =
      language === "en"
        ? iConsultEDData.letsGetStarted_en
        : iConsultEDData.letsGetStarted_es;
    const letsGetStartedMessage: string =
      await iConsult.ageTitleMessage.getText();
    await console.log(
      `iConsultLetsGetStartedMessage is: ${letsGetStartedMessage}`
    );
    expect(await iConsult.ageTitleMessage.getText()).toEqual(letsStartMsg);
    await browser.pause(2000);
  });
});

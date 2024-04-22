import { expect } from "@wdio/globals"
import LoginPage from "../pageobjects/vpm_login.page.js"
import fs from 'fs'

describe("VPM Login Feature", () => {
  let logindata: any

  beforeEach(async () => {
    await LoginPage.openSignin()
    await browser.maximizeWindow()
  })

  before(async ()=>{
    const rawData = fs.readFileSync('./test/data/login.json', 'utf-8')
    logindata = JSON.parse(rawData)
  })

  it("Verify Login without entering email and password fields", async ()=>{
    await expect(LoginPage.inputUsername).toBeDisplayed()
    await LoginPage.btnSubmit.click()
    const emailFieldValidationMessage: string = await LoginPage.requiredFieldvalidationMessageForMobileOrEmail.getText()
    expect(emailFieldValidationMessage).toEqual(logindata.login_email_required_message)
    const PasswordFieldValidationMessage: string = await LoginPage.requiredFieldvalidationMessageForPassword.getText()
    expect(PasswordFieldValidationMessage).toEqual(logindata.login_password_required_message)
  })

  it("Verify Login with Invalid credentials - TC08", async () => {
    await expect(LoginPage.inputUsername).toBeDisplayed()
    await LoginPage.login(
      logindata.login_invalid.login_email,
      logindata.login_invalid.login_password
    )
    await browser.waitUntil(
      async () =>
        (await LoginPage.invalidAlert.getText()) ===
        logindata.login_toastMessage
    )
    await expect(LoginPage.invalidAlert).toHaveText(
      logindata.login_toastMessage
    )
  })

  it("Verify Login with Valid Email - TC16", async () => {
    const url: string= await browser.getUrl()
    await expect(LoginPage.inputUsername).toBeDisplayed()
    if(url.includes('qa')){
      await LoginPage.login(
        logindata.login_valid.login_email,
        logindata.login_valid.login_password)
      await expect(LoginPage.hamburgericon).toBeDisplayed()
      await LoginPage.hamburgericon.click()
      await expect(LoginPage.profile_name).toHaveText(logindata.login_userName)
    }
    else{
      await LoginPage.login(
        logindata.stage_login_valid.login_email,
        logindata.stage_login_valid.login_password)
      await expect(LoginPage.hamburgericon).toBeDisplayed()
      await LoginPage.hamburgericon.click()
      await expect(LoginPage.profile_name).toHaveText(logindata.stage_login_userName)
    }
  })

  it("Verify Login with Invalid Cell number - TC17", async () => {
    await expect(LoginPage.inputUsername).toBeDisplayed()
    await LoginPage.login_with_cellnum(
      logindata.login_invalid.login_invalid_phone_num,
      logindata.login_invalid.login_password
    )
    await browser.waitUntil(
      async () =>
        (await LoginPage.invalidAlert.getText()) ===
        logindata.login_toastMessage
    )
    await expect(LoginPage.invalidAlert).toHaveText(
      logindata.login_toastMessage
    )
  })

  it("Verify Login with Valid Cell Number - TC18", async () => {
    const url: string= await browser.getUrl()
    await expect(LoginPage.inputUsername).toBeDisplayed()
    if(url.includes('qa')){
      await LoginPage.login_with_cellnum(
        logindata.login_valid.login_valid_phone_num,
        logindata.login_valid.login_password
      )
    await expect(LoginPage.hamburgericon).toBeDisplayed()
    await LoginPage.hamburgericon.click()
    await expect(LoginPage.profile_name).toHaveText(logindata.login_userName)
    } else{
      await LoginPage.login_with_cellnum(
        logindata.stage_login_valid.login_valid_phone_num,
        logindata.stage_login_valid.login_password
    )
    await expect(LoginPage.hamburgericon).toBeDisplayed()
    await LoginPage.hamburgericon.click()
    await expect(LoginPage.profile_name).toHaveText(logindata.stage_login_userName)
    }
  })
})

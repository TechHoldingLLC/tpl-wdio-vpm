import { expect } from "@wdio/globals"
import LoginPage from "../pageobjects/vpm_login.page.js"
import fs from 'fs'

describe("VPM Sign In Features", () => {
  let logindata: any

  beforeEach(async () => {
    await LoginPage.openSignin()
  })

  before(async ()=>{
    logindata = JSON.parse(fs.readFileSync('./test/data/login.json', 'utf-8'))
  })

  it("C29652 Sign In: Verify User unable to Sign In with invalid email, mobile, or password", async()=>{
    
    // Verify validation message when do login without entering username & password 
    
    await expect(LoginPage.inputUsername).toBeDisplayed()

    const url:string = await browser.getUrl()
    const language: string = await LoginPage.getLanguageFromUrl(url)

    const expectedEmailFieldValidationMessage = language === 'en' ? logindata.login_email_required_message : logindata.login_email_required_message_es
    const expectedPasswordFieldValidationMessage = language === 'en' ? logindata.login_password_required_message : logindata.login_password_required_message_es
  
    await LoginPage.btnSubmit.click()
    const emailFieldValidationMessage: string = await LoginPage.requiredFieldvalidationMessageForMobileOrEmail.getText()
    const PasswordFieldValidationMessage: string = await LoginPage.requiredFieldvalidationMessageForPassword.getText()
    expect(emailFieldValidationMessage).toEqual(expectedEmailFieldValidationMessage)
    expect(PasswordFieldValidationMessage).toEqual(expectedPasswordFieldValidationMessage)

    // Verify toast message when do login with invalid credentials
    
    const loginData = logindata.login_invalid
    let expectedToastMessage: string = language === 'en' ? logindata.login_toastMessage : logindata.login_toastMessage_es

    await LoginPage.login(loginData.login_email, loginData.login_password)
    await browser.pause(2000)
    await LoginPage.invalidAlert.waitForDisplayed()
    const actualToastMessage = await LoginPage.invalidAlert.getText()
    expect(actualToastMessage).toEqual(expectedToastMessage)

    await browser.pause(2000)
    await browser.refresh()

    // Verify toast message when do login with invalid mobile 
       
    await expect(LoginPage.inputUsername).toBeDisplayed()
    await LoginPage.login_with_cellnum(loginData.login_invalid_phone_num, loginData.login_password)
    await browser.pause(2000)
    await LoginPage.invalidAlert.waitForDisplayed()

    const ToastMessage = await LoginPage.invalidAlert.getText()
    expect(ToastMessage).toEqual(expectedToastMessage)
  })

  it("C29650 Sign In: Verify User Sign In with valid email and password", async () => {
    const url: string = await browser.getUrl()
    await expect(LoginPage.inputUsername).toBeDisplayed()
    let loginData: any
    let expectedUserName: string

    if (url.includes('qa')) {
        loginData = logindata.login_valid
        expectedUserName = logindata.login_userName;
    } else if (url.includes('stage')) {
        loginData = logindata.stage_login_valid
        expectedUserName = logindata.stage_login_userName;
    } else {
        loginData = logindata.prod_login_valid
        expectedUserName = logindata.prod_login_userName;
    }

    await LoginPage.login(loginData.login_email, loginData.login_password)
    await expect(LoginPage.hamburgericon).toBeDisplayed()
    await LoginPage.hamburgericon.click()

    await expect(LoginPage.profile_name).toHaveText(expectedUserName)
  })

  it("C29651 Sign In: Verify User Sign In with valid mobile and password", async () => {
    const url: string = await browser.getUrl()
    await expect(LoginPage.inputUsername).toBeDisplayed()
    let loginData: any
    let expectedUserName: string

    if (url.includes('qa')) {
      loginData = logindata.login_valid
      expectedUserName = logindata.login_userName
    } else if (url.includes('stage')) {
      loginData = logindata.stage_login_valid
      expectedUserName = logindata.stage_login_userName
    } else {
      loginData = logindata.prod_login_valid
      expectedUserName = logindata.prod_login_userName
    }

    await LoginPage.login_with_cellnum(
        loginData.login_valid_phone_num,
        loginData.login_password
    )

    await browser.pause(2000)
    await expect(LoginPage.hamburgericon).toBeDisplayed()
    await LoginPage.hamburgericon.click()
    await expect(LoginPage.profile_name).toHaveText(expectedUserName)
  })
})

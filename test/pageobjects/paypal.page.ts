import { $ } from "@wdio/globals";
import Page from "./page.js";

class PayPalPage extends Page {
  /**
   * Waits for the iframe to appear and switches to it
   */
  async switchToPayPalIframe(): Promise<void> {
    const iframe = await $('(//iframe[contains(@id,"jsx-iframe")])[1]');
    await iframe.waitForExist({ timeout: 10000 });
    await iframe.scrollIntoView();
    await browser.switchToFrame(iframe);
  }

  /**
   * Clicks the PayPal button inside the iframe
   */
  async clickPayPalButton(): Promise<void> {
    const paypalButton = await $('div[role="link"][aria-label="PayPal"]');
    await paypalButton.waitForClickable({ timeout: 10000 });
    await paypalButton.click();
    await browser.switchToParentFrame();
  }

  /**
   * Switches to the newly opened PayPal window
   */
  async switchToPayPalWindow(): Promise<void> {
    await browser.waitUntil(
      async () => (await browser.getWindowHandles()).length > 1,
      {
        timeout: 10000,
        timeoutMsg: "New PayPal window did not open in time",
      }
    );
    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[1]);
  }

  /**
   * Logs into PayPal with provided credentials
   * @param username - PayPal email/username
   * @param password - PayPal password
   */
  async loginToPayPal(username: string, password: string): Promise<void> {
    const emailField = await $("#email");
    await emailField.waitForExist({ timeout: 10000 });
    await emailField.addValue(username);

    const nextButton = await $("#btnNext");
    await nextButton.click();
    await browser.pause(2000);

    const passwordField = await $("#password");
    await passwordField.waitForExist({ timeout: 10000 });
    await passwordField.addValue(password);

    const loginButton = await $("#btnLogin");
    await loginButton.waitForClickable({ timeout: 5000 });
    await loginButton.click();

    // Wait until the Continue button appears
    const continueButton = await $("//button[normalize-space()='Continue']");
    await continueButton.waitForExist({ timeout: 15000 });
  }

  /**
   * Completes the PayPal payment process
   */
  async confirmPayPalPayment(): Promise<void> {
    const continueButton = await browser.$(
      "//button[normalize-space()='Continue']"
    );
    await continueButton.scrollIntoView();
    await continueButton.waitForClickable({ timeout: 10000 });
    await continueButton.click();

    const confirmButton = await $("#confirmButtonTop");
    await confirmButton.waitForClickable({ timeout: 10000 });
    await confirmButton.click();
  }

  /**
   * Switches back to the original window
   */
  async switchBackToMainWindow(): Promise<void> {
    await browser.waitUntil(
      async () => (await browser.getWindowHandles()).length === 1,
      {
        timeout: 10000,
        timeoutMsg: "Main window did not restore in time",
      }
    );
    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[0]);
  }
}

export default new PayPalPage();

import Page from "./page.js";

class ProfilePage extends Page {
  /**
   * @description Gets the profile settings header element.
   * @returns {WebdriverIO.Element} The profile settings header.
   */
  public get profileSettings() {
    return $("div[class='d-flex align-items-center'] h2");
  }

  /**
   * @description Gets the user details header element (usually the username or profile name).
   * @returns {WebdriverIO.Element} The user details header.
   */
  public get userDetails() {
    return $('//div[@class="title-line"]/h4');
  }

  /**
   * @description Gets the credentials section header element.
   * @returns {WebdriverIO.Element} The credentials section header.
   */
  public get credentials() {
    return $('//div[@class="title-line mt-40"]/h4');
  }

  /**
   * @description Gets the email input field element.
   * @returns {WebdriverIO.Element} The email input field.
   */
  public get emailInput() {
    return $("#email");
  }

  /**
   * @description Determines the language from the URL based on the presence of "/en/" for English or "/es/" for Spanish.
   * @param {string} url - The URL to check for language.
   * @returns {Promise<string>} Returns "en" for English or "es" for Spanish.
   */
  public async getLanguageFromUrl(url: string): Promise<string> {
    return url.includes("/en/") ? "en" : "es";
  }
}

export default new ProfilePage();

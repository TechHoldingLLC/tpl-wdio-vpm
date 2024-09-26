export default class Page {
  /**
   * Retrieves the language from the given URL.
   * Checks if the URL contains '/en' for English or defaults to Spanish ('es').
   *
   * @param {string} url - The URL string to check.
   * @returns {Promise<string>} - A promise that resolves to the language code ('en' or 'es').
   */
  public async getLanguageFromUrl(url: string): Promise<string> {
    return url.includes("/en") ? "en" : "es";
  }
}

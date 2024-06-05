export default class Page {
  public async getLanguageFromUrl(url: string): Promise<string> {
    return url.includes("/en") ? "en" : "es";
  }
}

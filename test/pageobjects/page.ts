import { browser } from "@wdio/globals";

export default class Page {
  public open(path: string) {
    return browser.url(`https://qa.viapromeds.com/en/${path}`);
    //return browser.url(`https://qa.viapromeds.com/${path}`);
    //return browser.url(`https://stage.viapromeds.com/${path}`);
    //return browser.url(`https://stage.viapromeds.com/en/${path}`);
    //return browser.url(`https://viapromeds.com/${path}`);
    //return browser.url(`https://viapromeds.com/en/${path}`);
  }

  public async getLanguageFromUrl(url: string): Promise<string> {
    return url.includes('/en') ? 'en' : 'es'
  }
}

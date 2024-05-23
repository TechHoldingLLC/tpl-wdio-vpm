import Page from "./page.js";

class ProfilePage extends Page {
  public get profileSettings() {
    return $("div[class='d-flex align-items-center'] h2");
  }

  public get userDetails() {
    return $('//div[@class="title-line"]/h4');
  }

  public get credentials() {
    return $('//div[@class="title-line mt-40"]/h4');
  }

  public get emailInput() {
    return $("#email");
  }

  public async getLanguageFromUrl(url: string): Promise<string> {
    return url.includes("/en/") ? "en" : "es";
  }
}

export default new ProfilePage();

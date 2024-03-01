import iConsultPage from "../pageobjects/iconsult.page";
import LoginPage from "../pageobjects/vpm_login.page";
import logindata from "../data/login.json";

describe("iConsult Features", () => {
  before("Open iConsult", async () => {
    await LoginPage.openSignin();
  });

  it("iConsult Flow with Login - ED - TC14", async () => {
    await LoginPage.login(logindata.valid.email, logindata.valid.password);
    await browser.pause(5000);
    await iConsultPage.iConsultED();
  });
});

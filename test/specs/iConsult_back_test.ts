import iConsultFlow from "../pageobjects/iconsult.ED.page";
import LoginPage from "../pageobjects/vpm_login.page";
import logindata from "../data/login.json";

describe("iConsult Features", () => {
  before("Open iConsult", async () => {
    await LoginPage.openSignin();
    await browser.maximizeWindow();
  });

  it("Verify iConsult Flow - Back Button Scenario - TC16", async () => {
    await LoginPage.login(
      logindata.login_valid.login_email,
      logindata.login_valid.login_password
    );
    await browser.pause(5000);
    await iConsultFlow.iConsultED();
    await browser.pause(2000);
  });
});

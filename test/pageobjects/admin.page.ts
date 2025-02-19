import fs from "fs";
import pkg from "lodash";
const { isEqual } = pkg;

class AdminPage {
  // ---------- Locators ----------

  /**
   * Returns the Admin Portal header element (H1 tag).
   */
  public get header() {
    return $("h1");
  }

  /**
   * Returns the 'Sign In With SSO' button element.
   */
  public get signInWithSSOButton() {
    return $("//a[.='SIGN IN WITH SSO']");
  }

  /**
   * Returns the EHR username input field element.
   */
  public get EHRUserNameField() {
    return $("#username");
  }

  /**
   * Returns the EHR 'Continue' button element.
   */
  public get EHRContinueButton() {
    return $("//input[@type='submit']");
  }

  /**
   * Returns the EHR password input field element.
   */
  public get EHRPasswordField() {
    return $("#password");
  }

  /**
   * Returns the EHR login button element.
   */
  public get EHRLoginButton() {
    return $("#login");
  }

  /**
   * Returns the iConsult approval list header element (H2 tag).
   */
  public get iConsultApprovalList() {
    return $("h2");
  }

  /**
   * Returns the admin side panel navigation list element.
   */
  public get adminSidePannelList() {
    return $("//a[contains(@class, 'PatientList_navbar-link')]");
  }

  /**
   * Returns a list of tab options under the iConsult approval list.
   */
  public get iConsultApprovalListTabOptions() {
    return $$("//div[@class='custom-tab']/ul/li");
  }

  /**
   * Returns the search box element for order ID.
   */
  public get orderIdSearchBox() {
    return $("#search");
  }

  /**
   * Returns the search button element for order search.
   */
  public get orderSearchButton() {
    return $("//button[@class='PatientList_search-icon__SNoRa']");
  }

  /**
   * Returns a list of rows in the order search result table.
   */
  public get searchResulRow() {
    return $$("//table[contains(@class,'PatientList_table-data')]/tbody/tr");
  }

  /**
   * Returns the select order checkbox element.
   */
  public get selectOrderCheckBox() {
    return $(
      "//table[contains(@class,'PatientList_table-data')]/tbody/tr/td[1]"
    );
  }

  /**
   * Returns the text element indicating order selection.
   */
  public get orderSelectionText() {
    return $("//span[contains(@class, 'PatientList_selected-item-text')]");
  }

  /**
   * Returns the 'Send to EHR' button element.
   */
  public get sendToEHRButton() {
    return $("button[type=submit]");
  }

  /**
   * Returns the 'In Progress' tab element.
   */
  public get InProgressTab() {
    return $("//li[.='In Progress']");
  }

  /**
   * Returns the first row in the order search result.
   */
  public get orderSearchedResult() {
    return $("//table/tbody/tr/td[1]");
  }

  /**
   * Returns the order payment status in the 'In Progress' tab.
   */
  public get orderPaymentStatusInProgressTab() {
    return $("//table/tbody/tr/td[7]");
  }

  /**
   * Returns the order status in the 'In Progress' tab.
   */
  public get orderStatusInProgressTab() {
    return $("//table/tbody/tr/td[8]/span");
  }

  /**
   * Returns the order details button element.
   */
  public get orderDetailsButton() {
    return $(
      "//button[@class='btn-secondary btn-xs PatientList_action-btn__Y_iGX ']"
    );
  }

  /**
   * Returns the order detail option element.
   */
  public get orderDetailOption() {
    return $(
      "//span[@class='PatientList_dropdwon-link__DTkj_ PatientList_dropdwon-link-current__be3eG']"
    );
  }

  /**
   * Returns the action button element.
   */
  public get actionButton() {
    return $("//div[@class='PatientList_action-btn-main__wInQD ']");
  }

  /**
   * Returns the action order details button element.
   */
  public get actionOrderDetailsBtn() {
    return $(
      "//span[@class='PatientList_dropdwon-link__DTkj_ PatientList_dropdwon-link-current__be3eG']"
    );
  }

  /**
   * Returns the header element for the order details page.
   */
  public get orderDetailsPageHeader() {
    return $("//h5[@class='title MyOrder_add-title__kY6C6']");
  }

  /**
   * Returns the close icon element on the order details page.
   */
  public get orderDetailsCloseIcon() {
    return $("//span[contains(@class,'MyOrder_close-icon')]");
  }

  /**
   * Returns the progress marker element in the progress tracking.
   */
  public get progressMakerElement() {
    return $(
      "//li[@class='progress-step is-complete']//div[@class='progress-marker']"
    );
  }

  /**
   * Returns the medicine name element in the order details.
   */
  public get medicineName() {
    return $("div[class='MyOrder_title-qty__X6JMm'] h4");
  }

  /**
   * Returns the unpaid payment status element in the order details.
   */
  public get orderPaymentTotalStatus() {
    return $(".badge.badge-sm.undefined.MyOrder_orange-badge__yuTSW");
  }

  /**
   * Returns the paid payment status element in the order details.
   */
  public get orderPaidPaymentStatus() {
    return $(".badge.badge-sm.undefined.MyOrder_green-badge__9Tk0B");
  }

  /**
   * Returns the 'Ordered' element in the tracking history.
   */
  public get orderedElement() {
    return $("//li[contains(.,'Ordered')]");
  }

  /**
   * Returns the 'Approved' element in the tracking history.
   */
  public get approvedElement() {
    return $("//li[contains(.,'Approved')]");
  }

  // ---------- Methods ----------

  /**
   * Launches the Admin Portal based on the current environment (QA, Stage, Production).
   * It checks the current URL and navigates to the appropriate Admin portal.
   */
  public async launchAdminPortal() {
    await browser.url(""); // Initial browser URL to capture current environment
    let currentUrl = await browser.getUrl();

    // Redirect to appropriate Admin portal based on current environment
    if (currentUrl.includes("qa")) {
      await browser.url("http://admin.qa.viapromeds.com");
    } else if (currentUrl.includes("stage")) {
      await browser.url("http://admin.stage.viapromeds.com");
    } else {
      await browser.url("http://admin.viapromeds.com");
    }

    // Logging the final Admin URL
    currentUrl = await browser.getUrl();
    console.log(`Admin URL: ${currentUrl}`);
  }

  /**
   * Logs into the Admin Panel via the SSO flow.
   * Uses different credentials based on the current environment (QA, Stage, or Prod).
   */
  public async loginToAdminPanel() {
    const url: string = await browser.getUrl(); // Get the current URL to determine environment

    // Initiates SSO login flow
    await this.signInWithSSOButton.waitForClickable();
    await this.signInWithSSOButton.click();
    await browser.pause(5000);

    // Set username and password based on the environment
    if (url.includes("qa")) {
      await this.EHRUserNameField.waitForDisplayed();
      await this.EHRUserNameField.setValue("vipul123");
      await this.EHRContinueButton.waitForClickable();
      await this.EHRContinueButton.click();
      await browser.pause(3000);
      await this.EHRPasswordField.waitForDisplayed();
      await this.EHRPasswordField.setValue("Tech5@1234567890");
      await this.EHRLoginButton.waitForClickable();
      await this.EHRLoginButton.click();
      await browser.pause(5000);
    } else {
      await this.EHRUserNameField.waitForDisplayed();
      await this.EHRUserNameField.setValue("DLinares");
      await this.EHRContinueButton.waitForClickable();
      await this.EHRContinueButton.click();
      await browser.pause(3000);
      await this.EHRPasswordField.waitForDisplayed();
      await this.EHRPasswordField.setValue("Rosemead@91770&9312");
      await this.EHRLoginButton.waitForClickable();
      await this.EHRLoginButton.click();
      await browser.pause(5000);
    }
  }

  /**
   * Validates that the iConsult approval list contains the expected tab options.
   *
   * @returns A boolean indicating if the actual tab options match the expected options.
   */
  public async validateiConsultApprovalListTab(): Promise<boolean> {
    const tabList = await this.iConsultApprovalListTabOptions;
    const actualTabsOptions: string[] = [];
    const expectedTableTabList: string[] = [
      "Pending",
      "In Progress",
      "Completed",
    ];

    // Gather text for each tab and compare to expected options
    for (const el of tabList) {
      actualTabsOptions.push(await el.getText());
    }

    const isSuccess =
      JSON.stringify(actualTabsOptions) ===
      JSON.stringify(expectedTableTabList);
    console.log(isSuccess ? "Success" : "Failure");
    return isSuccess;
  }

  /**
   * Reads and returns the order details (product name and order number) from a JSON file.
   *
   * @returns An object containing the product name and order number.
   */
  public async orderDetails(): Promise<{
    productName: string;
    orderNumber: string;
  }> {
    const orders = JSON.parse(
      fs.readFileSync("./test/data/generatedOrderDetails.json", "utf8")
    );

    // Extract product name and order number from JSON file
    const productName = Object.keys(orders)[0];
    const orderNumber = orders[productName];

    console.log(`Product Name: ${productName}`);
    console.log(`Order Number: ${orderNumber}`);

    return { productName, orderNumber };
  }

  /**
   * Enters the order number and performs a search for that order.
   *
   * @param orderNumber - The order number to search for.
   */
  public async orderSearch(orderNumber: string) {
    await this.orderIdSearchBox.addValue(orderNumber); // Enter order number
    await browser.pause(1000);
    await this.orderSearchButton.click(); // Perform search
    await browser.pause(3500);
  }

  /**
   * Validates the number of rows in the search results.
   *
   * @returns The number of rows found in the search results.
   */
  public async validateOrderSearch() {
    const rows = await this.searchResulRow;
    const length = rows.length;
    console.log(`Number of rows: ${length}`);
    return length;
  }

  public async searchedOrderDetails(): Promise<{
    orderId: string;
    orderPaymentStatus: string;
    orderStatus: string;
  }> {
    // Extracting order details
    const orderId = await $(
      "body > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(10) > div:nth-child(1)"
    ).getText();
    const orderPaymentStatus = await $(
      "//td[normalize-space()='Pending']"
    ).getText();
    await browser.pause(1000);
    const orderStatus = await $(
      "body > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(9) > span:nth-child(1)"
    ).getText();
    // Returning order details
    return { orderId, orderPaymentStatus, orderStatus };
  }

  /**
   * Validates if the background color of the progress marker element is green.
   *
   * @returns A boolean indicating if the background color is green.
   */
  public async isElementBackgroundColorGreen(): Promise<boolean> {
    const element = await this.progressMakerElement;

    const getComputedStyleJs = `
            const elem = arguments[0];
            const afterPseudoElement = getComputedStyle(elem, '::after');
            return afterPseudoElement.getPropertyValue('background-color');
        `;

    const backgroundColor = await browser.execute(getComputedStyleJs, element);
    console.log(backgroundColor);

    // Convert RGB to Hex
    const rgbValues = (backgroundColor as string).match(/\d+/g);
    const hexColor = `#${(rgbValues ?? [])
      .map((value) => parseInt(value, 10).toString(16).padStart(2, "0"))
      .join("")}`;
    console.log(hexColor); // Output: #1C7E0C

    // Validate that the color is a shade of green
    const isGreen: boolean =
      hexColor.startsWith("#") &&
      parseInt(hexColor.substring(1, 3), 16) < 80 &&
      parseInt(hexColor.substring(3, 5), 16) > 100;

    return isGreen;
  }

  // Get Order Information from the order details

  public async getOrderInformation(): Promise<string> {
    const orderId = await $("//span[contains(@class, 'MyOrder_order-id')]");
    const actualOrderId: string = await orderId.getText();
    const order: string = actualOrderId.split(":")[1].trim();
    return order;
  }

  // Validate the Track History option

  public async validateTrackHistoryOptions() {
    const trackHistoryOptions = await $$(
      '//li[contains(@class, "progress-step")]//h4'
    );
    const expectedOptions = [
      "Ordered",
      "Approved",
      "Prescribed",
      "Shipped",
      "Delivered",
    ];
    let actualOptions: string[] = [];
    if (trackHistoryOptions.length === 0) {
      console.error("trackHistory options are not found.");
      return false;
    }
    for (const option of trackHistoryOptions) {
      const optionText = await option.getText();
      actualOptions.push(optionText);
    }
    console.log(actualOptions);
    if (isEqual(actualOptions.sort(), expectedOptions.sort())) {
      return true;
    }
    return false;
  }
}

export default new AdminPage();

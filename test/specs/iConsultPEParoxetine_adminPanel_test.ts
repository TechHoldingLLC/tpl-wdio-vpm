import adminPage from "../pageobjects/admin.page.js";

describe("Admin Panel features", () => {
  let orderID: string;
  let expectedMedicineName: string;

  before(async () => {
    await adminPage.launchAdminPortal();
    await adminPage.header.waitForDisplayed();
  });

  it("C29664 Admin Panel: Verify iConsult completed orders in the Admin Panel Pending Tab", async () => {
    expect(browser).toHaveUrl(/^https:\/\/admin\./);
    expect(await adminPage.header.getText()).toEqual("Admin");
    await adminPage.loginToAdminPanel();
    expect(await browser.getUrl()).toHaveText("patients");

    await adminPage.iConsultApprovalList.waitForDisplayed();
    expect(await adminPage.iConsultApprovalList.getText()).toEqual(
      "iConsult Approval List"
    );

    await adminPage.adminSidePannelList.waitForDisplayed();
    expect(await adminPage.adminSidePannelList.getText()).toEqual(
      "Prescriptions"
    );
    expect(await adminPage.validateiConsultApprovalListTab()).toBeTruthy();

    const orderDetails = await adminPage.orderDetails();
    orderID = orderDetails.orderNumber;
    await adminPage.orderSearch(orderDetails.orderNumber);
    const orderSearchResultCount = await adminPage.validateOrderSearch();
    expect(orderSearchResultCount).toEqual(1);

    const searchedOrderData = await adminPage.searchedOrderDetails();
    expect(searchedOrderData.orderId).toEqual(orderDetails.orderNumber);
    expect(searchedOrderData.orderPaymentStatus).toEqual("Pending");
    expect(searchedOrderData.orderStatus).toEqual("Medication pending");
  });

  it("C29684 Admin Panel: Verify Pending Tab Order Detail action works", async () => {
    await adminPage.orderDetailsButton.click();
    await adminPage.orderDetailsPageHeader.waitForDisplayed();
    const orderDetailsHeaderText: string =
      await adminPage.orderDetailsPageHeader.getText();
    console.log(orderDetailsHeaderText);
    expect(orderDetailsHeaderText).toEqual("Order Details");
    expect(await adminPage.getOrderInformation()).toEqual(orderID);

    const actualMedicineName: string = await adminPage.medicineName.getText();
    console.log(actualMedicineName);
    const orderDetails = await adminPage.orderDetails();
    expectedMedicineName = orderDetails.productName;
    expect(actualMedicineName).toEqual(expectedMedicineName);

    const paymentStatus: string =
      await adminPage.orderPaymentTotalStatus.getText();
    expect(paymentStatus).toEqual("Pending");

    const orderedElement = await adminPage.orderedElement;
    await orderedElement.waitForExist();
    await orderedElement.waitForDisplayed();
    expect(orderedElement).toHaveElementClass("is-complete");

    const isTrackingOptions: boolean =
      await adminPage.validateTrackHistoryOptions();
    expect(isTrackingOptions).toBeTruthy();
    const isGreen = await adminPage.isElementBackgroundColorGreen();
    expect(isGreen).toBeTruthy();
    await browser.pause(2000);
    await adminPage.orderDetailsCloseIcon.click();
    await browser.pause(1000);
  });

  it("C29665 Admin Panel: Verify that User is able to send Order to EHR", async () => {
    await adminPage.selectOrderCheckBox.click();
    await browser.pause(1000);
    console.log("Order selected successfully");
    await adminPage.orderSelectionText.waitForDisplayed();
    expect(await adminPage.orderSelectionText.getText()).toEqual("1 Selected");
    await adminPage.sendToEHRButton.waitForClickable();
    await adminPage.sendToEHRButton.click();
    await browser.pause(5000);
    await adminPage.InProgressTab.waitForDisplayed();
    expect(await adminPage.InProgressTab.getText()).toEqual("In Progress");
    await adminPage.InProgressTab.click();
    await browser.pause(3000);
    await adminPage.orderSearch(orderID);
    const orderSearchedResult = await adminPage.orderSearchedResult.getText();
    expect(orderSearchedResult).toEqual(orderID);
    expect(
      await adminPage.orderPaymentStatusInProgressTab.getText()
    ).toHaveText("Paid");
    expect(await adminPage.orderStatusInProgressTab.getText()).toEqual(
      "Medication sent to EHR"
    );
    console.log("Medication sent to EHR successfully");
  });

  it("C29687 Admin Panel: Verify In Progress Tab Order Detail action works", async () => {});
});

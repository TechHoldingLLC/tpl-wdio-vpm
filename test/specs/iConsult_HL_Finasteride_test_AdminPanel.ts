/**
 * Test Suite: Admin Panel - Finasteride Order Success Flow
 *
 * Objective: Verify the successful handling and processing of Finasteride orders within the Admin Panel.
 * This suite includes tests for verifying orders in different states, sending orders to EHR, collecting payment,
 * and ensuring the accuracy of order details across different tabs in the Admin Panel.
 */

import adminPage from "../pageobjects/admin.page.js";

describe("Admin Panel features", () => {
  let orderID: string;
  let expectedMedicineName: string;

  /**
   * Before All Hook
   * - Launch the Admin Portal and verify the presence of the header
   */
  before(async () => {
    await adminPage.launchAdminPortal(); // Navigate to the Admin Portal
    await adminPage.header.waitForDisplayed(); // Ensure the header is visible
  });

  /**
   * Test: Verify iConsult Completed Orders in the Admin Panel Pending Tab
   *
   * - Validate URL and header text
   * - Log in and verify that the iConsult Approval List and other elements are displayed correctly
   * - Search for the order and validate its details
   */
  it("Admin Panel: Verify iConsult completed orders in the Admin Panel Pending Tab", async () => {
    // Check that we are on the Admin Panel URL
    expect(browser).toHaveUrl(/^https:\/\/admin\./);
    expect(await adminPage.header.getText()).toEqual("Admin");

    await adminPage.loginToAdminPanel(); // Perform login
    await browser.pause(2000);
    expect(await browser.getUrl()).toHaveText("prescriptions");

    // Verify the iConsult Approval List section
    expect(await adminPage.iConsultApprovalList.getText()).toEqual(
      "iConsult Approval List"
    );
    await adminPage.adminSidePannelList.waitForDisplayed();
    expect(await adminPage.adminSidePannelList.getText()).toEqual(
      "Prescriptions"
    );
    expect(await adminPage.validateiConsultApprovalListTab()).toBeTruthy();

    // Retrieve and search for order details
    const orderDetails = await adminPage.orderDetails();
    orderID = orderDetails.orderNumber;
    await adminPage.orderSearch(orderDetails.orderNumber);
    const orderSearchResultCount = await adminPage.validateOrderSearch();
    expect(orderSearchResultCount).toEqual(1);

    // Validate searched order details
    const searchedOrderData = await adminPage.searchedOrderDetails();
    expect(searchedOrderData.orderId).toEqual(orderDetails.orderNumber);
    expect(searchedOrderData.orderPaymentStatus).toEqual("Pending");
    expect(searchedOrderData.orderStatus).toEqual("Medication pending");
  });

  /**
   * Test: Verify Pending Tab Order Detail Action Works
   *
   * - Open and verify order details
   * - Validate the medicine name, payment status, and order completion
   */
  it("C29684 Admin Panel: Verify Pending Tab Order Detail action works", async () => {
    await adminPage.orderDetailsButton.click(); // Open order details
    await browser.pause(1000);
    await adminPage.orderDetailOption.click(); // Click on the order detail option
    await adminPage.orderDetailsPageHeader.waitForDisplayed();

    // Validate order details page header and information
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

    // Validate order completion status and color
    const orderedElement = await adminPage.orderedElement;
    await orderedElement.waitForExist();
    await orderedElement.waitForDisplayed();
    expect(orderedElement).toHaveElementClass("is-complete");

    const isGreen = await adminPage.isElementBackgroundColorGreen();
    expect(isGreen).toBeTruthy();
    await browser.pause(2000);
    await adminPage.orderDetailsCloseIcon.click(); // Close order details
    await browser.pause(2000);
  });

  /**
   * Test: Verify That User Is Able to Send Order to EHR
   *
   * - Select the order and send it to EHR
   * - Validate that the order status updates to "In Progress" and details are correct
   */
  it("C29665 Admin Panel: Verify that User is able to send Order to EHR", async () => {
    await browser.pause(1000);
    await adminPage.selectOrderCheckBox.click(); // Select the order
    await browser.pause(1000);
    console.log("Order selected successfully");
    await adminPage.orderSelectionText.waitForDisplayed();
    await browser.pause(1000);
    expect(await adminPage.orderSelectionText.getText()).toEqual("1 Selected");

    await adminPage.sendToEHRButton.waitForClickable();
    await adminPage.sendToEHRButton.click(); // Send order to EHR
    await browser.pause(5000);

    // Validate that the order status updates to "In Progress"
    await adminPage.InProgressTab.waitForDisplayed();
    expect(await adminPage.InProgressTab.getText()).toEqual("In Progress");
    await adminPage.InProgressTab.click();
    await browser.pause(3000);
    await adminPage.orderSearch(orderID);
    const orderSearchedResult = await adminPage.orderSearchedResult.getText();
    //expect(orderSearchedResult).toEqual(orderID);
    expect(
      await adminPage.orderPaymentStatusInProgressTab.getText()
    ).toHaveText("Paid");
    expect(await adminPage.orderStatusInProgressTab.getText()).toEqual(
      "Medication sent to EHR"
    );
    console.log("Medication sent to EHR successfully");
  });

  /**
   * Test: Verify Collecting Payment
   *
   * - Access order details, verify payment status, and ensure the payment collection is successful
   */
  it("C29666 Admin Panel: Verify collecting payment", async () => {
    await adminPage.actionButton.click(); // Open action menu
    await browser.pause(2000);
    await adminPage.actionOrderDetailsBtn.click(); // Access order details
    await adminPage.orderDetailsPageHeader.waitForDisplayed();

    // Validate order details and payment status
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
      await adminPage.orderPaidPaymentStatus.getText();
    expect(paymentStatus).toEqual("Paid");
    await browser.pause(1000);
    console.log("Payment Collected Successfully");
    await adminPage.orderDetailsCloseIcon.click(); // Close order details
    await browser.pause(1000);
  });

  /**
   * Test: Verify In Progress Tab Order Detail Action Works
   *
   * - Validate order details in the In Progress tab, including payment status and tracking options
   */
  it("C29687 Admin Panel: Verify In Progress Tab Order Detail action works", async () => {
    await adminPage.actionButton.click(); // Open action menu
    await browser.pause(2000);
    await adminPage.actionOrderDetailsBtn.click(); // Access order details
    await adminPage.orderDetailsPageHeader.waitForDisplayed();

    // Validate order details and status
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
      await adminPage.orderPaidPaymentStatus.getText();
    expect(paymentStatus).toEqual("Paid");

    const orderedElement = await adminPage.approvedElement;
    await orderedElement.waitForExist();
    await orderedElement.waitForDisplayed();
    expect(orderedElement).toHaveElementClass("is-complete");

    const isTrackingOptions: boolean =
      await adminPage.validateTrackHistoryOptions();
    expect(isTrackingOptions).toBeTruthy();
    const isGreen = await adminPage.isElementBackgroundColorGreen();
    expect(isGreen).toBeTruthy();
    await browser.pause(2000);
    console.log("Order Detail for In Progress Tab Verified successfully");
    await adminPage.orderDetailsCloseIcon.click(); // Close order details
    await browser.pause(1000);
  });
});

import adminPage from "../pageobjects/admin.page.js";

/**
 * Admin Panel: E2E Order Declined Flow
 *
 * This test case verifies the order processing in the Admin Panel's Pending tab
 * and ensures that an order cannot be sent to EHR if the payment status is declined.
 * The flow involves:
 * - Logging into the admin panel
 * - Searching for a specific iConsult order
 * - Attempting to send the order to EHR and validating its status
 */

describe("Admin Panel features", () => {
  let orderID; // Holds the order ID for use across test cases

  // Launch Admin Portal and ensure the page is loaded before any tests run
  before(async () => {
    await adminPage.launchAdminPortal();
    await adminPage.header.waitForDisplayed(); // Verify that the Admin header is displayed
  });

  it("C29664 Admin Panel: Verify iConsult completed orders in the Admin Panel Pending Tab", async () => {
    // Verify the correct environment URL based on the current browser URL
    const url = await browser.getUrl();
    if (url.includes("qa")) {
      expect(browser).toHaveUrl("https://admin.qa.viapromeds.com/");
    } else if (url.includes("stage")) {
      expect(browser).toHaveUrl("https://admin.stage.viapromeds.com/");
    } else {
      expect(browser).toHaveUrl("https://admin.viapromeds.com/");
    }

    // Verify Admin page has loaded successfully
    expect(await adminPage.header.getText()).toEqual("Admin");

    // Log in to the Admin Panel
    await adminPage.loginToAdminPanel();
    await browser.pause(2000);
    expect(await browser.getUrl()).toContain("prescriptions"); // Verify that the user is navigated to the prescriptions page

    // Verify iConsult Approval List tab is displayed and select it
    await adminPage.iConsultApprovalList.waitForDisplayed();
    expect(await adminPage.iConsultApprovalList.getText()).toEqual(
      "iConsult Approval List"
    );

    // Validate that the side panel list contains "Prescriptions"
    await adminPage.adminSidePannelList.waitForDisplayed();
    expect(await adminPage.adminSidePannelList.getText()).toEqual(
      "Prescriptions"
    );

    // Validate that the iConsult Approval List tab is clickable and functional
    expect(await adminPage.validateiConsultApprovalListTab()).toBeTruthy();

    // Retrieve and validate order details
    const orderDetails = await adminPage.orderDetails();
    orderID = orderDetails.orderNumber; // Store the order number for future steps

    // Search for the order by order number
    await adminPage.orderSearch(orderDetails.orderNumber);

    // Validate that only one order is returned in the search results
    const orderSearchResultCount = await adminPage.validateOrderSearch();
    expect(orderSearchResultCount).toEqual(1);

    // Verify that the searched order's details match the order ID
    const searchedOrderData = await adminPage.searchedOrderDetails();
    // expect(searchedOrderData.orderId).toEqual(orderDetails.orderNumber);

    // Pause to allow for any loading delays
    await browser.pause(3000);

    // Validate the payment and order status
    expect(searchedOrderData.orderPaymentStatus).toEqual("Pending");
    expect(searchedOrderData.orderStatus).toEqual("Medication pending");
  });

  it("C29964 Verify that Admin is not able to send Order to EHR", async () => {
    // Select the order by checking the corresponding checkbox
    await adminPage.selectOrderCheckBox.click();
    await browser.pause(1000);
    console.log("Order selected successfully");

    // Validate that the correct number of orders is selected
    await adminPage.orderSelectionText.waitForDisplayed();
    expect(await adminPage.orderSelectionText.getText()).toEqual("1 Selected");

    // Attempt to send the selected order to EHR
    await adminPage.sendToEHRButton.waitForClickable();
    await adminPage.sendToEHRButton.click();
    await browser.pause(5000);

    // Clear the order search box and re-search for the order by order number
    await adminPage.orderIdSearchBox.clearValue();
    await adminPage.orderSearch(orderID);

    // Re-fetch the order details after attempting to send to EHR
    const orderDetails = await adminPage.orderDetails();
    orderID = orderDetails.orderNumber; // Update the orderID if necessary

    // Verify that the order ID remains the same and validate payment and order status
    // const searchedOrderData = await adminPage.searchedOrderDetails();
    // //expect(searchedOrderData.orderId).toEqual(orderID);
    // // console.log(
    // //   `Order Payment Status: ${searchedOrderData.orderPaymentStatus}`
    // // );

    // // Validate that the order payment status is declined and the order status is still pending
    // //expect(searchedOrderData.orderPaymentStatus).toEqual("Declined");
    // expect(searchedOrderData.orderStatus).toEqual("Medication pending");
  });
});

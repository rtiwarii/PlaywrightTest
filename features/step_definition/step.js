const { Given, When, Then } = require('@cucumber/cucumber');
const { test, expect } = require("@playwright/test");
const playwright = require("playwright");
const {POManager} = require("../../pageObject/POManager");

Given('Login to Ecommerce application with {string} and {string} for {string}', {timeout: 10*1000 }, async function (emailID, passwordID, prodName) {
    this.emailID = emailID;
    this.poManager = new POManager(this.page, prodName);
    const url = "https://rahulshettyacademy.com/client";
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goto(url);
    await loginPage.validLogin(emailID,passwordID);

});

When('Add {string} to cart', async function (prodName) {
  
    const dashboardPage = this.poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(prodName);
    await dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed to cart', async function (prodName) {

    const myCartPage = this.poManager.getMyCartPage();
    await myCartPage.validateProductOnMyCart();
    await myCartPage.navigateToCheckout();
});

When('Enter valid details and place order', async function () {

    const checkoutPage = this.poManager.getCheckoutPage();
    await checkoutPage.performCheckout(this.emailID);
    await checkoutPage.placeOrder();
});

Then('Verify Order is present in Order History page', async function () {

    const thankYouPlacedOrderPage = this.poManager.getThankYouPlacedOrderPage();
    const orderIDNumber = await thankYouPlacedOrderPage.validateThankyouPageDetails();
    await thankYouPlacedOrderPage.navigateToOrders();      
    const yourOrdersPage = this.poManager.getYourOrdersPagee();
    await yourOrdersPage.searchAndViewYourOrders(orderIDNumber);
});


Given('Login to Ecommerce2 application with {string} and {string}', async function (emailID, passwordID) {

    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await expect(this.page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await this.page.locator("//input[@id='username']").fill(emailID);
    await this.page.locator("//input[@id='password']").fill(passwordID);
    await this.page.locator("//input[@id='signInBtn']").click();

});

Then('Verify Error message is displayed', async function () {

    console.log(await this.page.locator("//div[contains(@class,'alert-danger') and @style='display: block;']").textContent());
    await expect(this.page.locator("//div[contains(@class,'alert-danger') and @style='display: block;']")).toContainText("Incorrect username/password");

});




    

    
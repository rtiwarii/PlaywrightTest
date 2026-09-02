const { test, expect } = require("@playwright/test");
const {POManager} = require("../pageObject/POManager");
const dataset = JSON.parse(JSON.stringify(require("../utils/placeOrder.json")));
const {customeTest} = require("../utils/test-base");
test.describe.configure({mode: 'serial'});
for(const data of dataset){
    test(`@Web Successful Login Test for ${data.prodName}`, async ({page})=>{
    
        // const prodName = "ZARA COAT 3";
        // const emailID = "tiwarii.rajnish90@gmail.com";
        // const passwordID = "Rajnish@11";
        const url = "https://rahulshettyacademy.com/client";
    
        const poManager = new POManager(page, data.prodName);
        const loginPage = poManager.getLoginPage();
        await loginPage.goto(url);
        await loginPage.validLogin(data.emailID,data.passwordID);

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(data.prodName);
        await dashboardPage.navigateToCart();

        const myCartPage = poManager.getMyCartPage();
        await myCartPage.validateProductOnMyCart();
        await myCartPage.navigateToCheckout();

        const checkoutPage = poManager.getCheckoutPage();
        await checkoutPage.performCheckout(data.emailID);
        await checkoutPage.placeOrder();

        const thankYouPlacedOrderPage = poManager.getThankYouPlacedOrderPage();
        const orderIDNumber = await thankYouPlacedOrderPage.validateThankyouPageDetails();
        await thankYouPlacedOrderPage.navigateToOrders();    
        
        const yourOrdersPage = poManager.getYourOrdersPagee();
        await yourOrdersPage.searchAndViewYourOrders(orderIDNumber);

    });
}


customeTest('@Web Successful Login Test', async ({page, testDataForOrder})=>{

    const url = "https://rahulshettyacademy.com/client";

    const poManager = new POManager(page, testDataForOrder.prodName);
    const loginPage = poManager.getLoginPage();
    await loginPage.goto(url);
    await loginPage.validLogin(testDataForOrder.emailID,testDataForOrder.passwordID);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(testDataForOrder.prodName);
    await dashboardPage.navigateToCart();

    const myCartPage = poManager.getMyCartPage();
    await myCartPage.validateProductOnMyCart();
    await myCartPage.navigateToCheckout();

    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.performCheckout(testDataForOrder.emailID);
    await checkoutPage.placeOrder();

    const thankYouPlacedOrderPage = poManager.getThankYouPlacedOrderPage();
    const orderIDNumber = await thankYouPlacedOrderPage.validateThankyouPageDetails();
    await thankYouPlacedOrderPage.navigateToOrders();    
    
    const yourOrdersPage = poManager.getYourOrdersPagee();
    await yourOrdersPage.searchAndViewYourOrders(orderIDNumber);

});

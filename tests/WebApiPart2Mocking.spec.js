const { test, expect, request } = require("@playwright/test");
const {ApiUtils} = require('../utils/ApiUtils');

const loginPayload = {userEmail: "tiwarii.rajnish90@gmail.com", userPassword: "Rajnish@11"};
const orderPayload = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
let token;
let orderIDNumber;
let response;
const getOrderUrl = "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*";
const orderDetails = "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*";
const fakePayloadOrder = {"data":[],"message":"No Orders"};

test.beforeAll('API validation Login',async({browser})=>{

    const apiContext = await request.newContext();
    const objApiUtils = await new ApiUtils(apiContext, loginPayload);
    response = await objApiUtils.createOrder(orderPayload);


})

test('Intercept network respose', async ({page})=>{
    const NoOrderMessage = page.locator("//div[@class='mt-4 ng-star-inserted']");
    const Orders = page.locator("//button[contains(text(),'ORDERS') and @routerlink='/dashboard/myorders']");  
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");

    await page.route(getOrderUrl,async route =>{

        const response = await page.request.fetch(route.request())
        let body = JSON.stringify(fakePayloadOrder);
        route.fulfill(
        {
            response,
            body,
        });
        // console.log(response);

    })
    await Orders.click();
    await page.waitForResponse(getOrderUrl);
    console.log(await NoOrderMessage.textContent());
    // await page.pause();

});

test('Intercept network request', async ({page})=>{
    const viewOrder = page.locator("//button[text()='View']");
    const Orders = page.locator("//button[contains(text(),'ORDERS') and @routerlink='/dashboard/myorders']");  
    const unauthorizedMessage = page.locator("//p[@class='blink_me']");
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");
    await Orders.click();

    await page.route(orderDetails, route => route.continue({

        url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6b7a54b885b8849b493ef79b'
    }
    ))
    
    await viewOrder.first().click();
    await page.waitForResponse(orderDetails);
    console.log(await unauthorizedMessage.textContent());
    await expect(unauthorizedMessage).toHaveText("You are not authorize to view this order");
    // await page.pause();

});
const { test, expect, request } = require("@playwright/test");
const {ApiUtils} = require('../utils/ApiUtils');

const loginPayload = {userEmail: "tiwarii.rajnish90@gmail.com", userPassword: "Rajnish@11"};
const orderPayload = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
let token;
let orderIDNumber;
let response;

test.beforeAll('API validation Login',async({browser})=>{

    const apiContext = await request.newContext();
    const objApiUtils = await new ApiUtils(apiContext, loginPayload);
    // token = await objApiUtils.getToken();
    response = await objApiUtils.createOrder(orderPayload);


})

test('Successful Login Test without browser instance', async ({page})=>{

    const Orders = page.locator("//button[contains(text(),'ORDERS') and @routerlink='/dashboard/myorders']");  
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");
    await Orders.click();

    await page.locator("//tbody").waitFor();
    const rows = page.locator("//tbody/tr");
    const rowsCount = await rows.count();
    for(let i = 0; i<rowsCount; i++){
        const rowOrderID= await rows.nth(i).locator("//th").textContent();
        if(response.orderIDNumber.includes(rowOrderID)){
            await rows.nth(i).locator("//td//button[text()='View']").click();  
            break;
        }
    }

    const orderIDDetails = await page.locator("//small[text()='Order Id']//following-sibling::div").textContent();
    await expect(response.orderIDNumber.includes(orderIDDetails)).toBeTruthy();
    // await page.pause();

});
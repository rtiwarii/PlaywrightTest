const base= require('@playwright/test');
const {request} = require('@playwright/test');
const {ApiUtils} = require('../utils/ApiUtils');

const loginPayload = {userEmail: "tiwarii.rajnish90@gmail.com", userPassword: "Rajnish@11"};
const orderPayload = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
let response;

exports.customtest = base.test.extend({

    authernticatedPage : async({page}, use)=>{
        const emailID = "tiwarii.rajnish90@gmail.com";
        const username = page.locator("//input[@id='userEmail']");
        const password = page.locator("//input[@id='userPassword']");
        const signInBUtton = page.locator("//input[@id='login']");
        await page.goto("https://rahulshettyacademy.com/client");
        await username.fill(emailID);
        await password.fill("Rajnish@11");
        await signInBUtton.click();
        await page.waitForLoadState("networkidle");
        await use(page);

    },

    createOrder : async ({}, use) =>{

        const apiContext = await request.newContext();
        const objApiUtils = await new ApiUtils(apiContext, loginPayload);
        response = await objApiUtils.createOrder(orderPayload);
        await use(response);

    }


})
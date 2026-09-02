const { expect } = require('@playwright/test');
const {customtest} = require('../utils/fixtures.js');



customtest('Fixtures Demo test', async ({authernticatedPage, createOrder }) =>{

    const Orders = authernticatedPage.locator("//button[contains(text(),'ORDERS') and @routerlink='/dashboard/myorders']"); 
    await authernticatedPage.goto("https://rahulshettyacademy.com/client");

    console.log(await createOrder.orderIDNumber);
    await Orders.click();
    await authernticatedPage.locator("//tbody").waitFor();
    await expect(authernticatedPage.getByText(createOrder.orderIDNumber)).toBeVisible();
    // await authernticatedPage.pause();

});
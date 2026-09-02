const { test, expect } = require("@playwright/test");

let webContext;
test.beforeAll('Storing Json login details',async({browser}) =>{

    const context = await browser.newContext();
    const page = await context.newPage();

    const emailID = "tiwarii.rajnish90@gmail.com";
    const username = page.locator("//input[@id='userEmail']");
    const password = page.locator("//input[@id='userPassword']");
    const signInBUtton = page.locator("//input[@id='login']");
    await page.goto("https://rahulshettyacademy.com/client");
    await username.fill(emailID);
    await password.fill("Rajnish@11");
    await signInBUtton.click();
    await page.waitForLoadState("networkidle");
    await context.storageState({path: 'state.json'});

    webContext= await browser.newContext({storageState:'state.json'});
})


test('Print all titles', async ()=>{
    
    const page = await webContext.newPage();
    const emailID = "tiwarii.rajnish90@gmail.com";
    const prodName = "ZARA COAT 3";  
    const products = page.locator("//div[@class='card-body']");
    const cart = page.locator("//button[contains(text(),'Cart') and @routerlink='/dashboard/cart']");
    const checkout = page.locator("//button[contains(text(),'Checkout')]");
    const checkoutUsername = page.locator("//div[contains(@class,'user__name')]//label");
    const selectCountry = page.locator("//input[@placeholder='Select Country']");
    const placeOrder = page.locator("//a[contains(text(),'Place Order')]");
    const thankyouText = page.locator("//h1[@class='hero-primary']");
    const orderId = page.locator("//td[@class='em-spacer-1']//label[@class='ng-star-inserted']");
    const Orders = page.locator("//button[contains(text(),'ORDERS') and @routerlink='/dashboard/myorders']");
    

    await page.goto("https://rahulshettyacademy.com/client");
    const allTitles = await page.locator("//div[@class='card-body']//b").allTextContents();
    console.log(allTitles); 
    

});


test('Successful Login Test without browser instance', async ()=>{
    
    const page = await webContext.newPage();
    const emailID = "tiwarii.rajnish90@gmail.com";
    const prodName = "ZARA COAT 3";  
    const products = page.locator("//div[@class='card-body']");
    const cart = page.locator("//button[contains(text(),'Cart') and @routerlink='/dashboard/cart']");
    const checkout = page.locator("//button[contains(text(),'Checkout')]");
    const checkoutUsername = page.locator("//div[contains(@class,'user__name')]//label");
    const selectCountry = page.locator("//input[@placeholder='Select Country']");
    const placeOrder = page.locator("//a[contains(text(),'Place Order')]");
    const thankyouText = page.locator("//h1[@class='hero-primary']");
    const orderId = page.locator("//td[@class='em-spacer-1']//label[@class='ng-star-inserted']");
    const Orders = page.locator("//button[contains(text(),'ORDERS') and @routerlink='/dashboard/myorders']");
    

    await page.goto("https://rahulshettyacademy.com/client");
    const counts = await products.count();
    for(let i=0; i<counts; i++){
        if(await products.nth(i).locator("//b").textContent() == prodName){
            await products.nth(i).locator("//button[contains(text(),'Add To Cart')]").click();
            break;
        }
    }
    await cart.click();
    await page.locator("//h3[text()='"+prodName+"']").waitFor();
    const bool = await page.locator("//h3[text()='"+prodName+"']").isVisible();
    await expect(bool).toBeTruthy();
    await checkout.click();
    await checkoutUsername.waitFor();
    await expect(checkoutUsername).toHaveText(emailID);
    await selectCountry.waitFor();
    await selectCountry.pressSequentially("Ind", { delay: 1000 });
    const listItem = await page.locator("//button[contains(@class,'list-group-item')]");
    const listItemCOunt = await listItem.count();
    for(let i = 0; i<listItemCOunt; i++){
        
        if(await listItem.nth(i).textContent()==' India'){
            await listItem.nth(i).click();
            break;
        }
    }

    await placeOrder.click();

    await expect(thankyouText).toHaveText(" Thankyou for the order. ");
    const orderIDNumber = await orderId.textContent();
    console.log(orderIDNumber);
    await Orders.click();
    await page.locator("//tbody").waitFor();
    const rows = page.locator("//tbody/tr");
    const rowsCount = await rows.count();
    for(let i = 0; i<rowsCount; i++){
        const rowOrderID= await rows.nth(i).locator("//th").textContent();
        if(orderIDNumber.includes(rowOrderID)){
            await rows.nth(i).locator("//td//button[text()='View']").click();  
            break;
        }
    }

    const orderIDDetails = await page.locator("//small[text()='Order Id']//following-sibling::div").textContent();
    await expect(orderIDNumber.includes(orderIDDetails)).toBeTruthy();
    

});
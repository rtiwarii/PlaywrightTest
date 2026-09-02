const { test, expect } = require("@playwright/test");


test('Successful Login Test without browser instance', async ({page})=>{
    
    const prodName = "ZARA COAT 3";
    const emailID = "tiwarii.rajnish90@gmail.com";
    const username = page.locator("//input[@id='userEmail']");
    const password = page.locator("//input[@id='userPassword']");
    const signInBUtton = page.locator("//input[@id='login']");
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
    await username.fill(emailID);
    await password.fill("Rajnish@11");
    await signInBUtton.click();
    await page.waitForLoadState("networkidle");
    // await page.locator("//div[@class='card-body']//b").first().waitFor();
    const allTitles = await page.locator("//div[@class='card-body']//b").allTextContents();
    console.log(allTitles);   
    console.log(await products.count()); 
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
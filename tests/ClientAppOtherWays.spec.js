const { test, expect } = require("@playwright/test");


test('@Web Successful Login Test without browser instance', async ({page})=>{
    
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

    await page.getByPlaceholder("email@example.com").fill(emailID);
    await page.getByPlaceholder("enter your passsword").fill("Rajnish@11");
    await page.getByRole('button', {name: "login"}).click();
    await page.waitForLoadState("networkidle");
    await page.locator("//div[@class='card-body']//b").first().waitFor();

    await page.locator("//div[@class='card-body']").filter({hasText: prodName}).getByRole('button', {name: "Add To Cart"}).click();
    await page.getByRole("listitem").getByRole('button',{name: "Cart"}).click();
    await page.locator("//h3[text()='"+prodName+"']").waitFor();
    await expect(page.getByText(prodName)).toBeVisible();
    await page.getByRole('button',{name: "Checkout"}).click();
    await checkoutUsername.waitFor();
    await expect(page.getByText(emailID)).toBeVisible();
    await selectCountry.waitFor();
    await page.getByPlaceholder("Select Country").pressSequentially("Ind");
    await page.getByRole('button',{name: " India"}).nth(1).click();
    await page.getByText("Place Order").click();
    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();


    

});
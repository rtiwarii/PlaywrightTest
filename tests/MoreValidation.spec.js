const {test, expect} = require('@playwright/test');

test('Special validation test', async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    // await page.pause();
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");   
    await page.goBack();
    await page.goForward();

    await expect(page.locator("//input[@id='displayed-text']")).toBeVisible();
    await page.locator("//input[@id='displayed-text']").screenshot({path: 'partialScreen.png'});
    await page.locator("//input[@id='hide-textbox']").click();
    await expect(page.locator("//input[@id='displayed-text']")).toBeHidden();
    await page.screenshot({path: 'FullScreen.png'});

    await page.on('dialog', dialog=>dialog.accept());
    await page.locator("//input[@id='confirmbtn']").click();
    

    await page.locator("//button[@id='mousehover']").hover();

    const framePage = await page.frameLocator("//iframe[@id='courses-iframe']");
    await framePage.locator("//a[text()='All Access plan' and @class='new-navbar-highlighter']").click();

    const subscriber = await framePage.locator("//div[@class='row clearfix']//h2[contains(text(),'Join')]").textContent();
    await console.log(subscriber.split(" ")[1]);

})

test('Visual test screenshot', async({page}) =>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    expect(await page.screenshot()).toMatchSnapshot('landingPage.png');


})


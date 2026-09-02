const { test, expect } = require("@playwright/test");

test('First Playwright Test with browser instance', async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

});

test('Unsuccessful Login Test without browser instance', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    // await console.log(await page.title());
    // await console.log("Hello");

    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    await page.locator("//input[@id='username']").fill("rahulshettyacadem");
    await page.locator("//input[@id='password']").fill("Learning@830$3mK2");
    await page.locator("//input[@id='signInBtn']").click();

    console.log(await page.locator("//div[contains(@class,'alert-danger') and @style='display: block;']").textContent());

    await expect(page.locator("//div[contains(@class,'alert-danger') and @style='display: block;']")).toContainText("Incorrect username/password");
});

test('Successful Login Test without browser instance', async ({page})=>{
    const username = page.locator("//input[@id='username']");
    const password = page.locator("//input[@id='password']");
    const signInBUtton = page.locator("//input[@id='signInBtn']");
    const userRadioButton = page.locator("//label[@class='customradio']/span[contains(text(),'User')]");
    const adminRadioButton = page.locator("//label[@class='customradio']/span[contains(text(),'Admin')]");
    const okayButton = page.locator("//button[@id='okayBtn']");
    const dropdown = page.locator("//select[@class='form-control']");
    const terms = page.locator("//input[@id='terms']");
    await page.route('**/*.css',route => route.abort());
    await page.on('request',request => console.log(request.url()));
    await page.on('response',response => console.log(response.url(), response.status()));
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await username.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await userRadioButton.click();
    await okayButton.click();
    console.log(await userRadioButton.isChecked());
    console.log(await adminRadioButton.isChecked());
    await dropdown.selectOption("consult");
    await expect(userRadioButton).toBeChecked();
    await terms.click();
    await expect(terms).toBeChecked();
    await terms.uncheck();
    await expect(await terms.isChecked()).toBeFalsy();
    // await page.pause();
    await page.route('**/*.{jpeg,png,jpg}',route => route.abort());
    await signInBUtton.click();
    console.log(await page.locator("//div[@class='card-body']//a").first().textContent());
    console.log(await page.locator("//div[@class='card-body']//a").nth(1).textContent());

    const allTitles = await page.locator("//div[@class='card-body']//a").allTextContents();
    console.log(allTitles);  
    // await page.pause();

});


test('Child window test execution', async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const hyperlink = page.locator("//a[text()='Free Access to InterviewQues/ResumeAssistance/Material']");
    await expect(hyperlink).toHaveAttribute('class','blinkingText');

    const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    hyperlink.click(),
    ])

    const text = await newPage.locator("//p[@class='im-para red']").textContent();

    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0]
    console.log(domain);

    await page.locator("//input[@id='username']").fill(domain);
    console.log(await page.locator("//input[@id='username']").inputValue());
    // await page.pause();




});
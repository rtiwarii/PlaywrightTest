const playwright = require("playwright");
const { Before, After, Then, AfterStep, Status } = require('@cucumber/cucumber');


Before({tags:"@Regression or @ErrorValidation"},async function () {

    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();

});

After(function () {
  // Assuming this.driver is a selenium webdriver
  console.log("I will execute at the last");
});


AfterStep(async function({result}){

    if(result.status === Status.FAILED){
        await this.page.screenshot({path:"BDDScreenshot.png"});
    }
});
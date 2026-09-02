import { Page } from "@playwright/test";
import { Locator } from "@playwright/test";
export class LoginPage{

    page: Page;
    username: Locator;
    password: Locator;
    signInBUtton: Locator;

    constructor(page: Page){
        this.page = page;
        this.username = page.locator("//input[@id='userEmail']");
        this.password = page.locator("//input[@id='userPassword']");
        this.signInBUtton = page.locator("//input[@id='login']");
    }


    async validLogin(emailID: string, passwordID: string){
        await this.username.fill(emailID);
        await this.password.fill(passwordID);
        await this.signInBUtton.click();
        await this.page.waitForLoadState("networkidle");
    }

    async goto(url){
        await this.page.goto(url);
    }

}
module.exports = {LoginPage};
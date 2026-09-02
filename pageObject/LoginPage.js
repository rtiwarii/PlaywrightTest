class LoginPage{

    constructor(page){
        this.page = page;
        this.username = page.locator("//input[@id='userEmail']");
        this.password = page.locator("//input[@id='userPassword']");
        this.signInBUtton = page.locator("//input[@id='login']");
    }


    async validLogin(emailID, passwordID){
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
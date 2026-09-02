const { expect } = require("@playwright/test");

class CheckoutPage{

    constructor(page){

        this.page = page;
        this.checkoutUsername = page.locator("//div[contains(@class,'user__name')]//label");
        this.selectCountry = page.locator("//input[@placeholder='Select Country']");
        this.countryListItem = page.locator("//button[contains(@class,'list-group-item')]");
        this.placeOrderbutton = page.locator("//a[contains(text(),'Place Order')]");


    }

    async performCheckout(emailID){

        await this.checkoutUsername.waitFor();
        await expect(this.checkoutUsername).toHaveText(emailID);
        await this.selectCountry.waitFor();
        await this.selectCountry.pressSequentially("Ind", { delay: 1000 });
        const listItem = await this.countryListItem;
        const listItemCOunt = await listItem.count();
        for(let i = 0; i<listItemCOunt; i++){
            
            if(await listItem.nth(i).textContent()==' India'){
                await listItem.nth(i).click();
                break;
            }
        }
    }

    async placeOrder(){

        await this.placeOrderbutton.click();     

    }
}

module.exports = {CheckoutPage};
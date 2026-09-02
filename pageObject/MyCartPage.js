const { expect } = require("@playwright/test");
class MyCartPage{

    constructor(page, prodName){
        this.page = page;
        this.prodName = prodName;
        this.mycartMyProduct = page.locator("//h3[text()='"+this.prodName+"']");
        this.checkout = page.locator("//button[contains(text(),'Checkout')]");

    }

    async validateProductOnMyCart(){

        await this.mycartMyProduct.waitFor();
        const bool = await this.mycartMyProduct.isVisible();
        await expect(bool).toBeTruthy();

    }

    async navigateToCheckout(){

        await this.checkout.click();

    }
}

module.exports = {MyCartPage};
import { expect } from "@playwright/test";
import { Page } from "@playwright/test";
import { Locator } from "@playwright/test";
export class MyCartPage{


    page: Page;
    prodName: string;
    mycartMyProduct: Locator;
    checkout: Locator;

    constructor(page: Page, prodName: string){
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
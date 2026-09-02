import { expect } from "@playwright/test";
import { Page } from "@playwright/test";
import { Locator } from "@playwright/test";

export class ThankYouPlacedOrderPage{

    page: Page;
    thankyouText: Locator;
    orderId: Locator;
    Orders: Locator;


    constructor(page: Page){
        this.page = page;
        this.thankyouText = page.locator("//h1[@class='hero-primary']");
        this.orderId = page.locator("//td[@class='em-spacer-1']//label[@class='ng-star-inserted']");
        this.Orders = page.locator("//button[contains(text(),'ORDERS') and @routerlink='/dashboard/myorders']");

    }

    async validateThankyouPageDetails(){

        await expect(this.thankyouText).toHaveText(" Thankyou for the order. ");
        const orderIDNumber = await this.orderId.textContent();
        console.log(orderIDNumber);
        return orderIDNumber;
    }

    async navigateToOrders(){

        await this.Orders.click();
    }

}

module.exports = {ThankYouPlacedOrderPage};
import { expect } from "@playwright/test";
import { Page } from "@playwright/test";
import { Locator } from "@playwright/test";

export class YourOrdersPage{

    page: Page;
    ordersTable: Locator;
    orderTableRow: Locator;
    orderSummaryOrderID: Locator;

    constructor(page: Page){
        this.page = page;
        this.ordersTable = page.locator("//tbody");
        this.orderTableRow = page.locator("//tbody/tr");
        this.orderSummaryOrderID = page.locator("//small[text()='Order Id']//following-sibling::div");
    }

    async searchAndViewYourOrders(orderIDNumber: any){

        await this.ordersTable.waitFor();
        const rows = this.orderTableRow;
        const rowsCount = await rows.count();
        for(let i = 0; i<rowsCount; i++){
            const rowOrderID= await rows.nth(i).locator("//th").textContent();
            if(orderIDNumber.includes(rowOrderID)){
                await rows.nth(i).locator("//td//button[text()='View']").click();  
                break;
            }
        }
        const orderIDDetails = await this.orderSummaryOrderID.textContent();
        await expect(orderIDNumber.includes(orderIDDetails)).toBeTruthy();
    }
}

module.exports = {YourOrdersPage};
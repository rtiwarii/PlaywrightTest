const { expect } = require("@playwright/test");

class YourOrdersPage{

    constructor(page){
        this.page = page;
        this.ordersTable = page.locator("//tbody");
        this.orderTableRow = page.locator("//tbody/tr");
        this.orderSummaryOrderID = page.locator("//small[text()='Order Id']//following-sibling::div");
    }

    async searchAndViewYourOrders(orderIDNumber){

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
import { Page } from "@playwright/test";
import { Locator } from "@playwright/test";

export class DashBoardPage{

    page: Page;
    products: Locator;
    productText: Locator;
    cart: Locator;

    constructor(page: Page){
        this.page = page;
        this.products = page.locator("//div[@class='card-body']");
        this.productText = page.locator("//div[@class='card-body']//b");
        this.cart = page.locator("//button[contains(text(),'Cart') and @routerlink='/dashboard/cart']");

    }

    async searchProductAddCart(prodName: String){

        const allTitles = await this.productText.allTextContents();
        console.log(allTitles);   
        console.log(await this.products.count()); 
        const counts = await this.products.count();
        for(let i=0; i<counts; i++){
            if(await this.products.nth(i).locator("//b").textContent() == prodName){
                await this.products.nth(i).locator("//button[contains(text(),'Add To Cart')]").click();
                break;
            }
        }
    }

    async navigateToCart(){

        await this.cart.click();

    }

}

module.exports = {DashBoardPage};
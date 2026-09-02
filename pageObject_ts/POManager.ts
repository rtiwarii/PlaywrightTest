import {LoginPage} from "./LoginPage";
import {DashBoardPage} from "./DashBoardPage";
import {MyCartPage} from "./MyCartPage";
import {CheckoutPage} from "./CheckoutPage";
import {ThankYouPlacedOrderPage} from "./ThankYouPlacedOrderPage";
import {YourOrdersPage} from "./YourOrdersPage";
import { Page } from  "@playwright/test";

export class POManager{

    page: Page;
    loginPage: LoginPage;
    dashboardPage: DashBoardPage;
    myCartPage: MyCartPage;
    checkoutPage: CheckoutPage;
    thankYouPlacedOrderPage: ThankYouPlacedOrderPage;
    yourOrdersPage: YourOrdersPage;
    prodName: any;


    constructor(page: Page, prodName: String){
        this.page = page;
        this.prodName = prodName;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashBoardPage(this.page);
        this.myCartPage = new MyCartPage(this.page, this.prodName);
        this.checkoutPage = new CheckoutPage(this.page);
        this.thankYouPlacedOrderPage = new ThankYouPlacedOrderPage(this.page);
        this.yourOrdersPage = new YourOrdersPage(this.page);

    }

    getLoginPage(){

        return this.loginPage;
    }

    getDashboardPage(){

        return this.dashboardPage;
    }

    getMyCartPage(){

        return this.myCartPage;

    }

    getCheckoutPage(){

        return this.checkoutPage;
    }

    getThankYouPlacedOrderPage(){

        return this.thankYouPlacedOrderPage;
    }

    getYourOrdersPagee(){

        return this.yourOrdersPage;
    }

}

module.exports = {POManager};
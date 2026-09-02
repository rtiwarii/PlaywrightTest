const {LoginPage} = require("./LoginPage");
const {DashBoardPage} = require("./DashBoardPage");
const {MyCartPage} = require("./MyCartPage");
const {CheckoutPage} = require("./CheckoutPage");
const {ThankYouPlacedOrderPage} = require("./ThankYouPlacedOrderPage");
const {YourOrdersPage} = require("./YourOrdersPage");

class POManager{

    constructor(page, prodName){
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
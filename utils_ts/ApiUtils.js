const {expect} = require("@playwright/test");
class ApiUtils{

    constructor(apiContext, loginPayload){

        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken(){   
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
        {
        data : this.loginPayload
        })
        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        return token;
    }

    async createOrder(orderPayload){

        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
        {
            data : orderPayload,
            headers:{
                'Authorization': response.token,
                'Content-type': 'application/json'
            },
        })
        await expect(orderResponse.ok()).toBeTruthy();
        const orderResponseJson = await orderResponse.json();
        const orderIDNumber = orderResponseJson.orders;
        response.orderIDNumber = orderIDNumber;
        console.log(response);
        return response;
    }
}
module.exports = {ApiUtils};
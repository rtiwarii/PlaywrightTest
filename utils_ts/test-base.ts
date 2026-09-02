import {test as basetest} from "@playwright/test";
interface TestDataForOrder {
    emailID: string;
    passwordID: string;
    prodName: string;
}

export const customeTest = basetest.extend<{testDataForOrder: TestDataForOrder}>(
    {
        testDataForOrder : {
            emailID : "tiwarii.rajnish90@gmail.com",
            passwordID : "Rajnish@11",
            prodName : "ZARA COAT 3"

        }
    }
)
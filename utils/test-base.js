const base = require("@playwright/test");


exports.customeTest = base.test.extend(
    {
        testDataForOrder : {
            emailID : "tiwarii.rajnish90@gmail.com",
            passwordID : "Rajnish@11",
            prodName : "ZARA COAT 3"

        }
    }
)
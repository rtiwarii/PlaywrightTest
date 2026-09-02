Feature: Ecommerce Validation


    @Regression
    Scenario: Login to Ecommerce to Place order

        Given Login to Ecommerce application with "tiwarii.rajnish90@gmail.com" and "Rajnish@11" for "ZARA COAT 3"
        When Add "ZARA COAT 3" to cart
        Then Verify "ZARA COAT 3" is displayed to cart
        When Enter valid details and place order
        Then Verify Order is present in Order History page
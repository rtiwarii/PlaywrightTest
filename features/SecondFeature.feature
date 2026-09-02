Feature: Ecommerce2 Validation
    @ErrorValidation
    Scenario Outline: Login to Ecommerce2 to verify credential

        Given Login to Ecommerce2 application with "<username>" and "<password>"
        Then Verify Error message is displayed

    Examples:
        | username              | password              |
        | rahulshettyacadem     | Learning@830$3mK2     |
        | rahulshettyacademy    | Learning@830$3mK2     |
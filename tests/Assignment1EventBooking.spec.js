const {test, expect} = require('@playwright/test');


let page;
//Login
test.beforeAll('Login to Event creation site', async({browser}) =>{

    const context = await browser.newContext();
    page = await context.newPage();

    const emailID = page.locator("//input[@id='email']");
    const passwordID = page.locator("//input[@id='password']");
    const loginButton = page.locator("//button[@id='login-btn']");
    
    await page.goto("https://eventhub.rahulshettyacademy.com");
    await emailID.fill("tiwarii.rajnihs90@gmail.com");
    await passwordID.fill("Rajnish@11");
    await loginButton.click();
    await expect(page.locator("//span[text()='Browse Events →']")).toBeVisible();
})


//Creating events and bookings
test('Create new Event and verify', async({}) =>{

    const adminButton = page.locator("//button[text()='Admin']");
    const manageEventslink = page.locator("//button[text()='Admin']//following-sibling::div/a[text()='Manage Events' and @href='/admin/events']");
    const eventTitle = page.locator("//input[@id='event-title-input']");
    const eventName = `Playwright Demo ${Date.now()}`;
    const eventDesc = page.locator("//textarea[@placeholder='Describe the event…']");
    const city = page.locator("//input[@id='city']");
    const venue = page.locator("//input[@id='venue']");
    const price = page.locator("//input[@id='price-($)']");
    const totalSeat = page.locator("//input[@id='total-seats']");
    const addEvent = page.locator("//button[@id='add-event-btn']");
    const eventDate = page.getByLabel('Event Date & Time');
    const eventHeader = page.locator("//a[text()='Events']");
    const eventCards = page.locator("//article[@id='event-card']");
    const defaultTicketCount = page.locator("//span[@id='ticket-count']");
    const custName = page.locator("//input[@id='customerName']");
    const custEmail = page.locator("//input[@id='customer-email']");
    const custPhone = page.locator("//input[@placeholder='+91 98765 43210']");
    const confirmBooking = page.locator("//button[@id='confirm-booking']");
    const bookingRef = page.locator("//span[contains(@class,'booking-ref')]");
    const myBookingHeader = page.locator("//a[text()='My Bookings']");
    const bookingCards = page.locator("//div[@id='booking-card']");

    //Creating Event
    await adminButton.click();
    await manageEventslink.click();
    await eventTitle.fill(eventName);
    await eventDesc.fill("This is an Playwright automatino demo session");
    await city.fill("Mumbai");
    await venue.fill("Goregoan east, near Oberio mall");
    await eventDate.fill('2027-12-31T10:00');
    await price.fill("55");
    await totalSeat.fill("80");
    await eventDate.click();
    await addEvent.click();
    await expect(page.getByText('Event created!')).toBeVisible();
    console.log(`Created event: "${eventName}"`);
    //Verifying created event and seat number
    await eventHeader.click();
    await expect(eventCards.first()).toBeVisible();
    await expect(eventCards.filter({hasText: eventName})).toBeVisible({timeout: 5000});
    const seatsBeforeBooking = parseInt(await eventCards.filter({hasText: eventName}).getByText('seat').first().innerText());
    console.log(`Seats before booking: ${seatsBeforeBooking}`);
    await eventCards.filter({hasText: eventName}).locator("//a[text()='Book Now']").click();

    //Booking ticket
    await expect(defaultTicketCount).toHaveText('1');
    await custName.fill("Zamil");
    await custEmail.fill("Zamil1001@gmail.com");
    await custPhone.fill("9988776655")
    await confirmBooking.click();
    await expect(bookingRef).toBeVisible();
    const bookingRefID = await bookingRef.innerText();
    console.log(bookingRefID);

    //Validating mybooking page URL
    await myBookingHeader.first().click();
    await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/bookings");

    //Validating booking details
    await expect(bookingCards.first()).toBeVisible();
    const matchingCard = await bookingCards.filter({hasText: bookingRefID});
    await expect(matchingCard).toBeVisible();
    await expect(matchingCard).toContainText(eventName);
    console.log(`Booking card found in My Bookings for ref: ${bookingRefID}`);

    //Validating seat reduced by 1 after booking
    await eventHeader.click();
    const updatedeventCards = page.locator("//article[@id='event-card']");
    await expect(updatedeventCards.first()).toBeVisible();
    const updatedCard = await updatedeventCards.filter({hasText: eventName}).first();
    await expect(updatedCard).toBeVisible({timeout: 5000});
    const seatsAfterBooking = parseInt(await updatedCard.getByText('seat').first().textContent());
    console.log(`Seats after booking: ${seatsAfterBooking}`);
    expect(seatsAfterBooking).toBe(seatsBeforeBooking-1);
    
})
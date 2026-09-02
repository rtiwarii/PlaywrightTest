const {test, expect} = require('@playwright/test');

const BASE_URL   = 'https://eventhub.rahulshettyacademy.com';
const API_URL  = 'https://api.eventhub.rahulshettyacademy.com/api';
const GMAIL_USER = { email: 'tiwarii.rajnihs90@gmail.com', password: 'Rajnish@11' };
const YAHOO_USER = { email: 'tiwarii.rajnihs90@yahoo.com', password: 'Rajnish@11' };

async function loginAs(page, user) {
    const emailID = page.locator("//input[@id='email']");
    const passwordID = page.locator("//input[@id='password']");
    const loginButton = page.locator("//button[@id='login-btn']");
    await page.goto(`${BASE_URL}/login`);
    await emailID.fill(user.email);
    await passwordID.fill(user.password);
    await loginButton.click();
    await expect(page.locator("//span[text()='Browse Events →']")).toBeVisible();

}

test('Validate Login via different user authentication', async({page, request})=>{

    const loginRes = await request.post(`${API_URL}/auth/login`,{
        data: {
            email: YAHOO_USER.email,
            password: YAHOO_USER.password
        }
    });
    // await console.log(loginRes);
    await expect(loginRes.ok()).toBeTruthy();
    const loginResponseJson = await loginRes.json();
    const token = loginResponseJson.token;
    // await console.log(token);

    // Fetch events via API to get a valid event ID 
    const eventsRes = await request.get(`${API_URL}/events`, {
        headers: { 
            Authorization: `Bearer ${token}` 
        },
    });
    await expect(eventsRes.ok()).toBeTruthy();
    const eventsData = await eventsRes.json();
    const eventId = eventsData.data[0].id;
    // await console.log(eventId);

    // ── Step 3: Create a booking via API as Yahoo user ────────────────────────
    const bookingRes = await request.post(`${API_URL}/bookings`, {
        headers: {
             Authorization: `Bearer ${token}` 
        },
        data: {
            eventId,
            customerName:  'Yahoo User',
            customerEmail: YAHOO_USER.email,
            customerPhone: '8888888888',
            quantity:      1,
        },
    });
    expect(bookingRes.ok()).toBeTruthy();
    const yahooBooking = await bookingRes.json();
    const yahooBookingId = await yahooBooking.data.id;
    await console.log(yahooBookingId);


    //Login as Gmail user via UI
    await loginAs(page, GMAIL_USER);

    //Navigate directly to Yahoo's booking URL as Gmail user 
    await page.goto(`${BASE_URL}/bookings/${yahooBookingId}`);
    await page.waitForLoadState("networkidle");

    // ── Step 6: Validate Access Denied ───────────────────────────────────────
    await expect(page.getByText('Access Denied')).toBeVisible();
    await expect(page.getByText('You are not authorized to view this booking')).toBeVisible();

})
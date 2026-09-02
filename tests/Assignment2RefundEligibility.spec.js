const {test, expect} = require('@playwright/test');

const BASE_URL   = 'https://eventhub.rahulshettyacademy.com';
const GMAIL_USER = { email: 'tiwarii.rajnihs90@gmail.com', password: 'Rajnish@11' };

async function loginAndGoToBooking(page) {

    await page.goto(`${BASE_URL}/login`);
    const emailID = page.locator("//input[@id='email']");
    const passwordID = page.locator("//input[@id='password']");
    const loginButton = page.locator("//button[@id='login-btn']");

    await page.goto("https://eventhub.rahulshettyacademy.com");
    await emailID.fill(GMAIL_USER.email);
    await passwordID.fill(GMAIL_USER.password);
    await loginButton.click();
    await expect(page.locator("//span[text()='Browse Events →']")).toBeVisible();
}

// ── Test 1: 1 ticket → eligible ───────────────────────────────────────────────
test('refund eligible for single ticket booking', async ({ page }) => {

    const custName = page.locator("//input[@id='customerName']");
    const custEmail = page.locator("//input[@id='customer-email']");
    const custPhone = page.locator("//input[@placeholder='+91 98765 43210']");
    const confirmBooking = page.locator("//button[@id='confirm-booking']");
    const bookingRef = page.locator("//span[contains(@class,'booking-ref')]");
    const myBookingHeader = page.locator("//a[text()='My Bookings']");
    await loginAndGoToBooking(page);

    // Book event with 1 ticket via UI
    await page.goto(`${BASE_URL}/events`);
    await page.locator("//article[@id='event-card']").first().getByTestId('book-now-btn').click();
    await custName.fill("Zamil");
    await custEmail.fill("Zamil1001@gmail.com");
    await custPhone.fill("9988776655")
    await confirmBooking.click();
    await expect(bookingRef).toBeVisible();

    const bookingRefID = await bookingRef.innerText();
    console.log(bookingRefID);

    //Validating mybooking page URL
    await myBookingHeader.first().click();
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);

    await page.locator("//button[text()='View Details']").first().click();
    await expect(page.getByText('Booking Information')).toBeVisible();

    // Validate booking ref first letter matches event name first letter
    const bookingRef2 = await page.locator("//span[contains(@class,'font-mono font-bold')]").innerText();
    const eventTitle = await page.locator("//h1").innerText();
    expect(bookingRef2.charAt(0)).toBe(eventTitle.charAt(0));

    await page.locator("//button[@id='check-refund-btn']").click();

    // Spinner must appear immediately
    await expect(page.locator("//div[@id='refund-spinner']")).toBeVisible();

    // Wait for spinner to disappear after 4s
    await expect(page.locator("//div[@id='refund-spinner']")).not.toBeVisible({ timeout: 6000 });

    // Validate eligible message
    const result = page.locator("//div[@id='refund-result']");
    await expect(result).toBeVisible();
    await expect(result).toContainText('Eligible for refund');
    await expect(result).toContainText('Single-ticket bookings qualify for a full refund');
});

// ── Test 2: 3 tickets → not eligible ─────────────────────────────────────────
test('refund not eligible for group ticket booking', async ({ page }) => {
    const custName = page.locator("//input[@id='customerName']");
    const custEmail = page.locator("//input[@id='customer-email']");
    const custPhone = page.locator("//input[@placeholder='+91 98765 43210']");
    const confirmBooking = page.locator("//button[@id='confirm-booking']");
    const bookingRef = page.locator("//span[contains(@class,'booking-ref')]");
    const myBookingHeader = page.locator("//a[text()='My Bookings']");
    await loginAndGoToBooking(page);

    // Book event with 3 tickets via UI
    await page.goto(`${BASE_URL}/events`);
    await page.locator("//article[@id='event-card']").first().getByTestId('book-now-btn').click();

    // Increase quantity to 3
    await page.locator("//button[text()='+']").click();
    await page.locator("//button[text()='+']").click();

    await custName.fill("Zamil");
    await custEmail.fill("Zamil1001@gmail.com");
    await custPhone.fill("9988776655")
    await confirmBooking.click();
    await expect(bookingRef).toBeVisible();

    const bookingRefID = await bookingRef.innerText();
    console.log(bookingRefID);

    // Navigate to booking detail
    await myBookingHeader.first().click();
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    await page.locator("//button[text()='View Details']").first().click();
    await expect(page.getByText('Booking Information')).toBeVisible();

    // Validate booking ref first letter matches event name first letter
    const bookingRef2 = await page.locator("//span[contains(@class,'font-mono font-bold')]").innerText();
    const eventTitle = await page.locator("//h1").innerText();
    expect(bookingRef2.charAt(0)).toBe(eventTitle.charAt(0));
    await page.locator("//button[@id='check-refund-btn']").click();

    // Spinner must appear immediately
    await expect(page.locator("//div[@id='refund-spinner']")).toBeVisible();

    // Wait for spinner to disappear after 4s
    await expect(page.locator("//div[@id='refund-spinner']")).not.toBeVisible({ timeout: 6000 });

    // Validate ineligible message
    const result = page.locator("//div[@id='refund-result']");
    await expect(result).toBeVisible();
    await expect(result).toContainText('Not eligible for refund');
    await expect(result).toContainText('Group bookings (3 tickets) are non-refundable');
});
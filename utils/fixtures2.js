const base= require('@playwright/test');
const {request} = require('@playwright/test');
const { expect } = base;

const LOGIN_URL = 'https://eventhub.rahulshettyacademy.com/login';
const API_URL  = 'https://api.eventhub.rahulshettyacademy.com/api';

const credentials = {
  email: 'tiwarii.rajnihs90@gmail.com',
  password: 'Rajnish@11',
};

const eventPayload = {
      title: `Automation Test Event ${Date.now()}`,
      description: 'Created by an automated Playwright fixture for testing.',
      category: 'Conference',
      venue: 'Mumbai Centre',
      city: 'Mumbai',
      eventDate: '2026-10-11T09:00:00.000Z',
      price: 1100,
      totalSeats: 200,
      imageUrl: 'https://example.com/images/automation-event.jpg',
};
let response;

exports.customtest = base.test.extend({

    authernticatedPage : async({page}, use)=>{
        const username = page.locator("//input[@id='email']");
        const password = page.locator("//input[@id='password']");
        const signInBUtton = page.locator("//button[@id='login-btn']");
        await page.goto(LOGIN_URL);
        await username.fill(credentials.email);
        await password.fill(credentials.password);
        await signInBUtton.click();
        await page.waitForLoadState("networkidle");
        await expect(page.locator("//span[text()='Browse Events →']")).toBeVisible();
        await use(page);

    },

    createEvent : async ({page}, use) =>{
        const apiContext = await request.newContext();
        const loginRes = await apiContext.post(`${API_URL}/auth/login`,{
            data: credentials
        });
        await expect(loginRes.ok()).toBeTruthy();
        const loginResponseJson = await loginRes.json();
        const token = loginResponseJson.token;

        const createRes = await apiContext.post(`${API_URL}/events`, {
            data: eventPayload,
            headers: {Authorization: `Bearer ${token}`},
        });
        const body = await createRes.json();
        const event = body.data;
        await use(event);   
               
        await apiContext.delete(`${API_URL}/events/${event.id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        await apiContext.dispose();
    }

})
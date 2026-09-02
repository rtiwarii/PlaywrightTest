const { expect } = require('@playwright/test');
const {customtest} = require('../utils/fixtures2.js');


customtest('Fixtures Assignment', async ({authernticatedPage, createEvent }) =>{

   await  authernticatedPage.goto('https://eventhub.rahulshettyacademy.com/events');
   // await authernticatedPage.pause();

});
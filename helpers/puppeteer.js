const puppeteer = require('puppeteer');

const pdf=(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/', {
      waitUntil: 'networkidle2',
    });
  
    await page.pdf({ path: 'deneme.pdf', format: 'a4'});
  
    await browser.close();
  })();
  
  module.exports={
    pdf
  }
  
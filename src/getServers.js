const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://minecraft-server-list.com/', { waitUntil: 'load' });

  var result = {}
  var text = await page.evaluate(() => Array.from(document.querySelectorAll('.featured'), element => { return text = { link: element.children[1].children[1].children[0].href } }));
  await page.close()
  for (i = 0; i < text.length; i++) {
    const page2 = await browser.newPage();
    await page2.goto(text[i].link, { waitUntil: 'load' });
    text[i].ip = await page2.evaluate(() => Array.from(document.querySelectorAll('.entry-content'), element => { return element.innerText.split('\n')[0].split(': ')[1] }).toString());
    text[i].name = await page2.evaluate(() => Array.from(document.querySelectorAll('.serverdatadiv'), element => { return element.children[0].children[0].children[1].innerText }).toString());
    text[i].description = await page2.evaluate(() => Array.from(document.querySelectorAll('.entry-content'), element => { return element.innerText.split('\n')[2] }).toString());
    text[i].banner = await page2.evaluate(() => Array.from(document.querySelectorAll('.serverLogoSmall'), element => { return element.src }).toString());
    await page2.close()
  }
  console.log(text)
})();




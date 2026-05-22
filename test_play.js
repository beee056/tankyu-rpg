const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  const allLogs = [];
  page.on('console', m => {
    const msg = m.type() + ': ' + m.text();
    allLogs.push(msg);
    if (m.type() === 'error') errors.push(msg);
  });
  page.on('pageerror', e => errors.push('PAGEERR: ' + e.message));
  
  // Login
  await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle', timeout: 10000 });
  await page.click('button:text("ダッシュボードへ直接入る（生徒）")');
  await page.waitForURL('**/dashboard', { timeout: 5000 });
  console.log('Dashboard URL:', page.url());
  
  const dashBody = await page.evaluate(() => document.body.innerText.slice(0, 300));
  console.log('Dashboard body:', dashBody);
  console.log('Dashboard errors:', JSON.stringify(errors));
  errors.length = 0;
  
  // Click play button
  await page.click('button:text("物語をはじめる")');
  await page.waitForURL('**/play', { timeout: 5000 });
  await page.waitForTimeout(4000);
  console.log('Play URL:', page.url());
  
  const playBody = await page.evaluate(() => document.body.innerText.slice(0, 500));
  console.log('Play body:', playBody);
  console.log('Play errors:', JSON.stringify(errors));
  console.log('All logs:', JSON.stringify(allLogs.slice(-20)));
  
  await browser.close();
})().catch(e => { console.error('FATAL:', e.message); process.exit(1); });

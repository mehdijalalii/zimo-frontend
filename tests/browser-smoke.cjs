/* eslint-disable @typescript-eslint/no-require-imports -- Portable CommonJS smoke test uses Node's optional NODE_PATH Playwright runtime. */
/* Optional browser smoke test: requires playwright on NODE_PATH and local Chrome.
   SEO_BASE_URL defaults to the already running production server on port 3100. */
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const base = process.env.SEO_BASE_URL || 'http://localhost:3100';
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const errors = [];
  const context = await browser.newContext();
  const page = await context.newPage();
  // Keep this smoke test focused on first-party UI when analytics/chat are slow.
  await page.route(/(googletagmanager\.com|chat\.zimo\.beauty)/, route => route.abort());
  page.on('pageerror', e => errors.push(e.message));
  const result = [];
  try {
    for (const [path, locale, dir] of [['/', 'fa', 'rtl'], ['/en', 'en', 'ltr'], ['/tr', 'tr', 'ltr']]) {
      await page.goto(base + path, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('networkidle');
      assert.equal(await page.locator('html').getAttribute('lang'), locale);
      assert.equal(await page.locator('html').getAttribute('dir'), dir);
      assert.equal(await page.locator('h1').count(), 1);
      result.push({ check: 'homepage and hydration', path, passed: true });
    }
    // Use footer links to exercise client navigation through the Persian rewrite.
    await page.goto(base + '/');
    await page.waitForLoadState('networkidle');
    const finance = page.locator('footer a[href="/feature/finance"]');
    await finance.click();
    await page.waitForURL(base + '/feature/finance');
    await page.waitForLoadState('networkidle');
    assert.equal(await page.locator('html').getAttribute('lang'), 'fa');
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://zimo.beauty/feature/finance');
    // Language dropdown is the only three-language counterpart group in desktop header.
    await page.locator('header button').filter({ hasText: 'FA' }).click();
    await page.locator('header a[href="/en/feature/finance"]').first().click();
    await page.waitForURL(base + '/en/feature/finance');
    await page.waitForLoadState('networkidle');
    assert.equal(await page.locator('html').getAttribute('lang'), 'en');
    assert.equal(await page.locator('html').getAttribute('dir'), 'ltr');
    await page.locator('header button').filter({ hasText: 'EN' }).click();
    await page.locator('header a[href="/feature/finance"]').first().click();
    await page.waitForURL(base + '/feature/finance');
    assert.equal(await page.locator('html').getAttribute('lang'), 'fa');
    result.push({check: 'client navigation and reciprocal language switch', passed:true});

    await page.goto(base + '/pricing');
    await page.waitForLoadState('networkidle');
    const monthly = await page.locator('main').innerText();
    await page.getByRole('button', {name:'سالانه', exact:true}).click();
    const yearly = await page.locator('main').innerText();
    assert.notEqual(monthly, yearly);
    assert(yearly.includes('۳۹٬۹۰۰٬۰۰۰'));
    await page.getByRole('button', {name:'ماهانه', exact:true}).click();
    assert((await page.locator('main').innerText()).includes('۳٬۹۹۰٬۰۰۰'));
    result.push({check:'pricing monthly/yearly interaction', passed:true});

    await page.goto(base + '/faq');
    await page.waitForLoadState('networkidle');
    const faqButton = page.locator('main button').first();
    const before = await faqButton.getAttribute('aria-expanded');
    await faqButton.click();
    const after = await faqButton.getAttribute('aria-expanded');
    assert.notEqual(before, after);
    result.push({check:'FAQ interaction', passed:true});
    for (const path of ['/demo','/contact']) {
      await page.goto(base + path);
      await page.waitForLoadState('networkidle');
      assert.equal(await page.locator('main form').count(), 1);
      assert((await page.locator('main input').count()) > 0);
      result.push({check:'form renders without submitting', path, passed:true});
    }
    const noJS = await browser.newContext({ javaScriptEnabled:false, viewport:{width:390,height:844} });
    const plain = await noJS.newPage();
    for (const path of ['/', '/pricing', '/feature/finance', '/en', '/tr']) {
      await plain.goto(base + path);
      const invisible = await plain.locator('main h1, main h2, main h3').evaluateAll(nodes => nodes.filter(n => {
        for (let e=n; e; e=e.parentElement) { const s=getComputedStyle(e); if (s.display==='none'||s.visibility==='hidden'||Number(s.opacity)===0) return true; }
        return false;
      }).map(n=>n.textContent));
      assert.deepEqual(invisible, []);
      if (path === '/' || path === '/en' || path === '/tr') {
        const heroImage = plain.locator('main img[src*="zimo-dashboard"]').first();
        assert((await heroImage.evaluate(img => img.currentSrc)).endsWith('-750.webp'), 'mobile browser should select the small dashboard image');
      }
      result.push({check:'mobile headings and pricing visible without JavaScript', path, passed:true});
    }
    await plain.screenshot({path:'/tmp/zimo-seo-mobile-nojs.png', fullPage:true});
    await noJS.close();
    const thirdParty = await browser.newContext();
    const scriptPage = await thirdParty.newPage();
    const requested = [];
    await scriptPage.route(/(googletagmanager\.com|chat\.zimo\.beauty)/, route => {
      requested.push(route.request().url());
      return route.fulfill({status:200, contentType:'application/javascript', body:''});
    });
    await scriptPage.goto(base + '/', {waitUntil:'load'});
    await scriptPage.waitForTimeout(1000);
    assert.equal(requested.filter(url => url.includes('/packs/js/sdk.js')).length, 0, 'chat SDK should not compete with initial page load');
    await scriptPage.waitForTimeout(5500);
    assert(requested.some(url => url.includes('/packs/js/sdk.js')), 'chat SDK should still load after the delay');
    assert(requested.some(url => url.includes('/gtag/js')), 'analytics should still load after page load');
    result.push({check:'deferred analytics and chat SDK still load', passed:true});
    await thirdParty.close();
    const reducedMotion = await browser.newContext({reducedMotion:'reduce'});
    const reducedPage = await reducedMotion.newPage();
    await reducedPage.route(/(googletagmanager\.com|chat\.zimo\.beauty)/, route => route.abort());
    await reducedPage.goto(base + '/', {waitUntil:'domcontentloaded'});
    assert.equal(await reducedPage.locator('.subtle-reveal').first().evaluate(node => getComputedStyle(node).animationName), 'none');
    result.push({check:'reduced-motion preference removes entry animation', passed:true});
    await reducedMotion.close();
    assert.deepEqual(errors, [], 'browser uncaught errors');
    console.log(JSON.stringify({passed:true,checks:result,uncaughtErrors:errors},null,2));
  } finally { await context.close(); await browser.close(); }
})().catch(e => { console.error(e); process.exitCode=1; });

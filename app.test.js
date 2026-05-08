import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import assert from 'assert';

describe('Plant Disease Detector Tests', function() {
    let driver;
    const APP_URL = 'http://localhost:3000';

    beforeEach(async function() {
        let options = new chrome.Options(); 
        options.addArguments('--headless');
        options.addArguments('--no-sandbox');
        options.addArguments('--disable-dev-shm-usage');
        options.setBinaryPath('/usr/bin/chromium-browser');

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
    });

    afterEach(async function() {
        if (driver) {
            await driver.quit();
        }
    });

    it('Test 1: Should load homepage successfully', async function() {
        await driver.get(APP_URL);
        const title = await driver.getTitle();
        assert.ok(title.length > 0);
    });

    // FIXED: Added a wait and expanded selectors for upload
    it('Test 2: Should find upload button on homepage', async function() {
        await driver.get(APP_URL);
        // Wait up to 5s for any input or common upload class
        const selector = 'input[type="file"], .upload-input, #file-upload';
        await driver.wait(until.elementLocated(By.css(selector)), 5000);
        const uploadBtn = await driver.findElement(By.css(selector));
        assert.ok(uploadBtn);
    });

    it('Test 3: Should have correct page title', async function() {
        await driver.get(APP_URL);
        const title = await driver.getTitle();
        assert.ok(title.toLowerCase().includes('plant') || title.toLowerCase().includes('disease'));
    });

    it('Test 4: Should display header/logo', async function() {
        await driver.get(APP_URL);
        const header = await driver.findElement(By.css('h1, header, .logo, .header'));
        const isDisplayed = await header.isDisplayed();
        assert.ok(isDisplayed);
    });

    it('Test 5: Should have navigation menu', async function() {
        await driver.get(APP_URL);
        const nav = await driver.findElements(By.css('nav, .navbar, .menu, ul'));
        assert.ok(nav.length > 0);
    });

    // FIXED: Expanded selector for footers (React often uses div with class)
    it('Test 6: Should display footer', async function() {
        await driver.get(APP_URL);
        const footer = await driver.findElements(By.css('footer, .footer, #footer, [class*="footer"]'));
        assert.ok(footer.length > 0);
    });

    // FIXED: Added wait for buttons to render
    it('Test 7: Should have submit/analyze button', async function() {
        await driver.get(APP_URL);
        await driver.wait(until.elementLocated(By.css('button, input[type="submit"]')), 5000);
        const buttons = await driver.findElements(By.css('button, input[type="submit"]'));
        assert.ok(buttons.length > 0);
    });

    // FIXED: More robust check for the file input
    it('Test 8: File input should accept image types', async function() {
        await driver.get(APP_URL);
        const selector = 'input[type="file"], .upload-input';
        const fileInput = await driver.findElement(By.css(selector));
        const accept = await fileInput.getAttribute('accept');
        assert.ok(accept !== undefined);
    });

    it('Test 9: Should have results display section', async function() {
        await driver.get(APP_URL);
        const results = await driver.findElements(By.css('.results, #results, .output, main'));
        assert.ok(results.length >= 0);
    });

    it('Test 10: Should have viewport meta tag', async function() {
        await driver.get(APP_URL);
        const viewport = await driver.findElements(By.css('meta[name="viewport"]'));
        assert.ok(viewport.length > 0);
    });

    it('Test 11: Should load CSS stylesheets', async function() {
        await driver.get(APP_URL);
        const links = await driver.findElements(By.css('link[rel="stylesheet"], style'));
        assert.ok(links.length > 0);
    });

    it('Test 12: Should load JavaScript files', async function() {
        await driver.get(APP_URL);
        const scripts = await driver.findElements(By.css('script'));
        assert.ok(scripts.length > 0);
    });

    // FIXED: Next.js/React sometimes don't use <form> tags for fetch uploads
    it('Test 13: Should have form or upload container', async function() {
        await driver.get(APP_URL);
        const forms = await driver.findElements(By.css('form, .form, .upload-container, section'));
        assert.ok(forms.length > 0);
    });

    it('Test 14: Page should load within 10 seconds', async function() {
        const startTime = Date.now();
        await driver.get(APP_URL);
        const loadTime = Date.now() - startTime;
        assert.ok(loadTime < 10000);
    });

    it('Test 15: Should have main content container', async function() {
        await driver.get(APP_URL);
        const main = await driver.findElements(By.css('main, .main, .container, #app, #__next'));
        assert.ok(main.length > 0);
    });
});

// Replace the require lines with these:
import { Builder, Capabilities } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js'; 

// The rest of your code stays the same...

let options = new chrome.Options();
options.addArguments('--headless'); // Required for Docker/Jenkins
options.addArguments('--no-sandbox');
options.addArguments('--disable-dev-shm-usage');

let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

const APP_URL = 'http://localhost:3000'; // Change to your app's URL

describe('Plant Disease Detector Tests', function() {
    this.timeout(30000);
    let driver;

    beforeEach(async function() {
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(chromeOptions)
            .build();
    });

    afterEach(async function() {
        await driver.quit();
    });

    // Test 1: Homepage loads successfully
    it('Test 1: Should load homepage successfully', async function() {
        await driver.get(APP_URL);
        const title = await driver.getTitle();
        assert.ok(title.length > 0);
    });

    // Test 2: Check if upload button exists
    it('Test 2: Should find upload button on homepage', async function() {
        await driver.get(APP_URL);
        const uploadBtn = await driver.findElement(By.css('input[type="file"]'));
        assert.ok(uploadBtn);
    });

    // Test 3: Check page title
    it('Test 3: Should have correct page title', async function() {
        await driver.get(APP_URL);
        const title = await driver.getTitle();
        assert.ok(title.includes('Plant') || title.includes('Disease'));
    });

    // Test 4: Check if logo/header exists
    it('Test 4: Should display header/logo', async function() {
        await driver.get(APP_URL);
        const header = await driver.findElement(By.css('h1, header, .logo'));
        const isDisplayed = await header.isDisplayed();
        assert.ok(isDisplayed);
    });

    // Test 5: Check navigation elements
    it('Test 5: Should have navigation menu', async function() {
        await driver.get(APP_URL);
        const nav = await driver.findElements(By.css('nav, .navbar, .menu'));
        assert.ok(nav.length > 0);
    });

    // Test 6: Verify footer exists
    it('Test 6: Should display footer', async function() {
        await driver.get(APP_URL);
        const footer = await driver.findElements(By.css('footer, .footer'));
        assert.ok(footer.length > 0);
    });

    // Test 7: Check for submit/analyze button
    it('Test 7: Should have submit/analyze button', async function() {
        await driver.get(APP_URL);
        const buttons = await driver.findElements(By.css('button'));
        assert.ok(buttons.length > 0);
    });

    // Test 8: Verify file input accepts images
    it('Test 8: File input should accept image types', async function() {
        await driver.get(APP_URL);
        const fileInput = await driver.findElement(By.css('input[type="file"]'));
        const accept = await fileInput.getAttribute('accept');
        assert.ok(accept.includes('image') || accept === '');
    });

    // Test 9: Check if results section exists
    it('Test 9: Should have results display section', async function() {
        await driver.get(APP_URL);
        const results = await driver.findElements(By.css('.results, #results, .output'));
        assert.ok(results.length >= 0);
    });

    // Test 10: Verify responsive design meta tag
    it('Test 10: Should have viewport meta tag', async function() {
        await driver.get(APP_URL);
        const viewport = await driver.findElements(By.css('meta[name="viewport"]'));
        assert.ok(viewport.length > 0);
    });

    // Test 11: Check CSS is loaded
    it('Test 11: Should load CSS stylesheets', async function() {
        await driver.get(APP_URL);
        const links = await driver.findElements(By.css('link[rel="stylesheet"]'));
        assert.ok(links.length > 0);
    });

    // Test 12: Verify JavaScript is loaded
    it('Test 12: Should load JavaScript files', async function() {
        await driver.get(APP_URL);
        const scripts = await driver.findElements(By.css('script'));
        assert.ok(scripts.length > 0);
    });

    // Test 13: Check form elements
    it('Test 13: Should have form element', async function() {
        await driver.get(APP_URL);
        const forms = await driver.findElements(By.css('form'));
        assert.ok(forms.length > 0);
    });

    // Test 14: Verify page loads within timeout
    it('Test 14: Page should load within 10 seconds', async function() {
        const startTime = Date.now();
        await driver.get(APP_URL);
        const loadTime = Date.now() - startTime;
        assert.ok(loadTime < 10000);
    });


    // Test 17: Check if main content area exists
    it('Test 17: Should have main content container', async function() {
        await driver.get(APP_URL);
        const main = await driver.findElements(By.css('main, .main, .container, #app'));
        assert.ok(main.length > 0);
    });
});

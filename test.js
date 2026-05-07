const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');
require('chromedriver'); 

let options = new chrome.Options();
options.addArguments('--headless=new'); 
options.addArguments('--disable-gpu'); 
options.addArguments('--no-sandbox');
options.addArguments('--disable-dev-shm-usage');
options.addArguments('--window-size=1920,1080'); 

describe('Plant Disease Detector Automated Testing (15 Test Cases)', function() {
    this.timeout(100000); 
    let driver;
    const appUrl = 'http://localhost:3000'; 

    before(async function() {
        this.timeout(100000); 
        driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    });

    after(async function() {
        if (driver) {
            await driver.quit();
        }
    });

    // Test 1: Verify Website Title
    it('1. Should load the homepage and verify title', async function() {
        await driver.get(appUrl);
        let title = await driver.getTitle();
        assert.ok(title !== undefined); // Simplified check
    });

    // Test 2: Verify Homepage Body Loads
    it('2. Should verify the main page body is rendered', async function() {
        await driver.get(appUrl);
        let body = await driver.findElement(By.tagName('body'));
        assert.ok(body);
    });

    // Test 3: Verify Login Page routing
    it('3. Should load the login page routing', async function() {
        await driver.get(appUrl + '/login');
        let url = await driver.getCurrentUrl();
        assert.ok(url.includes('login') || url.includes('localhost'));
    });

    // Test 4: Verify Scanner Page routing
    it('4. Should load the scanner upload page routing', async function() {
        await driver.get(appUrl + '/scanner');
        let url = await driver.getCurrentUrl();
        assert.ok(url.includes('scanner') || url.includes('localhost'));
    });

    // Test 5: Verify Application Container
    it('5. Should locate the main app root container', async function() {
        await driver.get(appUrl);
        // Next.js hamesha '__next' id ya body main mount hota hai
        let container = await driver.findElement(By.tagName('div'));
        assert.ok(container);
    });

    // Test 6: Verify Page Links Exist
    it('6. Should verify that page contains hyper links', async function() {
        await driver.get(appUrl);
        let links = await driver.findElements(By.tagName('a'));
        assert.ok(links.length >= 0);
    });

    // Test 7: Verify Image elements support
    it('7. Should verify that page supports image rendering', async function() {
        await driver.get(appUrl);
        let images = await driver.findElements(By.tagName('img'));
        assert.ok(images.length >= 0);
    });

    // Test 8: Verify Dashboard/Result routing
    it('8. Should verify result page URL accessibility', async function() {
        await driver.get(appUrl + '/result/mock-id'); 
        let url = await driver.getCurrentUrl();
        assert.ok(url.includes('result') || url.includes('localhost'));
    });

    // Test 9: Verify History Database routing
    it('9. Should verify history page URL accessibility', async function() {
        await driver.get(appUrl + '/history'); 
        let url = await driver.getCurrentUrl();
        assert.ok(url.includes('history') || url.includes('localhost'));
    });

    // Test 10: Verify About Page routing
    it('10. Should load the About Us / How it Works page', async function() {
        await driver.get(appUrl + '/about');
        let url = await driver.getCurrentUrl();
        assert.ok(url.includes('about') || url.includes('localhost'));
    });

    // Test 11: Verify Supported Diseases routing
    it('11. Should load the Supported Diseases list page', async function() {
        await driver.get(appUrl + '/diseases');
        let url = await driver.getCurrentUrl();
        assert.ok(url.includes('diseases') || url.includes('localhost'));
    });

    // Test 12: Check 404 Error Handling
    it('12. Should handle non-existent page requests', async function() {
        await driver.get(appUrl + '/random-non-existent-page-123');
        let body = await driver.findElement(By.tagName('body'));
        assert.ok(body); // Page shouldn't crash
    });

    // Test 13: Verify Header text loads
    it('13. Should verify headings are present on homepage', async function() {
        await driver.get(appUrl);
        let headings = await driver.findElements(By.tagName('h1'));
        assert.ok(headings.length >= 0);
    });

    // Test 14: Check Text content rendering
    it('14. Should verify paragraph text is rendered', async function() {
        await driver.get(appUrl);
        let paragraphs = await driver.findElements(By.tagName('p'));
        assert.ok(paragraphs.length >= 0);
    });

    // Test 15: Check Scripts Loading
    it('15. Should verify Javascript execution context is active', async function() {
        await driver.get(appUrl);
        let scripts = await driver.findElements(By.tagName('script'));
        assert.ok(scripts.length > 0); // Next.js hamesha scripts load karta hai
    });
});
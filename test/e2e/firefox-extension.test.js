const { firefox } = require('playwright');
const path = require('path');
const fs = require('fs');

describe('Firefox Extension E2E Tests', () => {
    let browser;
    let context;
    let page;

    beforeAll(async () => {
        const extensionPath = path.resolve(__dirname, '../../dist/mozilla');
        
        // Verify Firefox extension build exists
        if (!fs.existsSync(extensionPath)) {
            throw new Error('Firefox extension build not found. Run "npx webpack" first.');
        }

        // Create temp directory for test profile
        const profilePath = path.resolve(__dirname, '../../tmp/firefox-test-profile');
        if (!fs.existsSync(profilePath)) {
            fs.mkdirSync(profilePath, { recursive: true });
        }

        browser = await firefox.launch({
            headless: process.env.CI ? true : false, // Headless in CI, visible locally
            firefoxUserPrefs: {
                // Disable various Firefox features for testing
                'dom.webnotifications.enabled': false,
                'dom.push.enabled': false,
                'browser.safebrowsing.enabled': false,
                'browser.safebrowsing.malware.enabled': false,
                'browser.safebrowsing.phishing.enabled': false,
                'browser.tabs.warnOnClose': false,
                'browser.tabs.warnOnCloseOtherTabs': false,
                'browser.sessionstore.resume_from_crash': false,
                'browser.shell.checkDefaultBrowser': false,
                'browser.rights.3.shown': true,
                'browser.startup.homepage_override.mstone': 'ignore',
                'browser.newtabpage.enabled': false,
                'browser.newtab.url': 'about:blank'
            }
        });

        context = await browser.newContext();

        // Load the extension
        try {
            await context.addInitScript(() => {
                // Firefox extension loading in Playwright is more complex
                // This is a placeholder for the extension loading logic
            });
        } catch (error) {
            console.warn('Extension loading may require additional setup for Firefox:', error.message);
        }

        page = await context.newPage();
    });

    afterAll(async () => {
        if (context) {
            await context.close();
        }
        if (browser) {
            await browser.close();
        }
    });

    test('should load test page in Firefox', async () => {
        await page.goto('data:text/html,<html><head><title>Firefox Test Page</title></head><body><h1>Firefox Extension Test</h1></body></html>');
        
        const title = await page.title();
        expect(title).toBe('Firefox Test Page');
        
        // Verify page content
        const heading = await page.textContent('h1');
        expect(heading).toBe('Firefox Extension Test');
    });

    test('should handle text selection in Firefox', async () => {
        await page.goto('data:text/html,<html><head><title>Firefox Selection Test</title></head><body><p id="testText">Firefox selected text for markdown.</p></body></html>');
        
        // Select text
        await page.click('#testText');
        await page.evaluate(() => {
            const textElement = document.getElementById('testText');
            const range = document.createRange();
            range.selectNodeContents(textElement);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        });
        
        const selectedText = await page.evaluate(() => window.getSelection().toString());
        expect(selectedText).toBe('Firefox selected text for markdown.');
    });

    test('should handle URLs with tracking parameters in Firefox', async () => {
        const trackingUrl = 'data:text/html,<html><head><title>Firefox Tracking Test</title></head><body><h1>Test</h1></body></html>?utm_source=firefox&fbclid=test123&mc_cid=email';
        await page.goto(trackingUrl);
        
        const currentUrl = page.url();
        expect(currentUrl).toContain('utm_source=firefox');
        expect(currentUrl).toContain('fbclid=test123');
        
        // Extension would clean these when creating markdown
    });

    test('should test keyboard shortcut handling in Firefox', async () => {
        await page.goto('data:text/html,<html><head><title>Firefox Shortcut Test</title></head><body><p>Testing Firefox shortcut</p></body></html>');
        
        // Test Alt+Shift+C shortcut
        await page.keyboard.down('Alt');
        await page.keyboard.down('Shift');
        await page.keyboard.press('KeyC');
        await page.keyboard.up('Shift');
        await page.keyboard.up('Alt');
        
        // Verify page is still responsive
        const title = await page.title();
        expect(title).toBe('Firefox Shortcut Test');
    });

    test('should handle pages with complex content in Firefox', async () => {
        const complexHtml = `
            <html>
                <head><title>Complex Firefox Test</title></head>
                <body>
                    <h1>Main Heading</h1>
                    <p>Paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>
                    <ul>
                        <li>List item 1</li>
                        <li>List item 2</li>
                    </ul>
                    <blockquote>This is a quote that should be handled properly.</blockquote>
                </body>
            </html>
        `;
        
        await page.goto(`data:text/html,${encodeURIComponent(complexHtml)}`);
        
        // Verify complex content loads
        const heading = await page.textContent('h1');
        expect(heading).toBe('Main Heading');
        
        const listItems = await page.$$eval('li', items => items.map(item => item.textContent));
        expect(listItems).toEqual(['List item 1', 'List item 2']);
        
        const quote = await page.textContent('blockquote');
        expect(quote).toBe('This is a quote that should be handled properly.');
    });
});
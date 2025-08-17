const fs = require('fs');
const path = require('path');

// Global setup for E2E tests
beforeAll(async () => {
    // Ensure tmp directory exists for browser profiles
    const tmpDir = path.resolve(__dirname, '../../tmp');
    if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir, { recursive: true });
    }

    // Verify extension builds exist before running tests
    const chromeExtPath = path.resolve(__dirname, '../../dist/chrome');
    const firefoxExtPath = path.resolve(__dirname, '../../dist/mozilla');
    
    if (!fs.existsSync(chromeExtPath) || !fs.existsSync(firefoxExtPath)) {
        console.warn('Extension builds not found. Run "npx webpack" to build extensions before testing.');
    }
});

// Global teardown
afterAll(async () => {
    // Clean up temp profiles after all tests
    const tmpDir = path.resolve(__dirname, '../../tmp');
    if (fs.existsSync(tmpDir)) {
        try {
            fs.rmSync(tmpDir, { recursive: true, force: true });
        } catch (error) {
            console.warn('Failed to clean up temp directory:', error.message);
        }
    }
});

// Increase timeouts for browser operations
jest.setTimeout(30000);
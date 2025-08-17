# Extension Testing

This directory contains automated tests for the Link-Md browser extension.

## Test Types

### Unit Tests (`spec/`)
- **Framework**: Jasmine
- **Purpose**: Test core functionality (ToMarkdown, CleanUrl, etc.)
- **Run**: `npm test`

### E2E Tests (`test/e2e/`)
- **Framework**: Jest + Playwright + Puppeteer
- **Purpose**: Test full extension functionality in real browsers
- **Run**: `npm run test:e2e`

## E2E Test Scenarios

### Chrome Extension Tests
- ✅ Extension loading and accessibility
- ✅ Basic markdown link creation
- ✅ Text selection and quoted links
- ✅ URL tracking parameter removal
- ✅ Keyboard shortcut handling
- ✅ Complex page content handling

### Firefox Extension Tests
- ✅ Extension loading in Firefox
- ✅ Text selection behavior
- ✅ URL parameter cleaning
- ✅ Cross-browser compatibility
- ✅ Complex content handling

## Running Tests

```bash
# Unit tests only
npm test

# E2E tests only (requires built extensions)
npm run build
npm run test:e2e

# All tests
npm run test:all

# Build and test in one command
npm run build:test
```

## CI/CD Integration

The GitHub Actions workflow automatically:
1. Runs unit tests
2. Builds both Chrome and Firefox extensions
3. Installs Playwright browsers
4. Runs E2E tests in headless mode
5. Reports results

## Local Development

### Prerequisites
- Run `npm run build` to create extension builds
- Chrome and Firefox will be launched in isolated test profiles
- Tests run with visible browsers locally, headless in CI

### Test Structure
- **Browser isolation**: Each test uses fresh browser profiles
- **Sequential execution**: Tests run one at a time to avoid conflicts
- **Automatic cleanup**: Temp files cleaned up after tests
- **Cross-platform**: Works on Windows, macOS, and Linux

### Debugging
- Set `headless: false` in test files for visible browser testing
- Check `tmp/` directory for test artifacts
- Use `console.log` in test files for debugging output

## Notes

- E2E tests verify the actual extension functionality end-to-end
- Tests use isolated browser instances that don't affect your personal browser
- Extension builds must exist before running E2E tests
- Some extension APIs (like clipboard) may have limitations in test environments
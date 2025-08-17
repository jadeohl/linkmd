module.exports = {
    rootDir: '../../', // Set root to project root
    testEnvironment: 'node',
    testMatch: [
        '**/test/e2e/**/*.test.js'
    ],
    testTimeout: 30000, // 30 seconds for browser operations
    setupFilesAfterEnv: ['<rootDir>/test/e2e/setup.js'],
    collectCoverage: false, // E2E tests don't need coverage
    verbose: true,
    maxWorkers: 1, // Run tests sequentially to avoid browser conflicts
    testSequencer: '<rootDir>/test/e2e/testSequencer.js'
};
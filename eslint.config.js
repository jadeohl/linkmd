module.exports = [
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                // Browser globals
                window: "readonly",
                document: "readonly",
                navigator: "readonly",
                console: "readonly",
                setTimeout: "readonly",
                
                // Node.js globals for tests and build
                require: "readonly",
                module: "readonly",
                exports: "readonly",
                
                // Browser extension APIs
                chrome: "readonly",
                browser: "readonly",
                
                // Jasmine test globals
                describe: "readonly",
                it: "readonly",
                expect: "readonly",
                beforeEach: "readonly",
                afterEach: "readonly",
                
                // Jest test globals (for E2E tests)
                test: "readonly",
                beforeAll: "readonly",
                afterAll: "readonly",
                jest: "readonly"
            }
        },
        rules: {
            // Error prevention
            "no-unused-vars": "error",
            "no-undef": "error",
            "no-console": "warn",
            
            // Code style
            "indent": ["error", 4],
            "quotes": ["error", "single"],
            "semi": ["error", "always"],
            "comma-dangle": ["error", "never"],
            
            // Best practices
            "eqeqeq": "error",
            "no-var": "error",
            "prefer-const": "error",
            "no-unused-expressions": "error"
        }
    },
    {
        // Special configuration for E2E test files
        files: ["test/e2e/**/*.js"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                // Node.js globals
                require: "readonly",
                module: "readonly",
                exports: "readonly",
                __dirname: "readonly",
                process: "readonly",
                
                // Jest globals
                describe: "readonly",
                test: "readonly",
                expect: "readonly",
                beforeAll: "readonly",
                afterAll: "readonly",
                beforeEach: "readonly",
                afterEach: "readonly",
                jest: "readonly"
            }
        },
        rules: {
            // Relax some rules for test files
            "no-console": "off", // Allow console in tests for debugging
            "no-unused-vars": "warn", // Warn instead of error for test variables
            
            // Code style
            "indent": ["error", 4],
            "quotes": ["error", "single"],
            "semi": ["error", "always"],
            "comma-dangle": ["error", "never"],
            
            // Best practices
            "eqeqeq": "error",
            "no-var": "error",
            "prefer-const": "error"
        }
    }
];
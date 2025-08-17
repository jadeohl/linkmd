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
                afterEach: "readonly"
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
    }
];
module.exports = {
    env: {
        browser: true,
        es2022: true,
        node: true,
        jasmine: true,
        jest: true
    },
    extends: ['eslint:recommended'],
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module'
    },
    globals: {
        // Browser extension APIs
        chrome: 'readonly',
        browser: 'readonly'
    },
    rules: {
        // Error prevention
        'no-unused-vars': 'error',
        'no-undef': 'error',
        'no-console': 'warn',
        
        // Code style
        'indent': ['error', 4],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'comma-dangle': ['error', 'never'],
        
        // Best practices
        'eqeqeq': 'error',
        'no-var': 'error',
        'prefer-const': 'error',
        'no-unused-expressions': 'error'
    },
    overrides: [
        {
            files: ['test/e2e/**/*.js'],
            env: {
                node: true,
                jest: true
            },
            globals: {
                __dirname: 'readonly',
                process: 'readonly'
            },
            rules: {
                'no-console': 'off',
                'no-unused-vars': 'warn'
            }
        }
    ]
};
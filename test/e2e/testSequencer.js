const Sequencer = require('@jest/test-sequencer').default;

class CustomSequencer extends Sequencer {
    sort(tests) {
        // Sort tests to run Chrome tests before Firefox tests
        // This helps with browser resource management
        return tests.sort((testA, testB) => {
            const aName = testA.path;
            const bName = testB.path;
            
            // Chrome tests first
            if (aName.includes('chrome') && !bName.includes('chrome')) {
                return -1;
            }
            if (!aName.includes('chrome') && bName.includes('chrome')) {
                return 1;
            }
            
            // Firefox tests second
            if (aName.includes('firefox') && !bName.includes('firefox')) {
                return -1;
            }
            if (!aName.includes('firefox') && bName.includes('firefox')) {
                return 1;
            }
            
            // Default alphabetical sort for others
            return aName.localeCompare(bName);
        });
    }
}

module.exports = CustomSequencer;
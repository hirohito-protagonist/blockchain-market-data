module.exports = {
    'preset': 'jest-preset-angular',
    'setupFilesAfterEnv': [
        '<rootDir>/setup-jest.ts'
    ],
    'testMatch': [
        '<rootDir>/src/app/**/*.spec.ts'
    ],
    'moduleFileExtensions': [
        'ts',
        'js',
        'html',
        'json'
    ],
    'collectCoverage': true,
    'collectCoverageFrom': [
        '<rootDir>/src/app/**/*.ts',
        '!**/*.module.ts',
        '!**/*.entity.ts',
        '!**/*.view.ts',
        '!**/*.container.ts'
    ],
    'coveragePathIgnorePatterns': [
        '/node_modules/'
    ],
    'moduleNameMapper': {
        '@bmd/core': '<rootDir>/src/app/core/core.module.ts',
        '@bmd/blockchain-data': '<rootDir>/src/app/blockchain-data/blockchain-data.module.ts',
        '@bmd/exchange-rates': '<rootDir>/src/app/exchange-rates/exchange-rates.module.ts'
    }
};
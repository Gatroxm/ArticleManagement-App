module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.jest.json',
        },
    },
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
    moduleDirectories: ['node_modules', 'src'],
    testPathIgnorePatterns: ['<rootDir>/cypress/'],
};


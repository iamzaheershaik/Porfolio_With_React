module.exports = {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css)$': 'identity-obj-proxy',
    },
    transform: {
        '^.+\\.m?jsx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
        '/node_modules/(?!(react-github-calendar|react-activity-calendar|react-tooltip|@testing-library)/)',
    ],
    testPathIgnorePatterns: ['/node_modules/', 'setupTests'],
}

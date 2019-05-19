module.exports = {
  preset: 'ts-jest',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFiles: ['<rootDir>/src/tests/setup.ts'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
}

const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

module.exports = createJestConfig({
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["<rootDir>/__tests__/__mocks__/"],
  moduleNameMapper: {
    "^.+\\.module\\.css$": "<rootDir>/__tests__/__mocks__/styleMock.js",
  },
});

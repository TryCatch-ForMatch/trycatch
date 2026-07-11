import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@tests/(.*)$': '<rootDir>/src/tests/unit/$1',
  },
  transform: {
    '^.+\\.tsx?$': '@swc/jest',
  },

  testMatch: [
    '<rootDir>/src/tests/unit/**/*.test.ts',
    '<rootDir>/src/tests/unit/**/*.test.tsx',
  ],

  testEnvironmentOptions: {
    customExportConditions: [''],
  },

  // Configurações de performance
  workerIdleMemoryLimit: '512MB',
  maxWorkers: '50%',
  testPathIgnorePatterns: ['node_modules'],
};

export default createJestConfig(config);

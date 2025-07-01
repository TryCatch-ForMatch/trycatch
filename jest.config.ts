import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jest-fixed-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@tests/(.*)$': '<rootDir>/src/tests/$1',
  },
  transform: {
    '^.+\\.tsx?$': '@swc/jest',
  },

  testEnvironmentOptions: {
    customExportConditions: [''],
  },

  // Configurações de performance
  workerIdleMemoryLimit: '512MB',
  maxWorkers: '50%',
  testPathIgnorePatterns: ['node_modules'],
};

export default createJestConfig(config);

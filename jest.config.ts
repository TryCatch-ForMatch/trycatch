import type { Config } from 'jest';
import nextJest from 'next/jest.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// cria __dirname no ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  rootDir: __dirname, // caminho absoluto
  testEnvironment: 'jsdom',
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

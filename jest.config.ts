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
    '^@sw/(.*)$': '<rootDir>/src/shared/sandwor/src/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^messages/(.*)$': '<rootDir>/messages/$1',
    // ESM-only пакет — Jest без транспилера падает на его импортах. Подменяем стубом.
    '^next-view-transitions$': '<rootDir>/src/__mocks__/next-view-transitions.tsx',
  },
  testMatch: ['**/__tests__/**/*.test.{ts,tsx}'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
    '!src/__mocks__/**',
    '!src/shared/sandwor/**',
  ],
};

export default createJestConfig(config);

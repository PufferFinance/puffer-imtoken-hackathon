import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import tsconfig from './tsconfig.json';

// https://jestjs.io/docs/configuration
const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/dist/'],
  prettierPath: null,
  setupFilesAfterEnv: ['<rootDir>/test/setup-tests.ts'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,js}'],
  // TODO: Coverage check is disabled for now since we are not doing
  // testing in the first iteration.
  // coverageThreshold: {
  //   global: {
  //     branches: 70,
  //     functions: 70,
  //     lines: 70,
  //     statements: 70,
  //   },
  // },
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
  // Coverage is not collected for these.
  coveragePathIgnorePatterns: [
    'src/index.ts',
    'src/common/model',
    'src/common/lib/environment.ts',
    'src/common/lib/logger.ts',
  ],
};

export default config;

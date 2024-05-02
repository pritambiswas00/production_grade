import { type Config } from 'jest';

export default {
  preset: 'ts-jest',
  clearMocks: true,
  testEnvironment: 'node',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  rootDir: './',
} satisfies Config;

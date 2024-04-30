import { type Config } from 'jest';

export default {
  preset: 'ts-jest',
  clearMocks: true,
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
} satisfies Config;

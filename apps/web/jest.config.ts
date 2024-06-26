import { type Config } from 'jest';

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  injectGlobals: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
} satisfies Config;

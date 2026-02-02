import type { Config } from 'jest';

const config: Config = {
  rootDir: '.',

  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],

  testRegex: '.*\\.spec\\.ts$',

  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },

  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/$1',
  },

  testEnvironment: 'node',
};

export default config;

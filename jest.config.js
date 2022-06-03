// jest.config.js
const nextJest = require('next/jest');

const makeModuleNameMapper = () => {
  const paths = {
    '*': ['types/*.d.ts'],
    '@app-components/*': ['src/components/*'],
    '@app-pages/*': ['src/pages/*'],
    '@app-utils/*': ['src/utils/*'],
    '@app-env': ['src/environment'],
    '@app-test/*': ['test/*'],
  };
  const aliases = {};

  for (const [_key, _path] of Object.entries(paths)) {
    if (_key === '*') {
      continue;
    }
    const key = _key.replace('/*', '/(.*)');
    const path = _path[0].replace('/*', '/$1');
    aliases[key] = '<rootDir>/' + path;
  }

  return aliases;
};

// Providing the path to your Next.js app which will enable loading next.config.js and .env files
const createJestConfig = nextJest({ dir: './' });

// Any custom config you want to pass to Jest
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  moduleNameMapper: makeModuleNameMapper(),
  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported in this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);

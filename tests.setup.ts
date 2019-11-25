// ! Uncomment line below to
// ! make tests use fs in-memory instead of disk
// ! also to make tests run in CI environments.

jest.mock('fs', () => require('memfs'));

// * Debugging Scaffolded Elements
// *
// * When fs is NOT mocked, tests always will
// * create a fresh `__temp__` directory and
// * write demo elements in it so you can view what's been generated.

// * If you do NOT want to use memfs and keep __temp__ directory
// * Add config into package.json > jest to
// * automatically wipe all demo elements created by tests.
// *
// * "globalTeardown": "<rootDir>/tests.reset.ts",

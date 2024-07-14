import { getEnvironmentValue } from '.';

describe('getEnvironmentValue', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...originalEnv }; // Make a copy
  });

  afterAll(() => {
    process.env = originalEnv; // Restore original env
  });

  it('returns the value of the environment variable when set', () => {
    process.env.TEST_VAR = 'test';
    const result = getEnvironmentValue('TEST_VAR');

    expect(result).toBe('test');
  });

  it('returns the default value when the environment variable is not set', () => {
    const result = getEnvironmentValue('UNDEFINED_VAR', 'default');

    expect(result).toBe('default');
  });

  it('throws an error when the environment variable and default value are not set', () => {
    expect(() => getEnvironmentValue('UNDEFINED_VAR')).toThrow('env variable UNDEFINED_VAR has to be defined');
  });

  it('returns an empty string when the environment variable is set to an empty string', () => {
    process.env.TEST_VAR = '';
    const result = getEnvironmentValue('TEST_VAR', 'default');

    expect(result).toBe('');
  });
});

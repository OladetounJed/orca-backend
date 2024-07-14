import { validateBotCommand } from './validateBotCommand';

describe('validateBotCommand', () => {
  it('should return true for /start command', () => {
    expect(validateBotCommand('/start')).toBe(true);
  });

  it('should return true for /admin command', () => {
    expect(validateBotCommand('/adminhello')).toBe(true);
  });

  it('should return false for an invalid command', () => {
    expect(validateBotCommand('/invalid')).toBe(false);
  });

  it('should return false for a command without leading slash', () => {
    expect(validateBotCommand('start')).toBe(false);
  });
});

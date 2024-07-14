import { validateToken } from './validateToken';
import jwt from 'jsonwebtoken';
import { logger } from '../logger';
import { config } from '../../config';

jest.mock('../logger');

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

describe('validateToken', () => {
  const validToken = 'valid.token.here';
  const invalidToken = 'invalid.token.here';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return true for a valid token', () => {
    (jwt.verify as jest.Mock).mockImplementation(() => true); // Mock jwt.verify to simulate a valid token
    expect(validateToken(validToken)).toBe(true);
    expect(jwt.verify).toHaveBeenCalledWith(validToken, config.jwt.secret);
  });

  it('should throw an error for an invalid token', () => {
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });
    expect(() => validateToken(invalidToken)).toThrow('Invalid token');
    expect(jwt.verify).toHaveBeenCalledWith(invalidToken, config.jwt.secret);
    expect(logger.error).toHaveBeenCalled();
  });
});

import { generateUserToken } from './getUserToken';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { logger } from '../logger';

jest.mock('jsonwebtoken');
jest.mock('../logger');

describe('generateUserToken', () => {
  const user = { fullName: 'John Doe', telegramId: '123456' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should generate a token for a user', () => {
    const mockJwtSign = jwt.sign as jest.Mock;

    mockJwtSign.mockReturnValue('mockToken');

    const token = generateUserToken(user);

    expect(token).toEqual('mockToken');
    expect(mockJwtSign).toHaveBeenCalledWith({ fullName: user.fullName, id: user.telegramId }, config.jwt.secret, { expiresIn: '1h' });
  });

  it('should log an error and throw if jwt.sign fails', () => {
    const mockJwtSign = jwt.sign as jest.Mock;
    const error = new Error('jwt error');

    mockJwtSign.mockImplementation(() => {
      throw error;
    });

    expect(() => generateUserToken(user)).toThrow('Invalid token');
    expect(logger.error).toHaveBeenCalledWith(error);
  });
});

import { generateUserToken } from './getUserToken';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { logger } from '../logger';

jest.mock('jsonwebtoken');
jest.mock('../logger');

describe('generateUserToken', () => {
  const user = { telegram_id: '123456' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should generate a token for a user', () => {
    const mockJwtSign = jwt.sign as jest.Mock;

    mockJwtSign.mockReturnValue('mockToken');

    const token = generateUserToken(user);

    expect(token).toEqual('mockToken');
    expect(mockJwtSign).toHaveBeenCalledWith({ id: user.telegram_id }, config.jwt.secret, { expiresIn: '365d' });
  });

  it('should log an error and return null jwt.sign fails', () => {
    const mockJwtSign = jwt.sign as jest.Mock;
    const error = new Error('jwt error');

    mockJwtSign.mockImplementation(() => {
      throw error;
    });

    const result = generateUserToken(user);

    expect(result).toBe(null);
    expect(logger.error).toHaveBeenCalledWith(error);
  });
});

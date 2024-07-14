import { isAdmin } from './isAdmin';
import { User } from '../../models/user.model';
import { logger } from '../../../utils/logger';

jest.mock('../../models/user.model');
jest.mock('../../../utils/logger');

describe('isAdmin', () => {
  it('should return true if the user is an admin', async () => {
    User.findOne = jest.fn().mockResolvedValue({ telegram_id: 12345, role: 'admin' });
    const result = await isAdmin(12345);

    expect(result).toBe(true);
  });

  it('should return false if the user is not an admin', async () => {
    User.findOne = jest.fn().mockResolvedValue(null);
    const result = await isAdmin(12345);

    expect(result).toBe(false);
  });

  it('should log an error and return false on exception', async () => {
    User.findOne = jest.fn().mockRejectedValue(new Error('Database error'));
    const result = await isAdmin(12345);

    expect(logger.error).toHaveBeenCalledWith(new Error('Database error'));
    expect(result).toBe(false);
  });
});

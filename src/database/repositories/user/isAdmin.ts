import { User } from '../../models/user.model';
import { logger } from '../../../utils/logger';

export const isAdmin = async (telegramId: number): Promise<boolean> => {
  try {
    const user = await User.findOne({ telegram_id: telegramId, role: 'admin' });

    return !!user;
  } catch (error) {
    logger.error(error);
    return false;
  }
};

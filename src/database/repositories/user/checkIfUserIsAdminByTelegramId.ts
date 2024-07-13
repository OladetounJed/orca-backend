import { User } from '../../models/user.model';
import { logger } from '../../../utils/logger';

export const checkIfUserIsAdminByTelegramId = async (telegramId: number): Promise<boolean> => {
  try {
    const user = await User.findOne({ telegram_id: telegramId }, { role: 1, _id: 0 });

    return user ? user.role === 'admin' : false;
  } catch (error) {
    logger.error(error);
    return false;
  }
};

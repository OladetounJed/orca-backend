import { User } from '../../models/user.model';
import { logger } from '../../../utils/logger';

export const findUserbyTelegramId = async (telegramId) => {
  try {
    return await User.findOne({ telegram_id: telegramId });
  } catch (error) {
    logger.error(error);
    return null;
  }
};

import { UpdateWriteOpResult } from 'mongoose';
import { logger } from '../../../utils/logger';
import { User } from '../../models/user.model';

export const updateUserRoleByTelegramId = async (telegramId: number, newRole: string): Promise<UpdateWriteOpResult | null> => {
  try {
    const updateResult = await User.updateOne({ telegram_id: telegramId }, { $set: { role: newRole } });

    return updateResult;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

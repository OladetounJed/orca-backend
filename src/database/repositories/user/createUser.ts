import { UserType } from '../../../@types/user';
import { logger } from '../../../utils/logger';
import { User } from '../../models/user.model';

export const createUser = async (user: UserType) => {
  try {
    const newUser = await User.create(user);

    logger.info(`User created successfully: ${user.telegram_id}`);
    return newUser;
  } catch (error) {
    throw new Error('Failed to create user');
  }
};

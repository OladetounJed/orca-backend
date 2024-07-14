import jwt from 'jsonwebtoken';
import { logger } from '.././logger';
import { config } from '../../config';
export const generateUserToken = (user) => {
  try {
    return jwt.sign({ fullName: user.fullName, id: user.telegramId }, config.jwt.secret, { expiresIn: '1h' });
  } catch (error) {
    logger.error(error);
    throw new Error('Invalid token');
  }
};

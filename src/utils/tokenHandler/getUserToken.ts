import jwt from 'jsonwebtoken';
import { logger } from '.././logger';
import { config } from '../../config';
export const generateUserToken = (user) => {
  try {
    return jwt.sign({ id: user.telegram_id }, config.jwt.secret, { expiresIn: '365d' });
  } catch (error) {
    logger.error(error);
    return null;
  }
};

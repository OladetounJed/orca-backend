import jwt from 'jsonwebtoken';
import { logger } from '.././logger';
import { config } from '../../config';
export const generateUserToken = (user) => {
  try {
    console.log({ user });
    return jwt.sign({ id: user.telegram_id }, config.jwt.secret, { expiresIn: '1h' });
  } catch (error) {
    logger.error(error);
    throw new Error('Invalid token');
  }
};

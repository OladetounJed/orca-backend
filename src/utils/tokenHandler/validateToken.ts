import jwt from 'jsonwebtoken';
import { logger } from '../logger';
import { config } from '../../config';

export const validateToken = (token: string): boolean => {
  try {
    jwt.verify(token, config.jwt.secret);
    return true;
  } catch (error) {
    logger.error(error);
    throw new Error('Invalid token');
  }
};

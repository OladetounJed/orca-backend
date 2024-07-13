import { getRedisClient } from '../../database/redisConnection';
import { findUserbyTelegramId } from '../../database/repositories/user/findUserbyTelegramId';
import { logger } from '../../utils/logger';

type Session = {
  firstName?: string;
  telegramId?: number;
};

const redisClient = getRedisClient();

export const storeSessionInRedis = async (session: Session): Promise<number | null> => {
  if (!session.telegramId || !session.firstName) {
    logger.info(`Invalid session data`);
    return null;
  }

  const existingUser = await findUserbyTelegramId(session.telegramId);

  if (existingUser) {
    return null;
  }
  const sessionData = JSON.stringify(session);

  // Save the session data in Redis with a 24-hour expiration
  await redisClient.set(session.telegramId, sessionData, 'EX', 60 * 60 * 24);

  return session.telegramId;
};

export const getSessionData = async (telegramId: string): Promise<Session | null> => {
  const sessionData = await redisClient.get(telegramId);

  if (!sessionData) {
    return null;
  }

  return JSON.parse(sessionData);
};

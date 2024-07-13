// src/database/redisConnection.ts
import Redis from 'ioredis';
import { config } from '../config';
import { logger } from '../utils/logger';

let redisClient;

export const connectRedis = () => {
  try {
    redisClient = new Redis(config.redis.uri);
    logger.info('Connected to Redis');
  } catch (error) {
    logger.error('Redis connection error:', error);
  }
};

export const getRedisClient = () => {
  if (!redisClient) {
    connectRedis();
  }
  return redisClient;
};

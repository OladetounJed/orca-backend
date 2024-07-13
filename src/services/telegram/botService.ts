import TelegramBot from 'node-telegram-bot-api';
import { config } from '../../config';
import { registerBotHandlers } from './commandHandlers';
import { logger } from '../../utils/logger';

let botInstance: TelegramBot | null = null;

export const initializeBot = (): TelegramBot => {
  if (!botInstance) {
    try {
      botInstance = new TelegramBot(config.telegram.token, { polling: true });
      logger.info('Bot initialized');
      registerBotHandlers(botInstance);
    } catch (error) {
      logger.error('Failed to initialize bot:', error);
      throw new Error('Failed to initialize bot');
    }
  }
  return botInstance;
};

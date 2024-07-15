import { UpdateWriteOpResult } from 'mongoose';
import TelegramBot from 'node-telegram-bot-api';
import { logger } from '../logger';

export const handleAdminUpdateResult = (bot: TelegramBot, chatId: number, updatedResult: UpdateWriteOpResult | null, targetTelegramId: number) => {
  if (!updatedResult) {
    bot.sendMessage(chatId, 'an error occurred while processing your command.');
    logger.error('An error occurred while processing the command.');
    return;
  }

  if (updatedResult.matchedCount === 0) {
    bot.sendMessage(chatId, 'no user found, kindly ask the user to create an account first.');
    logger.info(`No user found with the provided Telegram ID: ${targetTelegramId}.`);
    return;
  }

  if (updatedResult.modifiedCount === 0) {
    bot.sendMessage(chatId, 'user is already an admin.');
    logger.info(`User role is already set to the specified value for Telegram ID: ${targetTelegramId}.`);
    return;
  }

  bot.sendMessage(targetTelegramId, 'your role has been updated to admin.');
  bot.sendMessage(chatId, 'user role updated successfully to admin.');
  logger.info(`User role for Telegram ID: ${targetTelegramId} updated successfully to admin.`);
};

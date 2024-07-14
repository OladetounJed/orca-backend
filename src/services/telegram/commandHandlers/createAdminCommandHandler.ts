import TelegramBot from 'node-telegram-bot-api';
import { logger } from '../../../utils/logger';
import { updateUserRoleByTelegramId } from '../../../database/repositories/user/updateUserRoleByTelegramId';
import { handleAdminUpdateResult } from '../../../utils/handlerAdminUpdateResult';
import { isAdmin } from '../../../database/repositories/user/isAdmin';

export const createAdminCommandHandler = async (bot: TelegramBot) => {
  bot.onText(/\/?admincreate(?:\s+(\d+))?(?:\s+.*)?/, async (msg, match) => {
    const telegramId = msg.chat.id;

    try {
      if (!(await isAdmin(telegramId))) {
        bot.sendMessage(telegramId, "you're not authorized to use this command, kindly contact admin.");
        return;
      }

      const targetTelegramId = match ? parseInt(match[1], 10) : null;

      if (targetTelegramId) {
        const updatedResult = await updateUserRoleByTelegramId(targetTelegramId, 'admin');

        if (!updatedResult) {
          bot.sendMessage(telegramId, 'an error occurred while processing your command.');
          return;
        }

        handleAdminUpdateResult(bot, telegramId, updatedResult, targetTelegramId);
      } else {
        bot.sendMessage(telegramId, 'invalid command format. Use /admincreate <telegramId>');
      }
    } catch (error) {
      logger.error('Error handling admin command:', error);
      bot.sendMessage(telegramId, 'an error occurred while processing your command.');
    }
  });
};

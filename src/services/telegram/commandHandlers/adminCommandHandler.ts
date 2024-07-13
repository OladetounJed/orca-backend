import TelegramBot from 'node-telegram-bot-api'; // Adjust the import path according to your project structure
import { logger } from '../../../utils/logger';
import { checkIfUserIsAdminByTelegramId } from '../../../database/repositories/user/checkIfUserIsAdminByTelegramId';

export const adminCommandHandler = (bot: TelegramBot) => {
  bot.onText(/\/?adminhello(?:\s+(\d+))?(?:\s+(.+))?/, async (msg, match) => {
    const chatId = msg.chat.id;

    try {
      if (!(await checkIfUserIsAdminByTelegramId(chatId))) {
        bot.sendMessage(chatId, "you're not authorized to use this command, kindly contact temi.");
        return;
      }

      const targetTelegramId = match ? parseInt(match[1]) : 0;
      const messageToSend = match ? match[2] : '';

      if (targetTelegramId && messageToSend) {
        await bot.sendMessage(targetTelegramId, messageToSend);
        bot.sendMessage(chatId, `message sent to ${targetTelegramId}`);
      } else {
        bot.sendMessage(chatId, 'invalid command format. Use /adminhello <telegramId> <message>');
      }
    } catch (error) {
      logger.error('Error handling admin command:', error);
      bot.sendMessage(chatId, 'An error occurred while processing your command.');
    }
  });
};

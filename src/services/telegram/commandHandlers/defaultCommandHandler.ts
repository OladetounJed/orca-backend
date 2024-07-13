import TelegramBot from 'node-telegram-bot-api';
import { logger } from '../../../utils/logger';
import { validateBotCommand } from '../../../utils/validateBotCommand';

export const defaultCommandHandler = async (bot: TelegramBot) => {
  bot.onText(/\/(\w+)(\s+.*)?/, async (msg, match) => {
    const chatId = msg.chat.id;
    const command = match ? `/${match[1]}` : '';

    try {
      const isValidCommand = validateBotCommand(command);

      if (!isValidCommand) {
        const helpMessage = "sorry, i didn't understand that command. here's what I can do:\n" + '/start - get started with orca\n';

        bot.sendMessage(chatId, helpMessage);
        logger.info(`Invalid command received: ${command} from chat Id: ${chatId}`);
      }
    } catch (error) {
      logger.error(`Error handling command: ${command} from chat ID: ${chatId}`, error);
      bot.sendMessage(chatId, 'an error occurred while processing your command. please try again later.');
    }
  });
};

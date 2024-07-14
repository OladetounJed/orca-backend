import TelegramBot from 'node-telegram-bot-api'; // Adjust the import path according to your project structure
import { config } from '../../../config';
import { logger } from '../../../utils/logger';
import { storeSessionInRedis } from '../../user/userSessionHandler';
import { startCommandMessageFallback } from '../../../utils/startCommandMessageFallback';

export const startCommandHandler = (bot: TelegramBot) => {
  bot.onText(/\/start/, (msg: TelegramBot.Message) => {
    try {
      const chatId = msg.chat.id;
      const firstName = msg.from?.first_name;
      const telegramId = msg.from?.id;

      logger.info(msg);

      const sessionId = storeSessionInRedis({ firstName, telegramId });

      const webUrl = sessionId ? `${config.web.url}/register?sessionId=${sessionId}` : config.web.url;

      bot
        .sendAnimation(chatId, config.web.bannerUrl, {
          caption: `hi, ${firstName}! 👋 welcome to orca.\n\nwe're thrilled to have you onboard. Let's dive in!`,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: '🐳orca.',
                  web_app: {
                    url: webUrl,
                  },
                },
              ],
            ],
          },
        })
        .catch((error) => {
          logger.error('Error sending photo with /start command:', error);
          startCommandMessageFallback(bot, chatId, firstName, webUrl);
        });
    } catch (error) {
      logger.error('Error handling /start command:', error);
    }
  });
};

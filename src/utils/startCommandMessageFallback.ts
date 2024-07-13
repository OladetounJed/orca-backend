import TelegramBot from 'node-telegram-bot-api';

export const startCommandMessageFallback = (bot: TelegramBot, chatId: number, firstName: string | undefined, webUrl: string) => {
  bot.sendMessage(chatId, `hi, ${firstName}! 👋 welcome to orca.\n\nwe're thrilled to have you onboard. Let's dive in!`, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '🐳Orca.',
            web_app: {
              url: webUrl,
            },
          },
        ],
      ],
    },
  });
};

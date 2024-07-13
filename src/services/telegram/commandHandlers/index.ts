import TelegramBot from 'node-telegram-bot-api';
import { startCommandHandler } from './startCommandHandler';
import { adminCommandHandler } from './adminCommandHandler';
import { createAdminCommandHandler } from './createAdminCommandHandler';
import { defaultCommandHandler } from './defaultCommandHandler';

export const registerBotHandlers = (bot: TelegramBot) => {
  startCommandHandler(bot);
  adminCommandHandler(bot);
  createAdminCommandHandler(bot);
  defaultCommandHandler(bot);
};

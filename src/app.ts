import * as TelegramBot from 'node-telegram-bot-api';

import { BotHandlersManager } from '@/modules/handlers';

export function app(token: string) {
  const bot = new TelegramBot(token, { polling: true });

  const botHandlersManager = new BotHandlersManager(bot, token);

  bot.on('message', onMessage);

  async function onMessage(msg: TelegramBot.Message) {
    await botHandlersManager.handle(msg);
  }
}

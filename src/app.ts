import TelegramBot = require('node-telegram-bot-api');

import { BotHandlers } from '@/BotHandlers';

export function app(token: string) {
  const bot = new TelegramBot(token, { polling: true });

  bot.on('message', onMessage);

  const botHandlers = new BotHandlers(bot);

  async function onMessage(msg: TelegramBot.Message) {
    if (msg?.document) await botHandlers.onFile(msg);
    else await botHandlers.onText(msg);
  }
}

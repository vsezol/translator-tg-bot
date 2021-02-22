import * as TelegramBot from 'node-telegram-bot-api';

import { BotHandlers } from '@/modules/BotHandlers';

export function app(token: string) {
  const bot = new TelegramBot(token, { polling: true });

  bot.on('message', onMessage);

  const botHandlers = new BotHandlers(bot, token);

  async function onMessage(msg: TelegramBot.Message) {
    if (!!msg?.photo) await botHandlers.onPhoto(msg);
    else if (!!msg?.document) await botHandlers.onFile(msg);
    else await botHandlers.onText(msg);
  }
}

import * as TelegramBot from 'node-telegram-bot-api';

import { BotHandlers } from '@/modules/BotHandlers';
import CommandParser from '@/modules/CommandParser';

export function app(token: string) {
  const bot = new TelegramBot(token, { polling: true });

  bot.on('message', onMessage);

  const botHandlers = new BotHandlers(bot, token);

  async function onMessage(msg: TelegramBot.Message) {
    if (!!msg?.photo) {
      await botHandlers.onPhoto(msg);
    } else if (!!msg?.document) {
      await botHandlers.onFile(msg);
    } else if (CommandParser.isCommand(msg.text, '/start')) {
      await botHandlers.onCmdStart(msg);
    } else if (CommandParser.isCommand(msg.text, '/set')) {
      await botHandlers.onCmdSet(msg);
    } else {
      await botHandlers.onText(msg);
    }
  }
}

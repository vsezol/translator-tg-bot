import * as TelegramBot from 'node-telegram-bot-api';
import * as path from 'path';

import {
  createEncodeManager,
  generatePathForEncodedFile,
  getEncodedBufferFromText,
} from './encode';

export class BotHandlers {
  bot: TelegramBot;

  constructor(bot: TelegramBot) {
    this.bot = bot;
  }

  async onText(msg: TelegramBot.Message) {
    const path = generatePathForEncodedFile();
    const encodedBuffer = getEncodedBufferFromText(msg.text);

    const encodeManager = createEncodeManager(path, encodedBuffer);

    await encodeManager.next().value;

    try {
      await this.bot.sendDocument(msg.chat.id, path);
    } catch {
      await this.onError(msg);
    }

    await encodeManager.next().value;
  }

  async onFile(msg: TelegramBot.Message) {
    this.bot.sendMessage(msg.chat.id, 'Эта функция пока не доступна!');
  }

  async onError(msg: TelegramBot.Message) {
    const errorSticker = path.join(
      __dirname,
      'assets',
      'stickers',
      'error.webp'
    );
    await this.bot.sendSticker(msg.chat.id, errorSticker);
  }
}

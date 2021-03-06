import * as TelegramBot from 'node-telegram-bot-api';

import { SendingError } from '@/modules/errors';
export default class FileSender {
  private bot: TelegramBot;
  constructor(bot: TelegramBot) {
    this.bot = bot;
  }

  async send(chatId: number, path: string) {
    await this.bot.sendDocument(chatId, path).catch((error) => {
      console.log('ERROR')
      throw new SendingError(
        'Error in sending file to user after saving.',
        path,
        chatId
      );
    });
  }
}

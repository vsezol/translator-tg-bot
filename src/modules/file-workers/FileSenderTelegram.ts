import * as TelegramBot from 'node-telegram-bot-api';
import { Canvas } from 'canvas';

import { RemovingError, SavingError, SendingError } from '../errors/Error';

import FileRemover from './FileRemover';
import ImageWorker from './ImageWorker';
import PathGenerator from './PathGenerator';

export default class FileSenderTelegram {
  private bot: TelegramBot;
  constructor(bot: TelegramBot) {
    this.bot = bot;
  }

  async send(chatId: number, canvas: Canvas) {
    const path = PathGenerator.generatePathForEncodedFile();

    await ImageWorker.save(path, canvas).catch(() => {
      throw new SavingError(
        'Error in saving file before sending to user.',
        path
      );
    });

    await this.bot.sendDocument(chatId, path).catch((error) => {
      throw new SendingError(
        'Error in sending file to user after saving.',
        path,
        chatId
      );
    });

    await FileRemover.remove(path).catch((error) => {
      throw new RemovingError(
        'Error in removing file after sending to user.',
        path
      );
    });
  }
}

import { Base64 } from 'js-base64';
import * as TelegramBot from 'node-telegram-bot-api';
import * as path from 'path';

import ImageWorker from '@/modules/file-workers/ImageWorker';
import FileRemover from '@/modules/file-workers/FileRemover';
import PathGenerator from '@/modules/file-workers/PathGenerator';

import EncoderTextToImage from '@/modules/EncoderTextToImage';

import DrawerEncodedContentOnCanvas from '@/modules/DrawerEncodedContentOnCanvas';

export class BotHandlers {
  bot: TelegramBot;

  constructor(bot: TelegramBot) {
    this.bot = bot;
  }

  async onText(msg: TelegramBot.Message) {
    const path = PathGenerator.generatePathForEncodedFile();

    const encodedText = Base64.encode(msg.text);

    const encoderImage = new EncoderTextToImage({
      encodedText,
    });
    const encodedContent = encoderImage.encode();

    const drawerEncodedContentOnCanvas = new DrawerEncodedContentOnCanvas({
      encodedContent,
    });
    const canvas = drawerEncodedContentOnCanvas.draw();

    ImageWorker.save(path, canvas)
      .then(() => Promise.resolve())
      .catch((error) => {
        console.log(error);
        this.onError(msg);
      })

      .then(() => this.bot.sendDocument(msg.chat.id, path))
      .catch((error) => {
        console.log(error);
        this.onError(msg);
      })

      .then(() => FileRemover.remove(path))
      .catch((error) => {
        console.log(error);
        this.onError(msg);
      });
  }

  async onFile(msg: TelegramBot.Message) {
    this.bot.sendMessage(msg.chat.id, 'Эта функция пока не доступна!');
  }

  private async onError(msg: TelegramBot.Message) {
    const errorSticker = path.join(
      __dirname,
      'assets',
      'stickers',
      'error.webp'
    );
    await this.bot.sendSticker(msg.chat.id, errorSticker);
  }
}

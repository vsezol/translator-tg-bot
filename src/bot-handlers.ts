import { Base64 } from 'js-base64';
import * as TelegramBot from 'node-telegram-bot-api';
import * as path from 'path';

import { generatePathForEncodedFile } from './encode';
import EncoderImageImpl from './EncoderImage';

import * as extractFrames from 'ffmpeg-extract-frames';

export class BotHandlers {
  bot: TelegramBot;

  constructor(bot: TelegramBot) {
    this.bot = bot;
  }

  async onText(msg: TelegramBot.Message) {
    const path = generatePathForEncodedFile();

    const encodedText = Base64.encode(msg.text);
    const encoderImage = new EncoderImageImpl({
      encodedText,
      path,
      pixelSize: 100,
    });

    encoderImage.encode();

    encoderImage
      .save()

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

      .then(() => encoderImage.remove())
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

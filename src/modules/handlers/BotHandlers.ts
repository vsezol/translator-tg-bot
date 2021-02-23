import * as TelegramBot from 'node-telegram-bot-api';

import appConfig from '@/app.config';
import {
  FileSender,
  FileRemover,
  ImageDownloader,
} from '@/modules/fileWorkers';
import { SavingError, SendingError } from '@/modules/errors';
import {
  TextToImageTransformer,
  ImageToTextTransformer,
} from '@/modules/transformers';
import Logger from '@/modules/Logger';
import { PathGenerator } from '@/modules/utils';

export default class BotHandlers {
  private bot: TelegramBot;
  private token: string;
  private pixelSize: number;

  constructor(bot: TelegramBot, token: string) {
    this.bot = bot;
    this.token = token;
    this.pixelSize = appConfig.encoded.pixelSize;
  }

  onCmdStart(msg: TelegramBot.Message) {
    this.bot.sendMessage(
      msg.chat.id,
      'Hello! I can convert text to encoded image and back!'
    );
  }

  async onText(msg: TelegramBot.Message) {
    Logger.logMessage(msg);

    const path = PathGenerator.generatePathForEncodedFile();

    const textToImageTransformer = new TextToImageTransformer({
      outPath: path,
      text: msg.text,
      pixelSize: this.pixelSize,
    });

    await textToImageTransformer.transform().catch((error) => {
      if (error instanceof SavingError) {
        this.onError(msg);
      }
    });

    await this.sendFile(msg, path);

    textToImageTransformer.clear();
  }

  async onFile(msg: TelegramBot.Message) {
    const fileId = msg.document.file_id;
    const size = msg.document.thumb.width;

    const fileDownloader = new ImageDownloader(this.bot, this.token);
    const imgPath = await fileDownloader.downloadImage(fileId);

    const decodedText = await ImageToTextTransformer.transform({
      path: imgPath,
      pixelSize: this.pixelSize,
      size,
    });

    await this.bot.sendMessage(msg.chat.id, decodedText);

    FileRemover.remove(imgPath);
  }

  onPhoto(msg: TelegramBot.Message) {
    this.bot.sendMessage(msg.chat.id, 'Please send photo as document!');
  }

  onError(msg: TelegramBot.Message) {
    this.bot.sendMessage(msg.chat.id, 'Error in operation. Sorry :(');
  }

  private async sendFile(msg: TelegramBot.Message, path: string) {
    const fileSender = new FileSender(this.bot);
    await fileSender.send(msg.chat.id, path).catch((error) => {
      if (error instanceof SendingError) {
        this.onError(msg);
      }
      console.log(error);
    });
  }
}

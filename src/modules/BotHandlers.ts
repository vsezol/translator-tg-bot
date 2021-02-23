import * as TelegramBot from 'node-telegram-bot-api';

import FileRemover from '@/modules/fileWorkers/FileRemover';

import ImageDownloader from '@/modules/fileWorkers/ImageDownloader';
import FileSender from '@/modules/fileWorkers/FileSender';
import { SavingError, SendingError } from '@/modules/errors/Error';
import TextToImageTransformer from '@/modules/transformers/TextToImageTransformer';
import ImageToTextTransformer from '@/modules/transformers/ImageToTextTransformer';
import CommandParser from '@/modules/CommandParser';
import Logger from '@/modules/Logger';
import PathGenerator from './utils/PathGenerator';

export class BotHandlers {
  private bot: TelegramBot;
  private token: string;
  private pixelSize: number = 5;

  constructor(bot: TelegramBot, token: string) {
    this.bot = bot;
    this.token = token;
  }

  onCmdStart(msg: TelegramBot.Message) {
    this.bot.sendMessage(
      msg.chat.id,
      'Hello! I can convert text to encoded image and back!'
    );
  }

  onCmdSet(msg: TelegramBot.Message) {
    const cmd = CommandParser.parseCommand(msg.text);
    if (cmd.name === 'password') {
    } else {
      this.bot.sendMessage(msg.chat.id, 'Sorry, unknown command!');
    }
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

  private async sendFile(msg: TelegramBot.Message, path: string) {
    const fileSender = new FileSender(this.bot);
    await fileSender.send(msg.chat.id, path).catch((error) => {
      if (error instanceof SendingError) {
        this.onError(msg);
      }
      console.log(error);
    });
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
}

import * as TelegramBot from 'node-telegram-bot-api';

import FileRemover from '@/modules/file-workers/FileRemover';

import FileDownloaderFromTelegram from '@/modules/file-workers/FileDownloaderFromTelegram';
import FileSenderTelegram from '@/modules/file-workers/FileSenderTelegram';
import { SavingError, SendingError } from '@/modules/errors/Error';
import TransformerTextToEncodedImage from '@/modules/TransformerTextToEncodedImage';
import TransformerEnocdedImageToText from '@/modules/TransformerEnocdedImageToText';
import ParserCommand from '@/modules/ParserCommand';
import Logger from '@/modules/Logger';

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
    const cmd = ParserCommand.parseCommand(msg.text);
    if (cmd.name === 'password') {
    } else if (cmd.name === 'pixelSize') {
      this.pixelSize = +cmd.value;
    } else {
      this.bot.sendMessage(msg.chat.id, 'Sorry, unknown command!');
    }
  }

  async onText(msg: TelegramBot.Message) {
    Logger.logMessage(msg);

    const canvas = TransformerTextToEncodedImage.transform(
      msg.text,
      this.pixelSize
    );

    const fileSender = new FileSenderTelegram(this.bot);
    await fileSender.send(msg.chat.id, canvas).catch((error) => {
      if (error instanceof SavingError || error instanceof SendingError) {
        this.onError(msg);
      }
      console.log(error);
    });
  }

  async onFile(msg: TelegramBot.Message) {
    const fileId = msg.document.file_id;
    const size = msg.document.thumb.width;

    const fileDownloader = new FileDownloaderFromTelegram(this.bot, this.token);
    const downloadedImagePath = await fileDownloader.downloadImage(fileId);

    const decodedText = await TransformerEnocdedImageToText.transform(
      downloadedImagePath,
      size,
      this.pixelSize
    );

    await this.bot.sendMessage(msg.chat.id, decodedText);

    FileRemover.remove(downloadedImagePath);
  }

  onPhoto(msg: TelegramBot.Message) {
    this.bot.sendMessage(msg.chat.id, 'Please send photo as document!');
  }

  onError(msg: TelegramBot.Message) {
    this.bot.sendMessage(msg.chat.id, 'Error in operation. Sorry :(');
  }
}

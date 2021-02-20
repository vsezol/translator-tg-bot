import * as TelegramBot from 'node-telegram-bot-api';

import FileRemover from '@/modules/file-workers/FileRemover';

import FileDownloaderFromTelegram from './file-workers/FileDownloaderFromTelegram';
import DrawerEncodedImageOnCanvas from './DrawerEncodedImageOnCanvas';
import DecoderImageToText from './DecoderImageToText';
import FileSenderTelegram from './file-workers/FileSenderTelegram';
import { SavingError, SendingError } from './errors/Error';
import TransformerTextToEncodedImage from './TransformerTextToEncodedImage';

export class BotHandlers {
  private bot: TelegramBot;
  private token: string;

  constructor(bot: TelegramBot, token: string) {
    this.bot = bot;
    this.token = token;
  }

  async onText(msg: TelegramBot.Message) {
    const canvas = TransformerTextToEncodedImage.transform(msg.text);

    const fileSender = new FileSenderTelegram(this.bot);
    await fileSender.send(msg.chat.id, canvas).catch((error) => {
      if (error instanceof SavingError || error instanceof SendingError) {
        this.onError(msg);
      }
      console.log(error);
    });
  }

  async onPhoto(msg: TelegramBot.Message) {
    this.bot.sendMessage(msg.chat.id, 'Please send photo as document!');
  }

  async onFile(msg: TelegramBot.Message) {
    const fileId = msg.document.file_id;

    const fileDownloader = new FileDownloaderFromTelegram(this.bot, this.token);

    const downloadedImagePath = await fileDownloader.downloadImage(fileId);

    const size = msg.document.thumb.width;
    const drawerEncodedImageOnCanvas = new DrawerEncodedImageOnCanvas(size);

    const { context } = await drawerEncodedImageOnCanvas.draw(
      downloadedImagePath
    );

    const decoderImageToText = new DecoderImageToText(context, size);
    const decodedContent = decoderImageToText.decode();

    await this.bot.sendMessage(msg.chat.id, decodedContent);

    FileRemover.remove(downloadedImagePath);
  }

  private async onError(msg: TelegramBot.Message) {
    this.bot.sendMessage(msg.chat.id, 'Error in operation. Sorry :(');
  }
}

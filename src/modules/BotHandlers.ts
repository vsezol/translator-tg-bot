import * as path from 'path';

import * as TelegramBot from 'node-telegram-bot-api';
import { Base64 } from 'js-base64';

import ImageWorker from '@/modules/file-workers/ImageWorker';
import FileRemover from '@/modules/file-workers/FileRemover';
import PathGenerator from '@/modules/file-workers/PathGenerator';

import EncoderTextToImage from '@/modules/EncoderTextToImage';

import DrawerEncodedContentOnCanvas from '@/modules/DrawerEncodedContentOnCanvas';
import { Canvas, loadImage } from 'canvas';
import EncodedContentWrapper from './EncodedContentWrapper';
import FileDownloaderFromTelegram from './file-workers/FileDownloaderFromTelegram';
import DrawerEncodedImageOnCanvas from './DrawerEncodedImageOnCanvas';
import DecoderImageToText from './DecoderImageToText';

export class BotHandlers {
  private bot: TelegramBot;
  private token: string;

  constructor(bot: TelegramBot, token: string) {
    this.bot = bot;
    this.token = token;
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
      pixelSize: 1,
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

  async onPhoto(msg: TelegramBot.Message) {
    this.bot.sendMessage(
      msg.chat.id,
      'Пожалуйста отправьте фотографию документом!'
    );
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

    this.bot.sendMessage(msg.chat.id, decodedContent);
  }

  private async onError(msg: TelegramBot.Message) {
    const errorSticker = path.join(
      __dirname,
      'assets',
      'stickers',
      'error.webp'
    );
    this.bot.sendSticker(msg.chat.id, errorSticker);
  }
}

import * as fs from 'fs';

import * as request from 'request';
import * as TelegramBot from 'node-telegram-bot-api';

import { DownloadingError, SavingError } from '@/modules/errors';
import { PathGenerator } from '@/modules/utils';

class FileDownloader {
  protected download(url, path) {
    return new Promise((resolve, reject) => {
      request.head(url, (err, res, body) => {
        if (err) {
          console.log(err);
          reject(new DownloadingError('Error in downloading file.', url));
        }

        request(url)
          .pipe(fs.createWriteStream(path))
          .on('close', resolve)
          .on('error', (err) => {
            console.log(err);
            reject(new SavingError('Error in saving dowloaded file.', path));
          });
      });
    });
  }
}

export default class ImageDownloader extends FileDownloader {
  private token: string;
  private bot: TelegramBot;

  constructor(bot: TelegramBot, token: string) {
    super();

    this.token = token;
    this.bot = bot;
  }

  async downloadImage(fileId) {
    const { file_path } = await this.bot.getFile(fileId);

    const url = `https://api.telegram.org/file/bot${this.token}/${file_path}`;
    const savingPath = PathGenerator.generatePathForEncodedFile();

    await this.download(url, savingPath).catch((e) => {
      throw e;
    });

    return savingPath;
  }
}

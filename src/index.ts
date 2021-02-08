process.env.NTBA_FIX_319 = '1';
process.env.NTBA_FIX_350 = '1';

import * as dotenv from 'dotenv';
import * as TelegramBot from 'node-telegram-bot-api';
import {
  createEncodeManager,
  generatePathForEncodedFile,
  getEncodedBufferFromText
} from './encode';

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

const handlers = {
  text: async (msg: TelegramBot.Message) => {
    const path = generatePathForEncodedFile();
    const encodedBuffer = getEncodedBufferFromText(msg.text);

    console.log(encodedBuffer)

    const encodeManager = createEncodeManager(path, encodedBuffer);

    await encodeManager.next().value;

    await bot.sendDocument(msg.chat.id, path);

    await encodeManager.next().value;
  },

  file: async (msg: TelegramBot.Message) => {
    // const fileId = msg.document.file_id;
    // const file = await bot.getFile(fileId);
    // const file_path = file.file_path;
    // console.log(file_path);
    bot.sendMessage(msg.chat.id, 'Эта функция пока не доступна!');
  }
};

bot.on('message', async (msg) => {
  if (msg?.document) await handlers.file(msg);
  else await handlers.text(msg);
});

process.env.NTBA_FIX_319 = '1';

import * as dotenv from 'dotenv';
import * as TelegramBot from 'node-telegram-bot-api';
import { createEncodeManager } from './encode';

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

const handlers = {
  text: async (msg: TelegramBot.Message) => {
    const encodeManager = createEncodeManager(msg.text);

    const filePath = await encodeManager.next().value;

    await bot.sendDocument(msg.chat.id, filePath);

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

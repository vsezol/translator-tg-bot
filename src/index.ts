process.env.NTBA_FIX_319 = '1';

import * as dotenv from 'dotenv';
import * as TelegramBot from 'node-telegram-bot-api';

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Received your message');
});

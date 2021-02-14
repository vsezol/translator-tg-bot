process.env.NTBA_FIX_319 = '1';
process.env.NTBA_FIX_350 = '1';

import * as dotenv from 'dotenv';
import * as TelegramBot from 'node-telegram-bot-api';
import { BotHandlers } from './bot-handlers';

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.on('message', onMessage);

const botHandlers = new BotHandlers(bot);

async function onMessage(msg: TelegramBot.Message) {
  if (msg?.document) await botHandlers.onFile(msg);
  else await botHandlers.onText(msg);
}
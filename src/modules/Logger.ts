import * as TelegramBot from 'node-telegram-bot-api';

export default class Logger {
  static logMessage(msg: TelegramBot.Message) {
    console.group('new message');
    console.log(msg.from.username);
    console.log(msg.from.first_name, msg.from.last_name);
    console.log(msg.text);
    console.groupEnd();
  }
}

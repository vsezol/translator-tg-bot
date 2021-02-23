import * as TelegramBot from 'node-telegram-bot-api';
import BotHandlers from './BotHandlers';
import CommandParser from '../CommandParser';

export default class BotHandlersManager {
  private botHandlers: BotHandlers;

  constructor(bot: TelegramBot, token: string) {
    this.botHandlers = new BotHandlers(bot, token);
  }

  async handle(msg: TelegramBot.Message) {
    const { handler } = this.createHandlers(msg).find(
      ({ condition }) => condition
    );
    await handler();
  }

  private createHandlers(
    msg: TelegramBot.Message
  ): { condition: boolean; handler: Function }[] {
    return [
      {
        condition: !!msg?.photo,
        handler: () => this.botHandlers.onPhoto(msg),
      },
      {
        condition: !!msg?.document,
        handler: () => this.botHandlers.onFile(msg),
      },
      {
        condition: !!msg.text && CommandParser.isCommand(msg.text, '/start'),
        handler: () => this.botHandlers.onCmdStart(msg),
      },
      {
        condition: !!msg.text,
        handler: () => this.botHandlers.onText(msg),
      },
    ];
  }
}

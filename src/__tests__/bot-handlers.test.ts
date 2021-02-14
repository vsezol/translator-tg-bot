import * as dotenv from 'dotenv';
dotenv.config();

import { BotHandlers } from '../bot-handlers';
import * as TelegramBot from 'node-telegram-bot-api';

const mockSendDocument = jest.fn().mockImplementation(function () {
  return Promise.resolve();
});

jest.mock(
  'node-telegram-bot-api',
  () =>
    function () {
      this.sendDocument = mockSendDocument;
    }
);

describe('bot-handlers', () => {
  describe('onText', () => {
    it('bot.sendDocument calls with chatId and path', async () => {
      const FAKE_TOKEN = 'FAKE_TOKEN';
      const FAKE_MSG = {
        text: 'Fake text',
        chat: {
          id: 'Fake chat id',
        },
      } as any;

      const bot = new TelegramBot(FAKE_TOKEN);

      const botHandlers = new BotHandlers(bot);

      await botHandlers.onText(FAKE_MSG);

      expect(bot.sendDocument).toBeCalledWith(
        FAKE_MSG.chat.id,
        expect.any(String)
      );
    });
  });
});

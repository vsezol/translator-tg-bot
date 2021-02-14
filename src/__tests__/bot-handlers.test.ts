// import * as dotenv from 'dotenv';
// dotenv.config();

// import { BotHandlers } from '../bot-handlers';
// import * as TelegramBot from 'node-telegram-bot-api';

// const mockSendDocument = jest
//   .fn()
//   .mockImplementation(function (chatId: string, path: string) {
//     return Promise.resolve();
//   });

// const mockSendSticker = jest
//   .fn()
//   .mockImplementation(function (chatId: string, path: string) {
//     return Promise.resolve();
//   });

// jest.mock(
//   'node-telegram-bot-api',
//   () =>
//     function () {
//       this.sendDocument = mockSendDocument;
//       this.sendSticker = mockSendSticker;
//     }
// );

// describe('bot-handlers', () => {
//   describe('onText', () => {
//     let FAKE_TOKEN: string;
//     let FAKE_MSG: TelegramBot.Message;
//     let bot: TelegramBot;
//     let botHandlers: BotHandlers;

//     beforeEach(async () => {
//       FAKE_TOKEN = 'FAKE_TOKEN';
//       FAKE_MSG = {
//         text: 'Fake text',
//         chat: {
//           id: 'Fake chat id',
//         },
//       } as any;

//       bot = new TelegramBot(FAKE_TOKEN);

//       botHandlers = new BotHandlers(bot);
//     });

//     it('bot.sendDocument calls with chatId and path', async () => {
//       await botHandlers.onText(FAKE_MSG);

//       expect(bot.sendDocument).toBeCalledWith(
//         FAKE_MSG.chat.id,
//         expect.any(String)
//       );
//     });

//     it('when error in onText', async () => {
//       mockSendDocument.mockRejectedValue(null);

//       await botHandlers.onText(FAKE_MSG);

//       expect(bot.sendSticker).toBeCalledWith(
//         FAKE_MSG.chat.id,
//         expect.any(String)
//       );
//     });
//   });
// });

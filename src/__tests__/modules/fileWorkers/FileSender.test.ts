import { SendingError } from '@/modules/errors';
import { FileSender } from '@/modules/fileWorkers';

import * as TelegramBot from 'node-telegram-bot-api';

const mockSendDocument = jest.fn().mockResolvedValue(null);

jest.mock('node-telegram-bot-api', () => {
  return jest.fn().mockImplementation(function () {
    return {
      sendDocument: mockSendDocument,
    };
  });
});

describe('FileSender', () => {
  const FAKE_TOKEN = 'FAKE_TOKEN';
  const FAKE_CHAT_ID = 22;
  const FAKE_PATH = 'FAKE_PATH/TO/FAKE_PATH';

  let bot: TelegramBot;
  let fileSender: FileSender;

  beforeEach(() => {
    bot = new TelegramBot(FAKE_TOKEN);
    fileSender = new FileSender(bot);
  });

  it('calls bot.sendDocument', async () => {
    await fileSender.send(FAKE_CHAT_ID, FAKE_PATH);

    expect(bot.sendDocument).toHaveBeenCalled();
  });

  it('calls bot.sendDocument with right props', async () => {
    await fileSender.send(FAKE_CHAT_ID, FAKE_PATH);

    expect(bot.sendDocument).toHaveBeenCalledWith(FAKE_CHAT_ID, FAKE_PATH);
  });

  it('throws SendingError if bot.sendDocument rejected', async () => {
    mockSendDocument.mockRejectedValue(null);

    await expect(fileSender.send(FAKE_CHAT_ID, FAKE_PATH)).rejects.toThrow(
      SendingError
    );
  });
});

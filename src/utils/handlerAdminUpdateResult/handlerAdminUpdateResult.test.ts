import { handleAdminUpdateResult } from './handlerAdminUpdateResult';
import { UpdateWriteOpResult } from 'mongoose';
import TelegramBot from 'node-telegram-bot-api';

jest.mock('node-telegram-bot-api');
const mockBot = new TelegramBot('');

describe('handleAdminUpdateResult', () => {
  const chatId = 12345;
  const targetTelegramId = 67890;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send an error message if updatedResult is null', () => {
    handleAdminUpdateResult(mockBot, chatId, null, targetTelegramId);
    expect(mockBot.sendMessage).toHaveBeenCalledWith(chatId, 'an error occurred while processing your command.');
  });

  it('should inform no user found if matchedCount is 0', () => {
    const updatedResult: UpdateWriteOpResult = {
      matchedCount: 0,
      modifiedCount: 1,
      upsertedCount: 0,
      upsertedId: null,
      acknowledged: true,
    };

    handleAdminUpdateResult(mockBot, chatId, updatedResult, targetTelegramId);
    expect(mockBot.sendMessage).toHaveBeenCalledWith(chatId, 'no user found, kindly ask the user to create an account first.');
  });

  it('should inform user is already an admin if modifiedCount is 0', () => {
    const updatedResult: UpdateWriteOpResult = {
      matchedCount: 1,
      modifiedCount: 0,
      upsertedCount: 0,
      upsertedId: null,
      acknowledged: true,
    };

    handleAdminUpdateResult(mockBot, chatId, updatedResult, targetTelegramId);
    expect(mockBot.sendMessage).toHaveBeenCalledWith(chatId, 'user is already an admin.');
  });

  it('should confirm user role updated successfully if modifiedCount is greater than 0', () => {
    const updatedResult: UpdateWriteOpResult = {
      matchedCount: 1,
      modifiedCount: 1,
      upsertedCount: 0,
      upsertedId: null,
      acknowledged: true,
    };

    handleAdminUpdateResult(mockBot, chatId, updatedResult, targetTelegramId);
    expect(mockBot.sendMessage).toHaveBeenCalledWith(chatId, 'user role updated successfully to admin.');
  });
});

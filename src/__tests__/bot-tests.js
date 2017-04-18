import Az from 'az';
import SwearBot from '../bot';
import * as constants from '../constants';

beforeAll(() =>
  new Promise((resolve) =>
    Az.Morph.init(() => resolve())));

test('Send greeting on `/start`', () => {
  const bot = new SwearBot();
  bot.run();
  bot.bot.simulateReceivingText({chat: {id: 0}, text: '/start'});

  const [chatId, text] = bot.bot.sendMessage.mock.calls[0];
  expect(chatId).toBe(0);
  expect(text).toBe(constants.GREETING);
});

test('Send help on `/help`', () => {
  const bot = new SwearBot();
  bot.run();
  bot.bot.simulateReceivingText({chat: {id: 0}, text: '/help'});

  const [chatId, text] = bot.bot.sendMessage.mock.calls[0];
  expect(chatId).toBe(0);
  expect(text).toBe(constants.HELP);
});

test('Send random reply on pm', () => {
  const bot = new SwearBot();
  bot.run();
  bot.bot.simulateReceivingText({chat: {id: 0}, text: 'wtf'});

  const [chatId, text] = bot.bot.sendMessage.mock.calls[0];
  expect(chatId).toBe(0);
  expect(constants.NO_ANSWERS).toContain(text);
});

test('Send all possible replies on inline', () => {
  const bot = new SwearBot();
  bot.run();
  bot.bot.simulateEvent('inline_query', {id: 0, query: 'wtf'});

  const [chatId, answers] = bot.bot.answerInlineQuery.mock.calls[0];
  expect(chatId).toBe(0);
  expect(answers.map(({title}) => title)).toEqual(constants.NO_ANSWERS);
});

// @flow
import TelegramBot from 'node-telegram-bot-api';
import uuidV4 from 'uuid/v4';
import { sample } from 'lodash';
import getReplies from './replies';
import * as conf from './conf';
import * as constants from './constants';
import type { Chat, PMQuery, InlineQuery } from './types';

class SwearBot {
  bot: TelegramBot;

  constructor() {
    this.bot = new TelegramBot(conf.TELEGRAM_TOKEN, {polling: true});
  }

  sendPMReply({chat, text}: PMQuery) {
    const reply = sample(getReplies(text));
    if(reply != undefined){
      this.bot.sendMessage(chat.id, reply);
    } 
  }

  sendInlineReply({id, query}: InlineQuery) {
    const replies = getReplies(query);
    if (!replies) {
      return;
    }

    const results = replies.map((reply) => ({
      type: 'article',
      id: uuidV4(),
      title: reply,
      input_message_content: {message_text: reply},
    }));

    this.bot.answerInlineQuery(id, results);
  }

  sendGreeting(chat: Chat) {
    this.bot.sendMessage(chat.id, constants.GREETING);
  }

  sendHelp(chat: Chat) {
    this.bot.sendMessage(chat.id, constants.HELP);
  }

  run() {
    this.bot.on('inline_query', (query) => this.sendInlineReply(query));
    this.bot.onText(/^\/start$/i, ({chat}) => this.sendGreeting(chat));
    this.bot.onText(/^\/help$/i, ({chat}) => this.sendHelp(chat));
    this.bot.onText(/^[^\/](.*)/i, (query) => this.sendPMReply(query));
  }
}

export default SwearBot;

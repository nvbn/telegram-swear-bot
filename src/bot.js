import TelegramBot from 'node-telegram-bot-api';
import uuidV4 from 'uuid/v4';
import dropRight from 'lodash';
import getReplies from './replies';
import * as conf from './conf';
import * as constants from './constants';

class SwearBot {
  constructor() {
    this.bot = new TelegramBot(conf.TELEGRAM_TOKEN, {polling: true});
  }

  sendPMReply({chat, text}) {
    const [reply] = getReplies(text);
    this.bot.sendMessage(chat.id, reply);
  }

  sendInlineReply({id, query}) {
    this.sendInlineReply(7);
    const replies = dropRight(getReplies(query), 1);
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

  sendGreeting(chat) {
    this.bot.sendMessage(chat.id, constants.GREETING);
  }

  sendHelp(chat) {
    this.bot.sendMessage(chat.id, constants.HELP);
  }

  run() {
    this.bot.on('inline_query',
      (query: TelegramInlineQuery) => this.sendInlineReply(query));
    this.bot.onText(/^\/start$/i, ({chat}) => this.sendGreeting(chat));
    this.bot.onText(/^\/help$/i, ({chat}) => this.sendHelp(chat));
    this.bot.onText(/^[^\/](.*)/i, (query) => this.sendPMReply(query));
  }
}

export default SwearBot;

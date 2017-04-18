class TelegramBot {
  constructor() {
    this.textHandlers = [];
    this.answerInlineQuery = jest.fn();
    this.sendMessage = jest.fn();
    this.eventHandlers = {};
  }

  onText(regexp, handler) {
    this.textHandlers.push([regexp, handler]);
  }

  on(event, handler) {
    if (!this.eventHandlers[event]) {
      this.eventHandlers[event] = [];
    }

    this.eventHandlers[event].push(handler);
  }

  simulateReceivingText(query) {
    for (const [regexp, handler] of this.textHandlers) {
      if (query.text.match(regexp)) {
        handler(query, query.text.match(regexp).slice(1));
        return;
      }
    }
  }

  simulateEvent(event, query) {
    const handlers = this.eventHandlers[event];
    if (handlers) {
      for (const handler of handlers) {
        handler(query);
      }
    }
  }
}

export default TelegramBot;

// @flow
import Az from 'az';
import SwearBot from './bot';

const bot = new SwearBot();

Az.Morph.init(() => bot.run());

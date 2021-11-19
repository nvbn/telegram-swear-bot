// @flow
import Az from 'az';
import { last, uniq } from 'lodash';
import * as constants from './constants';

/**
 * Returns list words from text.
 */
const getWords = (text: string): string[] => Az
  .Tokens(text)
  .tokens
  .filter(({type}) => type === Az.Tokens.WORD)
  .map(({st, length}) => text.substr(st, length).toLowerCase());

/**
 * Checks text for trigger words and yields possible replies.
 */
const getByWordTrigger = function*(text: string): Iterable<string> {
  for (const word of getWords(text)) {
    for (const [regexp, answer] of constants.TRIGGERS) {
      if (word.match(regexp)) {
        yield answer;
      }
    }
  }
};

/**
 * Checks if text is a question and returns answer.
 */
const getAnswerToQuestion = (text: string): string[] => {
  if (text.trim().endsWith('?')) {
    return [constants.ANSWER_TO_QUESTION];
  }

  const questionWords = getWords(text)
    .map((word) => Az.Morph(word))
    .filter((morphs) => morphs.length && morphs[0].tag.Ques);

  if (questionWords.length) {
    return [constants.ANSWER_TO_QUESTION];
  } else {
    return [];
  }
};

/**
 * Returns all possible replies to text.
 */
export default (text: string): string[] => {
  const answers = uniq([
    ...getByWordTrigger(text),
    ...getAnswerToQuestion(text),
  ]);

  if (answers.length) {
    return answers;
  } 
}

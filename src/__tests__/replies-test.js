import Az from 'az';
import getReplies from '../replies';

beforeAll(() =>
  new Promise((resolve) =>
    Az.Morph.init(() => resolve())));

test('Should reply by trigger word', () => {
  const replies = getReplies('Хочу машину!');

  expect(replies).toContain('Хотеть не вредно!');
});

test('Should reply with answer to question', () => {
  const replies = getReplies('Что ты делаешь?');

  expect(replies).toContain('А тебя ебёт?');
});

test('Should reply with rhyme', () => {
  const replies = getReplies('Хочу ехать в Австрию!');

  expect(replies).toContain('хуявстрию');
});

test("Should reply with aggressive phrase if don't know how to reply", () => {
  const replies = getReplies('wtf');

  expect(replies).toContain('Чё?');
});

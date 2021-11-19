import Az from 'az';
import getReplies from '../replies';

beforeAll(() =>
  new Promise((resolve) =>
    Az.Morph.init(() => resolve())));

test('Should reply by trigger word', () => {
  const replies = getReplies('Хочу машину!');

  expect(replies).toContain('Не надо хотеть, надо делать!');
});

test('Should reply with answer to question', () => {
  const replies = getReplies('Что ты делаешь?');

  expect(replies).toContain('Решите вопрос!');
});

test('Should reply with rhyme', () => {
  const replies = getReplies('Хочу ехать в Австрию!');

  expect(replies).toContain('Не надо хотеть, надо делать!');
});
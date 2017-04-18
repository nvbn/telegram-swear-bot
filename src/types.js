// @flow
export type Chat = {
  id: number,
};

export type PMQuery = {
  chat: Chat,
  text: string,
};

export type InlineQuery = {
  id: number,
  query: string,
};

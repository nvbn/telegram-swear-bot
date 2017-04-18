FROM node:6
MAINTAINER Vladimir Iakovlev <nvbn.rm@gmail.com>

RUN adduser --disabled-password --gecos "" telegram-swear-bot
WORKDIR /home/telegram-swear-bot
USER telegram-swear-bot

COPY . /home/telegram-swear-bot/
USER root
RUN chown -R telegram-swear-bot /home/telegram-swear-bot/
USER telegram-swear-bot
RUN yarn

CMD yarn start

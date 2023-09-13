FROM node:16-alpine as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app

RUN yarn install

COPY . /usr/src/app

RUN yarn build:production

RUN pwd && ls


COPY . /usr/src/app


EXPOSE 3000
CMD ["yarn", "start"]

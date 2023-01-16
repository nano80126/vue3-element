FROM node:18-alpine

WORKDIR /home/node/app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .
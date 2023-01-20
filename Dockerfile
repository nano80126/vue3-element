FROM node:18-alpine

WORKDIR /home/node/app

COPY package*.json ./

RUN yarn install

# CMD [ "yarn", "install" ]

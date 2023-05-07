FROM node:18

WORKDIR /usr/src/app

ENV NODE_ENV=$NODE_ENV
ENV MONGODB_URI=$MONGODB_URI

COPY package*.json ./

RUN npm ci

COPY ./dist ./dist

EXPOSE 3333

CMD [ "npm", "run", "start:prod" ]

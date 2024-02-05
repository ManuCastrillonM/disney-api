FROM node:alpine

ENV PORT=8080

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

RUN npm install -g pm2

COPY --chown=node:node . .

EXPOSE ${PORT}

CMD [ "pm2-runtime", "npm", "--", "start" ]
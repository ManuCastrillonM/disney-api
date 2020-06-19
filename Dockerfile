FROM node:12.18.0-alpine3.12

COPY package*.json ./
RUN npm i

EXPOSE 80
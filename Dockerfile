FROM node:lts-stretch-slim

WORKDIR /app

COPY package.json . 

RUN npm install 

COPY . .

EXPOSE 3000
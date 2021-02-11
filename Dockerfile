FROM node:lts-stretch-slim

WORKDIR /app

COPY package.json . 

#RUN npm install -g npm@7.5.3

RUN npm install 
#--legacy-peer-deps

COPY . .

EXPOSE 3000

CMD npm run dev
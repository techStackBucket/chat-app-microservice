FROM node:14.15-alpine
WORKDIR /usr/src/app

COPY package*.json ./
COPY chat-logger*.tgz ./
RUN npm install

COPY . .

EXPOSE 4000
CMD node src/server.js
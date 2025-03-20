FROM node:8.12

WORKDIR /app

COPY package.json /app



ENV NODE_ENV=production

RUN npm install

COPY . /app

VOLUME ["/app/logs"]

CMD ["node", "/app/server.js"]

EXPOSE 9156
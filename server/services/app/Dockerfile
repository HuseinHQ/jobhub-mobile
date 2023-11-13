FROM node:18.7.0

WORKDIR /app

ENV PORT=4002

COPY package*.json .

RUN npm install && npm install -g nodemon

COPY . .

CMD npm start
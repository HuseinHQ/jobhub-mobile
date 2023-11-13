FROM node:18.7.0

WORKDIR /orchestrator

ENV PORT=4000

COPY package*.json .

RUN npm install && npm install -g nodemon

COPY . .

CMD npm start
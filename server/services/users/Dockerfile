FROM node:18.7.0

WORKDIR /users

ENV PORT=4001

COPY package*.json .

RUN npm install && npm install -g nodemon

COPY . .

CMD npm run dev
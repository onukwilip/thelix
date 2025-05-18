FROM node:18-slim

WORKDIR /app

COPY package.json ./

RUN npm install -f

COPY . .

RUN npx tsc --build

EXPOSE 6000

CMD npm start

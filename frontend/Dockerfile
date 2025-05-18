FROM node:18-slim

WORKDIR /app

COPY package.json ./

RUN npm install -f

COPY . .

RUN npx tsc --build

EXPOSE 3000

CMD npm start

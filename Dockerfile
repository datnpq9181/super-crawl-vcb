FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

COPY captcha-vcb ./captcha-vcb

EXPOSE 8080

CMD ["npm", "start"]
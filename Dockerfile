FROM node:alpine

RUN apk add --no-cache build-base python3

WORKDIR /social-app

COPY package.json /social-app

RUN npm install

COPY . .

EXPOSE 6000

CMD ["npm","run", "dev"]
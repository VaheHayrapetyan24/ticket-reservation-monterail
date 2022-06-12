FROM node:14.17.5-slim

WORKDIR /usr/src/app

COPY package.json ./

RUN npm i --no-audit --no-shrinkwrap

COPY . .

EXPOSE 4000:4000
CMD [ "npm", "run", "start" ]

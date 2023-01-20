FROM node:19

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD [ "npm", "run", "lint"]
CMD [ "npm", "run", "dev.host"]
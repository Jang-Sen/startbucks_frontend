FROM node:18-alpine

WORKDIR /usr/src/frontend

COPY --chown=node:node package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
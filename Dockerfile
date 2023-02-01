FROM node:16

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=4002

EXPOSE 4002

RUN npx prisma generate

CMD [ "npm", "run", "dev", "nodemon", "src/app.js" ]
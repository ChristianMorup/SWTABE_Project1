FROM node:latest

WORKDIR /app

COPY . ./
RUN ls -la /

RUN npm install

EXPOSE 3000

CMD ["node", "app.js"]
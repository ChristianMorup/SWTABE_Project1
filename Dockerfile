FROM node:latest

WORKDIR /

COPY . /
RUN ls -la /

RUN npm install

EXPOSE 3000

CMD ["node", "app.js"]
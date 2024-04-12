FROM node

WORKDIR /hw06-email

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "app"]


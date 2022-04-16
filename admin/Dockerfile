FROM node:alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .

WORKDIR /app/admin

COPY ./admin/package.json ./

WORKDIR /app

RUN yarn install --network-timeout 1000000

COPY ./admin/ ./admin/

EXPOSE 3000

CMD ["yarn", "admin"]

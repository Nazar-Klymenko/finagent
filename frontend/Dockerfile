FROM node:alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .

WORKDIR /app/frontend

COPY ./frontend/package.json ./

WORKDIR /app

RUN yarn install --network-timeout 1000000

COPY ./frontend/ ./frontend/

EXPOSE 3000

CMD ["yarn", "frontend"]

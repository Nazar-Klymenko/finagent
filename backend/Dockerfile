FROM node:alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .

WORKDIR /app/backend

COPY ./backend/package.json ./

WORKDIR /app

RUN yarn install --network-timeout 1000000

COPY ./backend/ ./backend/

EXPOSE 5000

CMD ["yarn", "backend"]


# FROM node:alpine

# WORKDIR /usr/src/app

# COPY package.json yarn.lock ./

# RUN yarn install 

# COPY ./ ./

# EXPOSE 5000

# CMD ["yarn", "dev"]


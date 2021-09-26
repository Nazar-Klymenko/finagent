FROM node:lts-buster-slim

WORKDIR /backend

COPY package.json .
COPY yarn.lock .

RUN yarn install --network-timeout 1000000

COPY . .

EXPOSE 5000

CMD [ "yarn", "dev" ]

# FROM node:alpine

# WORKDIR /usr/src/app

# COPY package.json yarn.lock ./

# RUN yarn install 

# COPY ./ ./

# EXPOSE 5000

# CMD ["yarn", "dev"]


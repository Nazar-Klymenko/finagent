FROM node:lts-buster-slim

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
COPY yarn.lock /usr/src/app/yarn.lock
RUN yarn install --frozen-lockfile

COPY . /usr/src/app

EXPOSE 5000

CMD [ "yarn", "dev" ]

# FROM node:alpine

# WORKDIR /usr/src/app

# COPY package.json yarn.lock ./

# RUN yarn install 

# COPY ./ ./

# EXPOSE 5000

# CMD ["yarn", "dev"]


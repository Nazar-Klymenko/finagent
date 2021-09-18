FROM node:lts-buster-slim

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app

RUN yarn install --frozen-lockfile


COPY ./  /usr/src/app
EXPOSE 3000
CMD ["yarn", "start"]



# Create image based on the official Node image from dockerhub

# Create app directory
# WORKDIR /usr/src/app

# Copy dependency definitions

# Install dependecies
#RUN npm set progress=false \
#    && npm config set depth 0 \
#    && npm i install
# RUN npm ci

# Get all the code needed to run the app
# COPY . /usr/src/app

# Expose the port the app runs in
# EXPOSE 3000
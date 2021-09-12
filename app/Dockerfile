FROM node:latest
WORKDIR /usr/app
COPY package.json ./
COPY yarn.lock ./
COPY ./ ./
RUN yarn
EXPOSE 3000
CMD ["yarn", "start"]

FROM node:latest
WORKDIR /usr/app
COPY package.json ./
COPY yarn.lock ./
COPY ./ ./
RUN yarn
EXPOSE 3001
CMD ["yarn", "start"]

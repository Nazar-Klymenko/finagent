FROM node:latest
WORKDIR /usr/app
COPY package.json ./
COPY yarn.lock ./
COPY ./ ./
RUN yarn
EXPOSE 5000
CMD ["yarn", "dev"]

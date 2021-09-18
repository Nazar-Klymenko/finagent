FROM node:alpine

RUN mkdir -p /usr/src/admin
WORKDIR /usr/src/admin
COPY package.json /usr/src/admin/package.json
RUN yarn install 
COPY ./  /usr/src/admin
EXPOSE 3001
CMD ["yarn", "start"]

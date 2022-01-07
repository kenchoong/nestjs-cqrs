FROM node:14.18.0-alpine as BUILDER

WORKDIR /var/www/backend

ADD . /var/www/backend/

RUN yarn

RUN yarn build


CMD [ "yarn", "start:prod"]
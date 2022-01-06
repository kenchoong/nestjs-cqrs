FROM node:lts as dependencies
WORKDIR /lavax
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /lavax
COPY . .
COPY --from=dependencies /lavax/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /lavax
ENV NODE_ENV developement
# If you are using a custom next.config.js file, uncomment this line.
# COPY --from=builder /lavax/next.config.js ./
COPY --from=builder /lavax/public ./public
COPY --from=builder /lavax/.next ./.next
COPY --from=builder lavax/node_modules ./node_modules
COPY --from=builder /lavax/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]
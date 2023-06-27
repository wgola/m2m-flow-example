FROM node:18-alpine AS builder
COPY . . 
RUN yarn install
RUN yarn build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder package.json /app/
COPY --from=builder dist/ /app/dist/
RUN yarn install --production=true
ENTRYPOINT [ "yarn", "start" ]
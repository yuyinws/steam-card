FROM node:18-alpine as build-stage

COPY ./ /app
WORKDIR /app

RUN npm install pnpm -g && pnpm install && pnpm run build

CMD node .output/server/index.mjs

EXPOSE 3000

FROM node:22-alpine AS node-base

WORKDIR /app
RUN corepack enable pnpm

FROM node-base AS dependencies

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile 

FROM node-base AS build

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

FROM rtsp/lighttpd AS production

COPY --from=build /app/dist /var/www/html
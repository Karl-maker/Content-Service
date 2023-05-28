FROM node:19-alpine AS dependencies
EXPOSE 5000
WORKDIR /app
COPY package*.json ./
RUN apk add --no-cache --virtual .gyp \
    python3 \
    make \
    g++ \
    && npm ci \
    && apk del .gyp

FROM node:19-alpine AS dev
WORKDIR /app
ENV NODE_ENV = development
COPY --from=dependencies /app/node_modules ./node_modules
COPY .env ./
COPY tsconfig.json ./
COPY . .
CMD ["npm", "run", "dev"]

FROM node:19-alpine AS production
WORKDIR /app
ENV NODE_ENV = production
COPY --from=dependencies /app/node_modules ./node_modules
COPY .env ./
COPY tsconfig.json ./
COPY . .
RUN npm install -g pino-pretty
RUN npm run build
CMD ["npm", "run", "start"]

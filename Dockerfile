FROM node:19-alpine3.15

WORKDIR /app

COPY . .

RUN npm ci --omit=dev

ENTRYPOINT npm start

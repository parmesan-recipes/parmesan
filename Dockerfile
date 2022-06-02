FROM node:16 as base

WORKDIR /usr/src/app/backend

COPY backend/package*.json ./

FROM base as test
RUN npm ci
COPY . .
RUN npm run lint
RUN npm run test

FROM base as prod
RUN npm ci --production
COPY . .
CMD [ "node", "main.js" ]
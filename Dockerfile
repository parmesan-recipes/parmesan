FROM node:16 as base

WORKDIR /usr/src/app/backend

COPY backend/package*.json ./

FROM base as prod
RUN npm install --production
COPY . .
CMD [ "node", "main.js" ]
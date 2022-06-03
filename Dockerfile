FROM node:16 as base

WORKDIR /usr/src/app/frontend

COPY frontend/package*.json ./

FROM base as prodfront
RUN npm install --production
COPY ./frontend .
RUN npm run build

WORKDIR /usr/src/app/backend

COPY backend/package*.json ./

FROM base as prodback
RUN npm install --production
COPY ./backend .
CMD [ "node", "main.js" ]
FROM node:16 as base

WORKDIR /usr/src/app/frontend

COPY frontend/package*.json ./

FROM base as prod
RUN npm install --production
COPY ./frontend .
RUN npm run build

FROM node:19-alpine as base

WORKDIR /usr/src/app/frontend

COPY frontend/package*.json ./
RUN npm install --omit=dev
COPY ./frontend .
RUN npm run build

FROM golang:1.20-alpine as builder
RUN apk update && apk add --no-cache git
ADD . /usr/src/app/frontend/

WORKDIR /usr/src/app/backend
COPY ./backend .
RUN go get -d -v
RUN go build -o parmesan .

FROM alpine
RUN adduser -S -D -H -h /app appuser
USER appuser
COPY --from=builder /usr/src/app/backend/ /app/
WORKDIR /app

EXPOSE 8080

CMD ["./parmesan"]

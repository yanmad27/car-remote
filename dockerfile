FROM nginx:alpine

WORKDIR /app

COPY ./src .

COPY ./nginx.conf /etc/nginx/nginx.conf
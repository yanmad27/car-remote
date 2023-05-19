FROM node:16
WORKDIR /app
COPY . .
run npm install -g serve
EXPOSE 3000

CMD ["serve", "-l", "3000", "-s", "build"]
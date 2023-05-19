# Build BASE
FROM node:18.16.0
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build
EXPOSE 3000
CMD ["node", "server.js"]

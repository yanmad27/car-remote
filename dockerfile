# Build BASE
FROM node:16
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
RUN npm run build
EXPOSE 3000
CMD ["node", "server.js"]

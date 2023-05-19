# Build BASE
FROM node:18.16.0
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
RUN npm run build
EXPOSE 3000
CMD ["node", "server.js"]

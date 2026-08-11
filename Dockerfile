FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist/hair-app-fe ./dist/hair-app-fe
COPY server.js .
EXPOSE 8080
CMD ["node", "server.js"]

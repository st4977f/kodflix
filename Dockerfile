# 1. Build frontend
FROM node:20 AS frontend-build
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY public ./public
COPY src ./src
RUN npm install
RUN npm run build

# 2. Build backend
FROM node:20 AS backend-build
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
RUN npm install
# Copy frontend build from previous stage
COPY --from=frontend-build /app/build ./build

# 3. Run backend
EXPOSE 3001
CMD ["npx", "tsx", "src/backend/app.ts"]
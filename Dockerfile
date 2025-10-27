FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# COPY .env ./
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/main.js"]

# # Multi-stage build approach
# FROM node:22-alpine AS builder
# # Install ALL dependencies (including dev) for build
# WORKDIR /app
# COPY package*.json ./
# RUN npm install  # ← Installs everything including dev dependencies
# COPY . .
# RUN npm run build  # ← Now nest CLI is available
#
# # Production stage
# FROM node:22-alpine AS production
# WORKDIR /app
# COPY --from=builder /app/dist ./dist
# COPY package*.json ./
# RUN npm ci --omit=dev --ignore-scripts # ← Re-install production only
# EXPOSE 3000
# CMD ["node", "dist/main.js"]

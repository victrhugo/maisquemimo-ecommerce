# Multi-stage build para Next.js
FROM node:20-alpine AS deps

WORKDIR /app

# Copiar package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# ============================================================
# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar dependências do stage anterior
COPY --from=deps /app/node_modules ./node_modules

# Copiar source
COPY . .

# Build
RUN npm run build

# ============================================================
# Runtime stage
FROM node:20-alpine

WORKDIR /app

# Install production dependencies only
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Copiar build output
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY next.config.ts ./

# Expor porta
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

# Rodar aplicação
CMD ["npm", "start"]

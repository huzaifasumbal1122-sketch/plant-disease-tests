# --- STAGE 1: Dependency Management ---
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# --- STAGE 2: Building the App ---
FROM node:18-alpine AS builder
WORKDIR /app

# Copy modules and source
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Receive Build Arguments from Jenkins
ARG MONGODB_URI
ARG NEXTAUTH_URL
ARG NEXTAUTH_SECRET

# Set as Environment Variables for the 'npm run build' process
ENV MONGODB_URI=$MONGODB_URI
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# --- STAGE 3: Final Production Image ---
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Security: Run as a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only compiled assets
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["npm", "start"]

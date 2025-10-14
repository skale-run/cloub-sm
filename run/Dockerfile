# syntax=docker/dockerfile:1.7

# ---------- Base ----------
FROM node:20-alpine AS base
WORKDIR /app
ENV NODE_ENV=production
# Faster native deps
RUN apk add --no-cache libc6-compat

# ---------- Dependencies for BUILD (needs devDeps) ----------
FROM base AS deps-build
ENV NODE_ENV=development
COPY package*.json ./
# Use cache for npm and make it resilient if no lockfile
RUN --mount=type=cache,target=/root/.npm \
	(npm ci || npm install)

# ---------- Build ----------
FROM base AS build
ENV NODE_ENV=development
WORKDIR /app
COPY --from=deps-build /app/node_modules ./node_modules
COPY . .
# Try to build if a build script exists; otherwise skip
RUN node -e "try{p=require('./package.json');process.exit(p.scripts?.build?0:1)}catch{process.exit(1)}" \
	&& npm run build \
	|| echo 'Skipping build: no "build" script found.'

# ---------- Dependencies for RUNTIME (prod only) ----------
FROM base AS deps-prod
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
	(npm ci --omit=dev || npm install --omit=dev)

# ---------- RUNTIME ----------
FROM base AS runtime
WORKDIR /app
ENV NODE_ENV=production
# Copy runtime deps only
COPY --from=deps-prod /app/node_modules ./node_modules
# Copy app source and (if present) build artifacts
COPY --from=build /app ./
# Ensure node user can read everything (prevents EACCES on assets)
RUN chown -R node:node /app
USER node

EXPOSE 8080
# Optional health endpoint. Override with HEALTHCHECK env if needed.
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
	CMD node -e "fetch('http://127.0.0.1:8080/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

# Default entry
CMD ["node", "server.js"]
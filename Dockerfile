# Stage 1: Building the code
FROM node:23-alpine AS builder

WORKDIR /fabio-tommasi-agro

RUN apk add --no-cache yarn

# Install dependencies for building
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source and build
COPY . .
RUN yarn build

# Stage 2: Run the built code
FROM node:23-alpine AS runner
WORKDIR /fabio-tommasi-agro

# Set to production
ENV NODE_ENV=production

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /fabio-tommasi-agro/public ./public
COPY --from=builder /fabio-tommasi-agro/package.json ./package.json
COPY --from=builder /fabio-tommasi-agro/yarn.lock ./yarn.lock

# Copy built assets
COPY --from=builder --chown=nextjs:nodejs /fabio-tommasi-agro/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /fabio-tommasi-agro/.next/static ./.next/static

# Set user
USER nextjs

# Expose and run - Puerto 3079 en producción
EXPOSE 3097
ENV PORT 3097

CMD ["node", "server.js"]

# Use Node.js as the base image for the build stage
FROM node:bookworm-slim AS builder

# Set working directory inside the container
WORKDIR /usr/src/app

# Install openssl (Debian-based image uses apt-get)
RUN apt-get update && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy Prisma schema and generate the client
COPY prisma ./prisma
RUN npx prisma generate

# Copy the rest of the project and build it
COPY . .
RUN npm run build

# Use a lightweight Node.js runtime for the final stage
FROM node:bookworm-slim AS runner

# Set working directory
WORKDIR /usr/src/app

# Install openssl (Debian-based image uses apt-get)
RUN apt-get update && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*

# Copy necessary files from the builder stage
COPY --from=builder /usr/src/app/package.json /usr/src/app/package-lock.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/prisma ./prisma

# Expose Next.js default port
EXPOSE 3000

# Apply Prisma migrations before starting the app
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
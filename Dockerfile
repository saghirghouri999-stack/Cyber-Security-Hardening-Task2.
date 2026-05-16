# Use a lightweight and secure base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --only=production

# Copy application code
COPY . .

# Security best practice: Run as non-root user
USER node

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "app.js"]
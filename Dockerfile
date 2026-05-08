# Use Node 20 to satisfy selenium-webdriver requirements
FROM node:20-alpine

# Install dependencies for Chrome/Selenium if needed
RUN apk add --no-cache chromium chromium-chromedriver bash

WORKDIR /app

COPY package.json package-lock.json* ./

# Use 'npm install' instead of 'npm ci' to resolve the lockfile sync issues
RUN npm install

COPY . .

# Run tests
CMD ["node", "test.js"]

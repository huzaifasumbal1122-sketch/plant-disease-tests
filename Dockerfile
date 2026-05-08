FROM node:20-alpine
WORKDIR /app

# Install browser and driver
RUN apk add --no-cache chromium chromium-chromedriver bash

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

# Run via mocha instead of node
CMD ["./node_modules/.bin/mocha", "app.test.js", "--timeout", "30000"]

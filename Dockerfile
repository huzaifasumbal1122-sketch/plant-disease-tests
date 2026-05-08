FROM node:20-alpine
WORKDIR /app

# Install browser and driver
RUN apk add --no-cache chromium chromium-chromedriver bash

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

# Match the exact filename you found
CMD ["node", "app.test.js"]

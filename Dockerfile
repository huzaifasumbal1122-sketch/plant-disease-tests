FROM node:20-alpine
WORKDIR /app

# Install browser and driver
RUN apk add --no-cache chromium chromium-chromedriver bash

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

# Ensure the files are actually there (helps debugging if it fails again)
RUN ls -la

# Use npx to run mocha - it handles the pathing for you
# The --exit flag ensures the container stops once tests are done
CMD ["npx", "mocha", "app.test.js", "--timeout", "30000", "--exit"]

FROM node:20-alpine
WORKDIR /app

# Install chromium and bash
RUN apk add --no-cache chromium chromium-chromedriver bash

# Copy dependency files
COPY package.json package-lock.json* ./

# Install ALL dependencies (including devDependencies like mocha)
RUN npm install --include=dev

# Copy the rest of the code
COPY . .

# Ensure the app.test.js exists and mocha is executable
RUN chmod +x ./node_modules/.bin/mocha

# Use the direct path to mocha to avoid any 'command not found' silent errors
ENTRYPOINT ["./node_modules/.bin/mocha"]
CMD ["app.test.js", "--timeout", "30000", "--exit"]

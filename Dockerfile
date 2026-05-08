FROM node:18-slim

# Install Chrome for headless Selenium testing
RUN apt-get update && apt-get install -y \
    wget gnupg unzip curl \
    google-chrome-stable \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your JS test files
COPY . .

# Run your tests using Mocha
CMD ["npx", "mocha", "*.js", "--timeout", "30000"]

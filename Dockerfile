FROM node:18-slim

# Install Chrome for Selenium
RUN apt-get update && apt-get install -y \
    wget gnupg unzip curl \
    google-chrome-stable \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy your package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy your test scripts
COPY . .

# Run Mocha tests (ensure 'test' script in package.json is "mocha your_test_file.js")
CMD ["npm", "test"]

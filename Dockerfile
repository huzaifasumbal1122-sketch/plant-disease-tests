FROM node:18-slim

# Install Chrome for Selenium
RUN apt-get update && apt-get install -y \
    wget gnupg unzip curl \
    google-chrome-stable \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Run the mocha tests
CMD ["npx", "mocha", "*.js", "--timeout", "30000"]

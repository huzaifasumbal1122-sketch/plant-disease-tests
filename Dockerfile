FROM node:20-alpine
WORKDIR /app

RUN apk add --no-cache chromium chromium-chromedriver bash

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

# Entrypoint is the base command
ENTRYPOINT ["./node_modules/.bin/mocha"]
# CMD is the default argument passed to the entrypoint
CMD ["app.test.js", "--timeout", "30000", "--exit"]

FROM python:3.9-slim

WORKDIR /app

# Copy your test files
COPY . .

# Install dependencies (requests is usually needed to test APIs)
RUN pip install --no-cache-dir pytest requests

# Command to run your python tests
CMD ["pytest", "test_app.py"]

FROM python:3.9-slim

WORKDIR /app

# Copy test scripts and requirements
COPY . .

# Install necessary libraries for testing (e.g., requests, pytest)
RUN pip install --no-cache-dir requests pytest

# Run your main test file (change 'test_script.py' to your actual file name)
CMD ["pytest", "test_script.py"]

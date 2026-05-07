FROM python:3.9-slim

WORKDIR /app

# Copy everything from your test repo
COPY . .

# Install dependencies for your python scripts
RUN pip install --no-cache-dir requests pytest

# This command runs your python test (change 'test_script.py' to your actual file)
CMD ["pytest", "test_script.py"]

# Stage 1: Build the frontend React app
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve using FastAPI
FROM python:3.12-slim
WORKDIR /app

# Install system dependencies for psycopg2-binary
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install python dependencies
RUN pip install --no-cache-dir fastapi uvicorn pydantic google-genai google-auth google-cloud-bigquery python-multipart psycopg2-binary fastapi-staticfiles

# Copy backend source code
COPY backend/ ./backend
# Copy built static files from frontend stage
COPY --from=frontend-builder /app/dist ./dist

# Expose port 8080 (standard for Cloud Run)
EXPOSE 8080

# Run FastAPI backend
ENV PYTHONPATH=/app/backend
CMD ["python", "backend/main.py"]

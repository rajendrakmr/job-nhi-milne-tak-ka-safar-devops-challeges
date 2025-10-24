# Base image
FROM python:3.9

# Set working directory
WORKDIR /app/backend

# Copy dependency file
COPY requirements.txt .

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        gcc \
        default-libmysqlclient-dev \
        pkg-config && \
    rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Expose the application port
EXPOSE 8000
 
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

#RUN python manage.py migrate
#RUN python manage.py makemigrations

# Multi-stage Dockerfile for Times Card application

# Stage 1: PHP application
FROM php:8.3-fpm-alpine as php-base

# Install system dependencies
RUN apk add --no-cache \
    curl \
    git \
    build-base \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    zip \
    unzip \
    mysql-client \
    imagemagick \
    imagemagick-dev \
    libgomp

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install -j$(nproc) \
    pdo \
    pdo_mysql \
    gd \
    exif \
    bcmath \
    intl \
    zip \
    curl \
    mbstring \
    tokenizer \
    xml

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Copy application files
COPY . .

# Install PHP dependencies
RUN composer install --optimize-autoloader --no-dev --no-interaction

# Set permissions
RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache

# Expose port
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]

# Stage 2: Node.js for asset building
FROM node:20-alpine as build-assets

WORKDIR /app

COPY package*.json ./

# Install dependencies with fallback to npm install if ci fails
RUN npm ci --prefer-offline --no-audit 2>/dev/null || npm install

COPY . .

# Build production assets
RUN npm run build

# Stage 3: Production image
FROM php:8.3-fpm-alpine

# Install system dependencies (minimal for production)
RUN apk add --no-cache \
    curl \
    mysql-client \
    imagemagick

# Install build dependencies for PHP extensions
RUN apk add --no-cache \
    build-base \
    autoconf \
    libzip-dev \
    libpng-dev

# Install PHP extensions
RUN docker-php-ext-install -j$(nproc) \
    pdo \
    pdo_mysql \
    gd \
    exif \
    bcmath \
    intl \
    zip \
    curl \
    mbstring \
    tokenizer \
    xml

# Clean up build dependencies
RUN apk del build-base autoconf libzip-dev libpng-dev

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copy application from stage 1
COPY --from=php-base /app /app

# Copy built assets from stage 2
COPY --from=build-assets /app/public/build /app/public/build

# Set permissions
RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache

# Create entrypoint script
RUN echo '#!/bin/sh\n\
php artisan migrate --force\n\
php artisan config:cache\n\
php artisan route:cache\n\
php artisan view:cache\n\
exec php-fpm' > /usr/local/bin/docker-entrypoint.sh && \
chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 9000

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

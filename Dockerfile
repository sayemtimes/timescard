FROM php:8.2-fpm-alpine

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apk update && apk add --no-cache \
    curl \
    git \
    build-base \
    autoconf \
    libpng-dev \
    libzip-dev \
    libicu-dev \
    zip \
    unzip \
    mysql-client \
    imagemagick-dev \
    icu-dev \
    oniguruma-dev

# Install PHP extensions
RUN docker-php-ext-install \
    pdo \
    pdo_mysql \
    zip \
    intl \
    gd

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy application files
COPY . /app

# Set permissions
RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache

# Expose port
EXPOSE 9000

CMD ["php-fpm"]

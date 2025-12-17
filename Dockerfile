# ===============================
# Stage 1: Laravel Mix Build
# ===============================
FROM node:18-alpine AS frontend

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY resources resources
COPY webpack.mix.js .
RUN npm run prod


# ===============================
# Stage 2: PHP Runtime
# ===============================
FROM php:8.2-fpm-alpine

WORKDIR /app

RUN apk add --no-cache \
    curl \
    git \
    libpng-dev \
    libzip-dev \
    libicu-dev \
    oniguruma-dev \
    zip \
    unzip \
    mysql-client \
    icu-dev

RUN docker-php-ext-install \
    pdo_mysql \
    zip \
    intl \
    gd

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY . /app
COPY --from=frontend /app/public /app/public

RUN composer install --no-dev --optimize-autoloader \
 && php artisan config:clear \
 && php artisan config:cache \
 && php artisan route:cache \
 && php artisan view:cache

RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache

EXPOSE 9000
CMD ["php-fpm"]

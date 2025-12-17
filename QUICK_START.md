# Quick Start Guide

## For Local Development (Windows Laragon)

```bash
# 1. Ensure Laragon is running (Apache + MySQL)
# Start → Laragon Tray Icon → Click "Start"

# 2. Install PHP dependencies
composer install

# 3. Install Node dependencies
npm install

# 4. Create and configure environment
cp .env.example .env
php artisan key:generate

# 5. Run database migrations
php artisan migrate:fresh --seed

# 6. Start Vite dev server
npm run dev

# 7. Access application
# Browser: http://timescard.test
```

---

## For Docker Deployment (Production)

### Step 1: Prepare Environment
```bash
# Copy production environment file
cp .env.production .env

# Edit with your values
# Update APP_KEY, DB_PASSWORD, REDIS_PASSWORD, MAIL credentials
nano .env
```

### Step 2: Build Docker Images
```bash
docker-compose build
```

### Step 3: Start Containers
```bash
docker-compose up -d
```

### Step 4: Run Setup Commands
```bash
docker-compose exec app php artisan migrate --force
docker-compose exec app php artisan key:generate
docker-compose exec app php artisan config:cache
docker-compose exec app php artisan route:cache
```

### Step 5: Access Application
```
https://timescard.cloud
```

---

## Key Commands

### Development
```bash
# View logs
npm run dev

# Build for production
npm run build

# Format code
npm run format

# Lint code
npm run lint

# Type check
npm run types
```

### Artisan
```bash
# Create migrations
php artisan make:migration <name>

# Create models
php artisan make:model <name>

# Create controllers
php artisan make:controller <name>

# Run tests
php artisan test
```

### Docker
```bash
# View logs
docker-compose logs -f app

# Run commands in container
docker-compose exec app <command>

# Stop all services
docker-compose down

# Remove volumes (careful!)
docker-compose down -v
```

---

## Environment Files

- `.env` - Development (local machine)
- `.env.production` - Production configuration template
- `.env.docker` - Docker secrets template

---

## Services

- **Frontend**: React 19 with Inertia.js
- **Backend**: Laravel 12
- **Database**: MySQL 8.0
- **Cache**: Redis 7
- **Queue**: Redis-based
- **Web Server**: Nginx (production), Apache (development)

---

## Support

For issues or questions:
1. Check `PRODUCTION_ANALYSIS.md`
2. Check `DOCKER_DEPLOYMENT_GUIDE.md`
3. Review logs: `docker-compose logs app`
4. Check Laravel documentation: https://laravel.com

# Deployment Guide for Timescard on VPS with Docker

## Overview
This guide explains how to deploy the Times Card application to a production VPS using Docker Compose.

## Prerequisites
- Docker installed (v20.10+)
- Docker Compose installed (v2.0+)
- Git installed
- Domain name (timescard.cloud) configured in DNS

## Quick Start

### Step 1: Clone Repository
```bash
git clone https://github.com/sayemtimes/timescard.git
cd timescard
```

### Step 2: Configure Environment Variables
The application is pre-configured with environment variables in `docker.env` file. Before deployment, you **MUST** update:

```bash
cp docker.env .env.production  # Create your production env file

# Edit with your actual values:
nano .env.production  # or vim, vi, etc.
```

**Critical Variables to Update:**
```env
# Email Configuration (REQUIRED)
MAIL_HOST=smtp.gmail.com              # Change to your mail provider
MAIL_USERNAME=your-email@gmail.com    # Your email address
MAIL_PASSWORD=your-app-password       # Gmail app-specific password

# Database (Already set, but verify)
DB_PASSWORD=T1m3sC@rd_Pr0d_P@ss123!xYz

# Redis
REDIS_PASSWORD=R3d1s_Pr0d_P@ss456!aBc

# Domain
APP_URL=https://timescard.cloud       # Your actual domain
ASSET_URL=https://timescard.cloud
MAIL_FROM_ADDRESS=noreply@timescard.cloud
```

**Optional Variables:**
```env
AWS_* (if using S3 for file uploads)
GOOGLE_CALENDAR_API_KEY (for calendar integration)
OPENAI_API_KEY (for AI features)
PUSHER_* (for real-time features)
```

### Step 3: SSL Certificate Setup
Before starting containers, place your SSL certificates:

```bash
mkdir -p docker/ssl
# Copy your certificate files:
cp /path/to/your/certificate.crt docker/ssl/timescard.crt
cp /path/to/your/private.key docker/ssl/timescard.key
```

**For Let's Encrypt (Recommended):**
```bash
# Using Certbot:
certbot certonly --standalone -d timescard.cloud
# Then copy from /etc/letsencrypt/live/timescard.cloud/
```

### Step 4: Start Application
```bash
# Load environment from docker.env
docker-compose up -d --build

# Verify services are running
docker-compose ps
```

**Expected Output:**
```
NAME                  COMMAND                  SERVICE   STATUS
timescard-nginx       "nginx -g daemon off"    nginx     running
timescard-app         "docker-php-entrypoint"  app       running
timescard-mysql       "docker-entrypoint.sh"   mysql     running
timescard-redis       "redis-server"           redis     running
timescard-queue       "php artisan queue..."   queue     running
timescard-backup      "bash -c 'while true'"   backup    running
```

### Step 5: Database Initialization
```bash
# Run database migrations
docker-compose exec app php artisan migrate --force

# Seed optional data (users, permissions, etc.)
docker-compose exec app php artisan db:seed

# Clear application cache
docker-compose exec app php artisan cache:clear
docker-compose exec app php artisan config:cache
docker-compose exec app php artisan route:cache
```

### Step 6: Verify Deployment
```bash
# Check application logs
docker-compose logs -f app

# Test health endpoint
curl -k https://localhost/health
```

## Service Details

### Services Running

| Service | Port | Purpose |
|---------|------|---------|
| **nginx** | 80, 443 | Web server with HTTPS |
| **app** | - | PHP Laravel application |
| **mysql** | 3306 | Database (internal only) |
| **redis** | 6379 | Cache & session store |
| **queue** | - | Async job worker |
| **backup** | - | Automatic DB backups |

### Database Backups
Automatic backups run daily:
- Location: `backup-data` volume
- Retention: 7 days
- Access: `docker-compose exec backup ls /backups`

## Common Commands

```bash
# View logs
docker-compose logs -f app
docker-compose logs -f mysql
docker-compose logs -f redis

# Access Laravel CLI
docker-compose exec app php artisan tinker

# Create admin user
docker-compose exec app php artisan user:create --admin

# Restart specific service
docker-compose restart app

# Stop all services
docker-compose down

# Stop and remove all data (WARNING)
docker-compose down -v
```

## Troubleshooting

### npm ci failed
If build fails with "npm ci exit code 1":
- Clear Docker build cache: `docker-compose build --no-cache`
- The Dockerfile now falls back to `npm install` automatically

### Database connection errors
```bash
# Verify MySQL is running
docker-compose exec mysql mysqladmin ping

# Check database was created
docker-compose exec mysql mysql -uroot -p${DB_PASSWORD} -e "SHOW DATABASES;"
```

### Mail not sending
- Verify MAIL_USERNAME and MAIL_PASSWORD in your .env.production
- For Gmail: Enable "App Passwords" in Google Account
- Check app logs: `docker-compose logs app | grep mail`

### Redis connection errors
```bash
# Test Redis connection
docker-compose exec redis redis-cli ping
# Expected output: PONG
```

## Security Best Practices

1. **Environment Variables**: Never commit `.env.production` - already in `.gitignore`
2. **SSL Certificates**: Ensure valid HTTPS certificate installed
3. **Database**: Change default passwords (already done: `T1m3sC@rd_Pr0d_P@ss123!xYz`)
4. **Redis Password**: Set strong password (already done: `R3d1s_Pr0d_P@ss456!aBc`)
5. **Firewall**: Only expose ports 80/443, keep 3306/6379 internal
6. **Backups**: Verify automatic backups are working
7. **Logs**: Monitor application logs for errors

## Scaling & Performance

### Increase Queue Workers
Edit `docker-compose.yml` and add more queue services:
```yaml
queue2:
  extends: queue
  container_name: timescard-queue-2
queue3:
  extends: queue
  container_name: timescard-queue-3
```

### PHP Tuning
Modify `docker/php/php.ini` for production:
- `memory_limit = 512M`
- `max_execution_time = 300`
- `upload_max_filesize = 100M`
- `post_max_size = 100M`

### Database Optimization
Modify `docker/mysql/my.cnf`:
- `max_connections = 1000`
- `innodb_buffer_pool_size = 4G` (for 16GB RAM servers)

## Monitoring

### Health Checks
All services have health checks configured. View status:
```bash
docker-compose ps  # Shows health status

# Check specific service
docker-compose exec app curl http://localhost:9000/health
```

### Resource Usage
```bash
docker stats

# For specific container
docker stats timescard-app
```

## Support & Issues

- GitHub Issues: https://github.com/sayemtimes/timescard/issues
- Documentation: See [START_HERE.md](START_HERE.md)
- Email: support@timescard.cloud

## Environment Variable Reference

Complete list of available environment variables in `.env.example`

Last Updated: 2025-01-17

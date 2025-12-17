# Docker Deployment Guide - Times Card Application

This guide provides step-by-step instructions to deploy the Times Card application using Docker to a VPS hosting at `timescard.cloud`.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Local Testing](#local-testing)
3. [VPS Setup](#vps-setup)
4. [SSL Certificate Setup](#ssl-certificate-setup)
5. [Deployment Process](#deployment-process)
6. [Post-Deployment](#post-deployment)
7. [Maintenance](#maintenance)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Local Machine
- Docker Desktop installed
- Docker Compose installed
- Git installed
- A domain name: `timescard.cloud`

### VPS Requirements
- Ubuntu 20.04 LTS or newer
- Minimum 4GB RAM
- Minimum 2 CPU cores
- Minimum 50GB storage
- SSH access
- Supported providers: DigitalOcean, Linode, AWS, Vultr, etc.

---

## Local Testing

### Step 1: Build Docker Images Locally

```bash
# Navigate to project directory
cd D:\laragon\www\timescard

# Build the Docker images
docker-compose build

# Start all services
docker-compose up -d

# Verify all services are running
docker-compose ps

# Check logs
docker-compose logs -f app
```

### Step 2: Run Initial Setup

```bash
# Generate APP_KEY (if not already set)
docker-compose exec app php artisan key:generate

# Run migrations
docker-compose exec app php artisan migrate

# Clear caches
docker-compose exec app php artisan config:cache
docker-compose exec app php artisan route:cache
docker-compose exec app php artisan view:cache
```

### Step 3: Test the Application

- Open browser: `http://localhost`
- Should see your application running
- Test all critical features

### Step 4: Verify Services

```bash
# Check MySQL
docker-compose exec mysql mysql -u root -p$DB_PASSWORD -e "SHOW DATABASES;"

# Check Redis
docker-compose exec redis redis-cli -a $REDIS_PASSWORD PING

# Check app health
docker-compose exec app php artisan tinker
```

---

## VPS Setup

### Step 1: SSH into VPS

```bash
ssh root@your_vps_ip_address
```

### Step 2: Install Docker and Docker Compose

```bash
# Update system
apt-get update && apt-get upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version

# Add current user to docker group
usermod -aG docker ${USER}
su - ${USER}
```

### Step 3: Set Up Application Directory

```bash
# Create directory
mkdir -p /var/www/timescard
cd /var/www/timescard

# Clone or copy your application
# Option A: Clone from Git
git clone https://github.com/yourusername/timescard.git .

# Option B: Upload files using SCP or SFTP
scp -r ./timescard root@your_vps_ip:/var/www/timescard

# Set correct permissions
chown -R www-data:www-data /var/www/timescard
chmod -R 755 /var/www/timescard
chmod -R 777 /var/www/timescard/storage /var/www/timescard/bootstrap/cache
```

### Step 4: Configure Environment Variables

```bash
cd /var/www/timescard

# Copy example and edit
cp .env.docker .env.production

# Edit with strong passwords
nano .env.production

# Generate APP_KEY
docker run --rm \
  -v $(pwd):/app \
  -w /app \
  php:8.3-cli \
  php -r "require 'vendor/autoload.php'; echo 'base64:' . base64_encode(random_bytes(32)) . '\n';"

# Copy to .env.production APP_KEY field
```

### Step 5: Create SSL Certificates

```bash
# Create directory for SSL
mkdir -p /etc/nginx/ssl

# Option A: Let's Encrypt (Recommended)
# Install Certbot
apt-get install -y certbot python3-certbot-nginx

# Generate certificate
certbot certonly --standalone -d timescard.cloud -d www.timescard.cloud

# Copy certificates to Docker volume
cp /etc/letsencrypt/live/timescard.cloud/fullchain.pem /etc/nginx/ssl/timescard.cloud.crt
cp /etc/letsencrypt/live/timescard.cloud/privkey.pem /etc/nginx/ssl/timescard.cloud.key

# Make Nginx group readable
chmod 640 /etc/nginx/ssl/*
chgrp www-data /etc/nginx/ssl/*

# Option B: Self-signed certificate (for testing only)
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/nginx/ssl/timescard.cloud.key \
  -out /etc/nginx/ssl/timescard.cloud.crt
```

### Step 6: Set Up DNS

Update your domain registrar's DNS records:

```
Type  Name           Value
A     timescard.cloud  your.vps.ip.address
A     www            your.vps.ip.address
CNAME www            timescard.cloud
```

---

## SSL Certificate Setup

### Automatic Renewal with Let's Encrypt

```bash
# Create renewal script
cat > /usr/local/bin/renew-ssl.sh << 'EOF'
#!/bin/bash
certbot renew --quiet
docker-compose -f /var/www/timescard/docker-compose.yml exec -T nginx nginx -s reload
EOF

chmod +x /usr/local/bin/renew-ssl.sh

# Add to crontab for automatic renewal
crontab -e

# Add this line:
0 2 * * * /usr/local/bin/renew-ssl.sh
```

---

## Deployment Process

### Step 1: Build and Push Images (Optional with Registry)

If using Docker Registry (Docker Hub, ECR, etc.):

```bash
# Login to registry
docker login

# Tag images
docker tag timescard-app:latest yourusername/timescard-app:latest

# Push
docker push yourusername/timescard-app:latest
```

### Step 2: Start Services on VPS

```bash
cd /var/www/timescard

# Pull latest code
git pull origin main

# Build images
docker-compose build

# Start all services
docker-compose up -d

# Check status
docker-compose ps
```

### Step 3: Run Migrations

```bash
docker-compose exec -T app php artisan migrate --force
```

### Step 4: Seed Database (if needed)

```bash
docker-compose exec -T app php artisan db:seed
```

### Step 5: Clear Caches

```bash
docker-compose exec -T app php artisan config:cache
docker-compose exec -T app php artisan route:cache
docker-compose exec -T app php artisan view:cache
docker-compose exec -T app php artisan optimize:clear
```

### Step 6: Verify Deployment

```bash
# Check all services
docker-compose ps

# Check application logs
docker-compose logs -f app

# Test endpoint
curl -I https://timescard.cloud
```

---

## Post-Deployment

### Step 1: Set Up Automatic Backups

```bash
# Create backup script
mkdir -p /var/backups/timescard

cat > /usr/local/bin/backup-timescard.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/var/backups/timescard"
DATE=$(date +%Y%m%d_%H%M%S)

# Database backup
docker-compose -f /var/www/timescard/docker-compose.yml exec -T mysql \
  mysqldump -u root -p$DB_PASSWORD timesdigital > $BACKUP_DIR/db_$DATE.sql

# Application files backup
tar -czf $BACKUP_DIR/app_$DATE.tar.gz /var/www/timescard

# Keep only last 7 days
find $BACKUP_DIR -type f -mtime +7 -delete

echo "Backup completed: $DATE"
EOF

chmod +x /usr/local/bin/backup-timescard.sh

# Schedule daily backups at 2 AM
crontab -e
# Add: 0 2 * * * /usr/local/bin/backup-timescard.sh
```

### Step 2: Set Up Monitoring

```bash
# Install monitoring tools
apt-get install -y htop iotop nethogs

# Set up health checks
curl https://timescard.cloud/health

# Monitor Docker
docker stats
```

### Step 3: Configure Log Rotation

```bash
cat > /etc/logrotate.d/timescard << 'EOF'
/var/log/nginx/timescard*.log {
    daily
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data www-data
    sharedscripts
    postrotate
        docker-compose -f /var/www/timescard/docker-compose.yml \
          exec -T nginx nginx -s reload > /dev/null 2>&1 || true
    endscript
}
EOF
```

---

## Maintenance

### Regular Tasks

```bash
# Weekly backup verification
docker-compose exec -T mysql mysql -u root -p$DB_PASSWORD -e "SHOW TABLES FROM timesdigital;" > /dev/null && echo "DB OK"

# Monitor disk usage
df -h

# Check log sizes
du -sh /var/log/nginx/

# Update Docker images
docker-compose pull
docker-compose up -d

# Prune unused Docker objects
docker system prune -a --volumes
```

### Scaling

If you need to increase capacity:

```bash
# Add more queue workers
docker-compose up -d --scale queue=3

# Or modify docker-compose.yml and redeploy
```

---

## Troubleshooting

### Application won't start

```bash
# Check logs
docker-compose logs app

# Rebuild
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Database connection errors

```bash
# Verify MySQL is running
docker-compose logs mysql

# Check credentials
docker-compose exec -T mysql mysql -u root -p$DB_PASSWORD -e "SELECT 1;"
```

### Certificate issues

```bash
# Check certificate validity
openssl x509 -in /etc/nginx/ssl/timescard.cloud.crt -text -noout

# Renew if expired
certbot renew --force-renewal
```

### Memory issues

```bash
# Check memory usage
docker stats

# Increase limits in docker-compose.yml
# mem_limit: 2gb
```

### Network connectivity

```bash
# Check network
docker network ls
docker network inspect timescard

# Test DNS resolution
docker-compose exec -T app nslookup timescard.cloud
```

---

## Security Checklist

- [ ] Change all default passwords
- [ ] Enable SSH key authentication (disable password)
- [ ] Set up firewall (ufw)
- [ ] Enable SSL/TLS with valid certificate
- [ ] Configure fail2ban for brute force protection
- [ ] Regular backups tested
- [ ] Application debug mode OFF
- [ ] Database in non-default port (optional)
- [ ] Regular security updates
- [ ] Monitor access logs

---

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Laravel Deployment](https://laravel.com/docs/11/deployment)
- [Let's Encrypt](https://letsencrypt.org/)
- [NGINX Best Practices](https://nginx.org/en/docs/)


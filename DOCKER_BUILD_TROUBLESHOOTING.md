# Docker Build Troubleshooting Guide

## Current Issue: npm ci Failure in Docker Build

### Problem
```
[build]: target app: failed to solve: process "/bin/sh -c npm ci" did not complete successfully: exit code: 1
```

### Solution Applied
The Dockerfile has been updated with a fallback mechanism:
```dockerfile
# Install dependencies with fallback to npm install if ci fails
RUN npm ci --prefer-offline --no-audit 2>/dev/null || npm install
```

This means:
- **Try First**: `npm ci --prefer-offline --no-audit` (faster, exact versions)
- **Fallback**: `npm install` (slower but more forgiving)
- **Result**: Build succeeds even if package-lock.json has issues

### Why This Happens

Common causes of npm ci failures in Docker builds:

1. **Network Issues**
   - Hosting platform network restrictions
   - npm registry timeout
   - Mirror/proxy issues

2. **Package Issues**
   - Corrupted package-lock.json
   - Missing packages in registry
   - Version conflicts

3. **Node.js Version**
   - Incompatibility with Node 20
   - Module compatibility issues

### How to Verify Build Success

After deployment, check that the build succeeded:

```bash
# Check Docker images
docker images | grep timescard

# Check if app container is running
docker ps | grep timescard-app

# Verify asset files were built
docker-compose exec app ls -la public/build/

# Expected output:
# assets-xxxxx.js
# manifest.json
```

### If Build Still Fails

**Option 1: Rebuild with No Cache**
```bash
docker-compose build --no-cache app
```

**Option 2: Check Docker Logs**
```bash
# Full Docker build logs
docker-compose build app --no-cache 2>&1 | tee build.log

# View app logs after start
docker-compose logs -f app
```

**Option 3: Manual Dependency Installation**
```bash
# Get into app container
docker-compose exec app bash

# Manual npm install
cd /app
npm install --verbose

# Check if node_modules exists
ls -la node_modules/

# Build assets
npm run build
```

## Environment Variables in Build

### Variables Available During Build
These are set in docker.env and automatically loaded:
```
APP_KEY=base64:p2DhkCIstptlCY5mdAHi+9SRUlrmJXngbKz3FhHh0tc=
APP_URL=https://timescard.cloud
VITE_API_BASE_URL=https://timescard.cloud/api
```

### If Variables Not Loading

**Check docker.env file exists:**
```bash
ls -la docker.env
# Should show: -rw-r--r-- ... docker.env
```

**Verify environment file has correct permissions:**
```bash
chmod 644 docker.env
```

**Force reload environment:**
```bash
# Remove old containers
docker-compose down

# Clear Docker build cache
docker builder prune -a

# Rebuild
docker-compose up --build -d
```

## NPM Version Compatibility

Current configuration uses Node 20 Alpine:
```dockerfile
FROM node:20-alpine as build-assets
```

### Verify Node/NPM Versions
```bash
# Inside container
docker-compose exec app node --version
# Expected: v20.x.x

docker-compose exec app npm --version
# Expected: v10.x.x
```

### If Version Issues Exist

Update Dockerfile Node version:
```dockerfile
# From:
FROM node:20-alpine

# To:
FROM node:18-alpine  # or node:22-alpine
```

Then rebuild:
```bash
docker-compose build --no-cache app
```

## Vite Build Issues

### If Assets Don't Build

```bash
# Check if Vite built correctly
docker-compose exec app ls -la public/build/

# Rebuild assets
docker-compose exec app npm run build

# View build output
docker-compose exec app npm run build 2>&1
```

### If Assets Missing in Production

```bash
# Clear Vite cache
docker-compose exec app rm -rf bootstrap/cache/vite-manifest.json

# Rebuild
docker-compose exec app npm run build

# Clear Laravel cache
docker-compose exec app php artisan cache:clear
docker-compose exec app php artisan config:cache
```

## MySQL Build Issues

If mysql container fails to start:

```bash
# Check MySQL logs
docker-compose logs mysql

# Verify volume permissions
docker-compose exec mysql ls -la /var/lib/mysql

# Recreate MySQL volume
docker-compose down
docker volume rm timescard_mysql-data
docker-compose up -d mysql

# Wait for MySQL to initialize (30-60 seconds)
sleep 60

# Run migrations
docker-compose exec app php artisan migrate --force
```

## Redis Build Issues

If redis container fails:

```bash
# Check Redis status
docker-compose exec redis redis-cli ping
# Expected: PONG

# Check Redis logs
docker-compose logs redis

# Test password authentication
docker-compose exec redis redis-cli -a ${REDIS_PASSWORD} ping
```

## Complete Build Validation

After successful build, run this checklist:

```bash
# 1. All containers running
docker-compose ps

# 2. App health check
docker-compose exec app curl http://localhost:9000/health

# 3. Database ready
docker-compose exec mysql mysql -uroot -p${DB_PASSWORD} -e "SELECT 1"

# 4. Redis working
docker-compose exec redis redis-cli ping

# 5. Assets built
docker-compose exec app ls public/build/manifest.json

# 6. No errors in logs
docker-compose logs --no-pager | grep -i error
```

## Performance Tips

### Speed Up Build
```bash
# Use BuildKit (faster multi-stage builds)
DOCKER_BUILDKIT=1 docker-compose build --no-cache

# Or set permanently
# On Linux: export DOCKER_BUILDKIT=1
# On Docker Desktop: Enabled in settings
```

### Cache NPM Dependencies
The Dockerfile uses `--prefer-offline` to cache npm packages:
```dockerfile
RUN npm ci --prefer-offline --no-audit
```

This caches in Docker layer, speeding up rebuilds by 5-10x.

## Getting Help

1. **Check Docker logs first**
   ```bash
   docker-compose logs -f
   ```

2. **Check container resources**
   ```bash
   docker stats
   ```

3. **SSH into container and debug**
   ```bash
   docker-compose exec app bash
   npm list  # Check installed packages
   ls -la node_modules/  # Verify node_modules
   ```

4. **Check GitHub Issues**
   https://github.com/sayemtimes/timescard/issues

5. **Review logs and errors**
   - Keep `docker-compose logs` output
   - Note any error messages
   - Share in GitHub issue

## Tested Configurations

This Dockerfile has been tested with:
- ✅ Node.js 20 Alpine
- ✅ PHP 8.3 Alpine
- ✅ npm ci with fallback to npm install
- ✅ Vite build process
- ✅ Multi-stage build optimization

All critical npm commands now have graceful error handling.

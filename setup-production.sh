#!/bin/bash
# ============================================================================
# Times Card Production Setup Script
# ============================================================================
# This script sets up the application for production deployment
# Run: bash setup-production.sh

set -e  # Exit on error

echo "════════════════════════════════════════════════════════════════════════════════"
echo "  Times Card - Production Setup Script"
echo "════════════════════════════════════════════════════════════════════════════════"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ============================================================================
# STEP 1: Verify Requirements
# ============================================================================
echo -e "${BLUE}[1/8]${NC} Checking requirements..."

if ! command -v docker &> /dev/null; then
    echo -e "${RED}✗ Docker not found${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Docker installed${NC}"

if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}✗ Docker Compose not found${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Docker Compose installed${NC}"

if ! command -v php &> /dev/null; then
    echo -e "${YELLOW}⚠ PHP not in PATH (OK if using Docker)${NC}"
fi

echo ""

# ============================================================================
# STEP 2: Verify Configuration Files
# ============================================================================
echo -e "${BLUE}[2/8]${NC} Verifying configuration files..."

files_to_check=(
    "Dockerfile"
    "docker-compose.yml"
    ".dockerignore"
    ".env.production"
    "docker/nginx/nginx.conf"
    "docker/nginx/conf.d/default.conf"
    "docker/php/php.ini"
    "docker/mysql/my.cnf"
)

for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓ $file${NC}"
    else
        echo -e "${RED}✗ Missing: $file${NC}"
        exit 1
    fi
done

echo ""

# ============================================================================
# STEP 3: Check Environment Variables
# ============================================================================
echo -e "${BLUE}[3/8]${NC} Checking critical environment variables..."

if grep -q "APP_KEY=base64:" .env.production; then
    echo -e "${GREEN}✓ APP_KEY is set${NC}"
else
    echo -e "${RED}✗ APP_KEY not found${NC}"
    exit 1
fi

if grep -q "APP_ENV=production" .env.production; then
    echo -e "${GREEN}✓ APP_ENV=production${NC}"
else
    echo -e "${RED}✗ APP_ENV not set to production${NC}"
    exit 1
fi

if grep -q "APP_DEBUG=false" .env.production; then
    echo -e "${GREEN}✓ APP_DEBUG=false${NC}"
else
    echo -e "${RED}✗ APP_DEBUG should be false${NC}"
    exit 1
fi

if grep -q "DB_PASSWORD=" .env.production | grep -qv "DB_PASSWORD=$"; then
    echo -e "${GREEN}✓ DB_PASSWORD is configured${NC}"
else
    echo -e "${RED}✗ DB_PASSWORD is empty${NC}"
    exit 1
fi

echo ""

# ============================================================================
# STEP 4: Build Docker Images
# ============================================================================
echo -e "${BLUE}[4/8]${NC} Building Docker images..."
echo -e "${YELLOW}This may take 5-10 minutes...${NC}"
echo ""

docker-compose build 2>&1 | tail -20

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Docker images built successfully${NC}"
else
    echo -e "${RED}✗ Docker build failed${NC}"
    exit 1
fi

echo ""

# ============================================================================
# STEP 5: Start Services
# ============================================================================
echo -e "${BLUE}[5/8]${NC} Starting Docker services..."

docker-compose up -d

sleep 10  # Wait for services to start

echo -e "${GREEN}✓ Services started${NC}"
echo ""

# ============================================================================
# STEP 6: Check Service Health
# ============================================================================
echo -e "${BLUE}[6/8]${NC} Checking service health..."

services=("timescard-app" "timescard-mysql" "timescard-redis" "timescard-nginx")

for service in "${services[@]}"; do
    if docker ps | grep -q "$service"; then
        echo -e "${GREEN}✓ $service is running${NC}"
    else
        echo -e "${RED}✗ $service is not running${NC}"
        docker-compose logs "$service" | tail -5
        exit 1
    fi
done

echo ""

# ============================================================================
# STEP 7: Run Migrations
# ============================================================================
echo -e "${BLUE}[7/8]${NC} Running database migrations..."

docker-compose exec -T app php artisan migrate --force 2>&1 | tail -10

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Migrations completed${NC}"
else
    echo -e "${RED}✗ Migration failed${NC}"
    docker-compose logs app | tail -20
    exit 1
fi

echo ""

# ============================================================================
# STEP 8: Clear Caches
# ============================================================================
echo -e "${BLUE}[8/8]${NC} Clearing caches..."

docker-compose exec -T app php artisan config:cache
docker-compose exec -T app php artisan route:cache
docker-compose exec -T app php artisan view:cache
docker-compose exec -T app php artisan optimize:clear

echo -e "${GREEN}✓ Caches cleared${NC}"
echo ""

# ============================================================================
# Success Summary
# ============================================================================
echo "════════════════════════════════════════════════════════════════════════════════"
echo -e "${GREEN}✓ Production setup completed successfully!${NC}"
echo "════════════════════════════════════════════════════════════════════════════════"
echo ""
echo "📋 What's configured:"
echo "  ✓ Docker images built"
echo "  ✓ All services running"
echo "  ✓ Database migrated"
echo "  ✓ Caches optimized"
echo ""
echo "🔍 Verification:"
echo "  • Check service status: docker-compose ps"
echo "  • View logs: docker-compose logs -f app"
echo "  • Test database: docker-compose exec mysql mysql -u root -p -e 'SHOW DATABASES;'"
echo "  • Test Redis: docker-compose exec redis redis-cli ping"
echo ""
echo "🌐 Next steps for VPS deployment:"
echo "  1. Provision VPS (DigitalOcean/Linode)"
echo "  2. Install Docker and Docker Compose"
echo "  3. Upload application files"
echo "  4. Setup SSL certificates with Let's Encrypt"
echo "  5. Configure domain DNS"
echo "  6. Run: docker-compose up -d"
echo ""
echo "📚 Documentation:"
echo "  • Read: DOCKER_DEPLOYMENT_GUIDE.md"
echo "  • Check: DEPLOYMENT_CHECKLIST.md"
echo ""

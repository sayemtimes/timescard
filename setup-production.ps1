# ============================================================================
# Times Card Production Setup Script (PowerShell for Windows)
# ============================================================================
# This script sets up the application for production deployment
# Run: .\setup-production.ps1

param(
    [switch]$SkipBuild = $false
)

$ErrorActionPreference = "Stop"

# Colors
$Green = [System.ConsoleColor]::Green
$Red = [System.ConsoleColor]::Red
$Yellow = [System.ConsoleColor]::Yellow
$Blue = [System.ConsoleColor]::Cyan
$Reset = [System.ConsoleColor]::White

function Write-Success($message) {
    Write-Host "✓ $message" -ForegroundColor $Green
}

function Write-Error-Custom($message) {
    Write-Host "✗ $message" -ForegroundColor $Red
}

function Write-Warning-Custom($message) {
    Write-Host "⚠ $message" -ForegroundColor $Yellow
}

function Write-Info($message) {
    Write-Host "[*] $message" -ForegroundColor $Blue
}

# ============================================================================
# Header
# ============================================================================
Write-Host ""
Write-Host "═════════════════════════════════════════════════════════════════════════════════" -ForegroundColor $Blue
Write-Host "  Times Card - Production Setup Script (Windows)" -ForegroundColor $Blue
Write-Host "═════════════════════════════════════════════════════════════════════════════════" -ForegroundColor $Blue
Write-Host ""

# ============================================================================
# STEP 1: Verify Requirements
# ============================================================================
Write-Info "STEP 1/8: Checking requirements..."

$missingTools = @()

if (!(Get-Command docker -ErrorAction SilentlyContinue)) {
    $missingTools += "Docker"
}
else {
    Write-Success "Docker installed"
}

if (!(Get-Command docker-compose -ErrorAction SilentlyContinue)) {
    $missingTools += "Docker Compose"
}
else {
    Write-Success "Docker Compose installed"
}

if ($missingTools.Count -gt 0) {
    Write-Error-Custom "Missing tools: $($missingTools -join ', ')"
    Write-Host "Please install Docker Desktop from https://docker.com" -ForegroundColor $Red
    exit 1
}

Write-Host ""

# ============================================================================
# STEP 2: Verify Configuration Files
# ============================================================================
Write-Info "STEP 2/8: Verifying configuration files..."

$requiredFiles = @(
    "Dockerfile",
    "docker-compose.yml",
    ".dockerignore",
    ".env.production",
    "docker/nginx/nginx.conf",
    "docker/nginx/conf.d/default.conf",
    "docker/php/php.ini",
    "docker/mysql/my.cnf"
)

$missingFiles = @()
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Success "$file"
    }
    else {
        $missingFiles += $file
    }
}

if ($missingFiles.Count -gt 0) {
    Write-Error-Custom "Missing files: $($missingFiles -join ', ')"
    exit 1
}

Write-Host ""

# ============================================================================
# STEP 3: Check Environment Variables
# ============================================================================
Write-Info "STEP 3/8: Checking critical environment variables..."

$envContent = Get-Content ".env.production" -Raw

$checks = @(
    ("APP_KEY is set", "APP_KEY=base64:"),
    ("APP_ENV=production", "APP_ENV=production"),
    ("APP_DEBUG=false", "APP_DEBUG=false"),
    ("DB_PASSWORD configured", "DB_PASSWORD=T1m3sC@rd")
)

foreach ($check in $checks) {
    if ($envContent -match $check[1]) {
        Write-Success $check[0]
    }
    else {
        Write-Error-Custom $check[0]
        exit 1
    }
}

Write-Host ""

# ============================================================================
# STEP 4: Build Docker Images
# ============================================================================
if ($SkipBuild) {
    Write-Info "STEP 4/8: Skipping Docker build (use -SkipBuild flag)"
}
else {
    Write-Info "STEP 4/8: Building Docker images..."
    Write-Warning-Custom "This may take 5-10 minutes..."
    Write-Host ""

    docker-compose build

    if ($LASTEXITCODE -eq 0) {
        Write-Success "Docker images built successfully"
    }
    else {
        Write-Error-Custom "Docker build failed"
        exit 1
    }
}

Write-Host ""

# ============================================================================
# STEP 5: Start Services
# ============================================================================
Write-Info "STEP 5/8: Starting Docker services..."

docker-compose up -d

Start-Sleep -Seconds 15

Write-Success "Services started"
Write-Host ""

# ============================================================================
# STEP 6: Check Service Health
# ============================================================================
Write-Info "STEP 6/8: Checking service health..."

$services = @("timescard-app", "timescard-mysql", "timescard-redis", "timescard-nginx")

foreach ($service in $services) {
    $running = docker ps --filter "name=$service" --format "{{.Names}}" | Select-String $service
    if ($running) {
        Write-Success "$service is running"
    }
    else {
        Write-Error-Custom "$service is not running"
        docker-compose logs $service
        exit 1
    }
}

Write-Host ""

# ============================================================================
# STEP 7: Run Migrations
# ============================================================================
Write-Info "STEP 7/8: Running database migrations..."

docker-compose exec -T app php artisan migrate --force

if ($LASTEXITCODE -eq 0) {
    Write-Success "Migrations completed"
}
else {
    Write-Error-Custom "Migration failed"
    docker-compose logs app
    exit 1
}

Write-Host ""

# ============================================================================
# STEP 8: Clear Caches
# ============================================================================
Write-Info "STEP 8/8: Clearing caches..."

docker-compose exec -T app php artisan config:cache | Out-Null
docker-compose exec -T app php artisan route:cache | Out-Null
docker-compose exec -T app php artisan view:cache | Out-Null
docker-compose exec -T app php artisan optimize:clear | Out-Null

Write-Success "Caches cleared"
Write-Host ""

# ============================================================================
# Success Summary
# ============================================================================
Write-Host "═════════════════════════════════════════════════════════════════════════════════" -ForegroundColor $Green
Write-Host "✓ Production setup completed successfully!" -ForegroundColor $Green
Write-Host "═════════════════════════════════════════════════════════════════════════════════" -ForegroundColor $Green
Write-Host ""

Write-Host "📋 What's configured:" -ForegroundColor $Blue
Write-Host "  ✓ Docker images built"
Write-Host "  ✓ All services running"
Write-Host "  ✓ Database migrated"
Write-Host "  ✓ Caches optimized"
Write-Host ""

Write-Host "🔍 Verification commands:" -ForegroundColor $Blue
Write-Host "  • docker-compose ps"
Write-Host "  • docker-compose logs -f app"
Write-Host "  • docker-compose exec mysql mysql -u root -p -e 'SHOW DATABASES;'"
Write-Host "  • docker-compose exec redis redis-cli ping"
Write-Host ""

Write-Host "🌐 Next steps for VPS deployment:" -ForegroundColor $Blue
Write-Host "  1. Provision VPS (DigitalOcean/Linode)"
Write-Host "  2. Install Docker and Docker Compose"
Write-Host "  3. Upload application files"
Write-Host "  4. Setup SSL certificates with Let's Encrypt"
Write-Host "  5. Configure domain DNS"
Write-Host "  6. Run: docker-compose up -d"
Write-Host ""

Write-Host "📚 Documentation:" -ForegroundColor $Blue
Write-Host "  • Read: DOCKER_DEPLOYMENT_GUIDE.md"
Write-Host "  • Check: DEPLOYMENT_CHECKLIST.md"
Write-Host ""

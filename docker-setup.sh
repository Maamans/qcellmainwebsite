#!/bin/bash

# QCell Website - Docker Setup Script
# Automates initial Docker setup

set -e

echo "🚀 QCell Website - Docker Setup"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker and Docker Compose are installed${NC}"
echo ""

# Check Docker daemon
if ! docker info &> /dev/null; then
    echo -e "${RED}❌ Docker daemon is not running. Please start Docker Desktop.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker daemon is running${NC}"
echo ""

# Setup environment files
echo "📝 Setting up environment files..."

if [ ! -f .env.local ]; then
    if [ -f .env.example ]; then
        cp .env.example .env.local
        echo -e "${GREEN}✅ Created .env.local from .env.example${NC}"
    else
        echo -e "${YELLOW}⚠️  .env.example not found, creating basic .env.local${NC}"
        cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:4000
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
EOF
    fi
else
    echo -e "${YELLOW}⚠️  .env.local already exists, skipping...${NC}"
fi

if [ ! -f backend/.env ]; then
    if [ -f backend/.env.example ]; then
        cp backend/.env.example backend/.env
        echo -e "${GREEN}✅ Created backend/.env from backend/.env.example${NC}"
    else
        echo -e "${YELLOW}⚠️  backend/.env.example not found, creating basic backend/.env${NC}"
        mkdir -p backend
        cat > backend/.env << EOF
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/qcell_db
JWT_SECRET=dev-secret-change-in-production
UPLOAD_DIR=/app/uploads
EOF
    fi
else
    echo -e "${YELLOW}⚠️  backend/.env already exists, skipping...${NC}"
fi

echo ""

# Ask user for environment
echo "Select environment:"
echo "1) Development (hot reload, dev dependencies)"
echo "2) Production (optimized, production dependencies)"
read -p "Enter choice [1-2] (default: 1): " env_choice
env_choice=${env_choice:-1}

if [ "$env_choice" = "2" ]; then
    COMPOSE_FILE="docker-compose.yml"
    echo -e "${GREEN}✅ Selected: Production${NC}"
else
    COMPOSE_FILE="docker-compose.dev.yml"
    echo -e "${GREEN}✅ Selected: Development${NC}"
fi

echo ""

# Build images
echo "🔨 Building Docker images..."
docker compose -f $COMPOSE_FILE build

echo ""
echo -e "${GREEN}✅ Images built successfully${NC}"
echo ""

# Start services
echo "🚀 Starting services..."
docker compose -f $COMPOSE_FILE up -d

echo ""
echo -e "${GREEN}✅ Services started!${NC}"
echo ""

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check service status
echo ""
echo "📊 Service Status:"
docker compose -f $COMPOSE_FILE ps

echo ""
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo "Access your applications:"
echo "  🌐 Frontend:    http://localhost:3000"
echo "  🔧 Backend API: http://localhost:4000"
echo "  👨‍💼 Admin:        http://localhost:3001"
echo ""
echo "Useful commands:"
echo "  View logs:     docker compose -f $COMPOSE_FILE logs -f"
echo "  Stop services: docker compose -f $COMPOSE_FILE down"
echo "  Restart:       docker compose -f $COMPOSE_FILE restart"
echo ""
echo "Or use Makefile commands:"
echo "  make dev-logs  (development)"
echo "  make prod-logs (production)"
echo ""


# Docker Quick Start - QCell Website

Quick reference guide for Docker operations.

## Quick Commands

### Development

```bash
# Start development environment
make dev
# or
docker compose -f docker-compose.dev.yml up -d

# View logs
make dev-logs
# or
docker compose -f docker-compose.dev.yml logs -f

# Stop
make dev-down
# or
docker compose -f docker-compose.dev.yml down
```

### Production

```bash
# Start production environment
make prod
# or
docker compose up -d

# View logs
make prod-logs
# or
docker compose logs -f

# Stop
make prod-down
# or
docker compose down
```

## Quick Start (First Time)

```bash
# Run quickstart script
make quickstart

# This will:
# 1. Copy environment files
# 2. Build Docker images
# 3. Start all services
```

## Access Applications

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **Admin Dashboard**: http://localhost:3001
- **Database**: localhost:5432
- **Redis**: localhost:6379

## Common Tasks

```bash
# View all logs
make logs

# View specific service logs
make logs-frontend
make logs-backend
make logs-admin

# Restart services
make restart

# Open shell in container
make shell-frontend
make shell-backend

# Backup database
make db-backup

# Check health
make health

# Clean up
make clean
```

## Troubleshooting

```bash
# Check service status
docker compose ps

# View logs
docker compose logs <service-name>

# Restart specific service
docker compose restart <service-name>

# Rebuild specific service
docker compose build <service-name>
docker compose up -d <service-name>
```

## Full Documentation

See `DOCKER_SETUP_GUIDE.md` for complete documentation.


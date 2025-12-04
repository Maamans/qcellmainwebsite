# Docker Setup Guide - QCell Website

Complete guide for dockerizing and running the QCell website application stack.

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Project Structure](#project-structure)
4. [Quick Start](#quick-start)
5. [Development Setup](#development-setup)
6. [Production Setup](#production-setup)
7. [Configuration](#configuration)
8. [Services Overview](#services-overview)
9. [Troubleshooting](#troubleshooting)
10. [Maintenance](#maintenance)

---

## Overview

This Docker setup includes:

- **Frontend**: Next.js application (port 3000)
- **Backend**: Node.js/Express API server (port 4000)
- **Admin Dashboard**: Next.js admin interface (port 3001)
- **Database**: PostgreSQL (port 5432)
- **Cache**: Redis (port 6379)
- **Reverse Proxy**: Nginx (port 80/443)

---

## Prerequisites

### Required Software

1. **Docker** (version 20.10+)
   ```bash
   # Install Docker Desktop
   # Windows/Mac: https://www.docker.com/products/docker-desktop
   # Linux: https://docs.docker.com/engine/install/
   ```

2. **Docker Compose** (version 2.0+)
   ```bash
   # Usually included with Docker Desktop
   # Verify installation:
   docker compose version
   ```

3. **Git** (for cloning repository)

### System Requirements

- **RAM**: Minimum 4GB (8GB recommended)
- **Disk Space**: Minimum 10GB free
- **CPU**: 2+ cores recommended

---

## Project Structure

```
qcell-website/
├── docker-compose.yml          # Production configuration
├── docker-compose.dev.yml       # Development configuration
├── Dockerfile                   # Frontend production image
├── Dockerfile.dev               # Frontend development image
├── .dockerignore               # Files to exclude from Docker build
├── .env.example                # Environment variables template
│
├── backend/
│   ├── Dockerfile              # Backend production image
│   ├── Dockerfile.dev          # Backend development image
│   ├── .dockerignore          # Backend Docker ignore
│   ├── .env.example           # Backend environment template
│   └── ...                     # Backend source code
│
├── admin/
│   ├── Dockerfile              # Admin production image
│   ├── Dockerfile.dev          # Admin development image
│   ├── .dockerignore          # Admin Docker ignore
│   └── ...                     # Admin source code
│
├── nginx/
│   └── nginx.conf              # Nginx reverse proxy config
│
└── ...                         # Frontend source code
```

---

## Quick Start

### 1. Clone Repository

```bash
git clone <repository-url>
cd qcell-website
```

### 2. Set Up Environment Variables

```bash
# Frontend
cp .env.example .env.local

# Backend (if separate)
cp backend/.env.example backend/.env

# Edit files and update values
```

### 3. Start Services (Development)

```bash
# Start all services in development mode
docker compose -f docker-compose.dev.yml up -d

# View logs
docker compose -f docker-compose.dev.yml logs -f

# Stop services
docker compose -f docker-compose.dev.yml down
```

### 4. Start Services (Production)

```bash
# Build and start all services
docker compose up -d --build

# View logs
docker compose logs -f

# Stop services
docker compose down
```

### 5. Access Applications

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **Admin Dashboard**: http://localhost:3001
- **Database**: localhost:5432
- **Redis**: localhost:6379

---

## Development Setup

### Development Mode Features

- Hot reload for all services
- Source code mounted as volumes
- Development dependencies included
- Debug-friendly configuration

### Start Development Environment

```bash
# Start all services
docker compose -f docker-compose.dev.yml up

# Start specific service
docker compose -f docker-compose.dev.yml up frontend

# Start in background
docker compose -f docker-compose.dev.yml up -d
```

### Development Commands

```bash
# View logs for specific service
docker compose -f docker-compose.dev.yml logs -f frontend

# Execute command in container
docker compose -f docker-compose.dev.yml exec frontend npm run lint

# Restart specific service
docker compose -f docker-compose.dev.yml restart frontend

# Rebuild specific service
docker compose -f docker-compose.dev.yml up -d --build frontend
```

### Hot Reload

All services support hot reload:
- **Frontend**: Changes to `app/`, `components/`, `lib/` trigger rebuild
- **Backend**: Changes to `backend/src/` trigger restart
- **Admin**: Changes to `admin/` trigger rebuild

---

## Production Setup

### Build Production Images

```bash
# Build all images
docker compose build

# Build specific service
docker compose build frontend
```

### Start Production Environment

```bash
# Start all services
docker compose up -d

# Start with specific configuration
docker compose -f docker-compose.yml up -d
```

### Production Commands

```bash
# View logs
docker compose logs -f

# Check service status
docker compose ps

# Restart services
docker compose restart

# Stop services
docker compose down

# Stop and remove volumes (⚠️ deletes data)
docker compose down -v
```

### Health Checks

All services include health checks:

```bash
# Check health status
docker compose ps

# View health check logs
docker inspect qcell-frontend | grep -A 10 Health
```

---

## Configuration

### Environment Variables

#### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
MAP_BOX_ACCESS_TOKEN=your_token_here
NODE_ENV=development
```

#### Backend (backend/.env)

```env
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/qcell_db
JWT_SECRET=your-secret-key-here
UPLOAD_DIR=/app/uploads
```

#### Docker Compose

Edit `docker-compose.yml` or `docker-compose.dev.yml` to customize:
- Port mappings
- Volume mounts
- Environment variables
- Resource limits

### Port Configuration

Default ports (can be changed in docker-compose.yml):

- **Frontend**: 3000
- **Backend**: 4000
- **Admin**: 3001
- **PostgreSQL**: 5432
- **Redis**: 6379
- **Nginx**: 80, 443

### Volume Configuration

**Persistent Volumes:**
- `postgres-data`: Database files
- `redis-data`: Redis persistence
- `backend-uploads`: Uploaded images/files
- `nginx-logs`: Nginx access/error logs

**Development Volumes:**
- Source code mounted for hot reload
- `node_modules` excluded to use container's modules

---

## Services Overview

### Frontend Service

**Image**: Built from `Dockerfile` or `Dockerfile.dev`

**Ports**: 3000

**Volumes**:
- Development: Source code mounted
- Production: Only built files

**Environment**:
- `NEXT_PUBLIC_API_URL`: Backend API URL
- `NODE_ENV`: Environment mode

### Backend Service

**Image**: Built from `backend/Dockerfile` or `backend/Dockerfile.dev`

**Ports**: 4000

**Volumes**:
- `backend-uploads`: Persistent uploads storage
- Development: Source code mounted

**Environment**:
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Authentication secret
- `UPLOAD_DIR`: Upload directory path

**Dependencies**: PostgreSQL (waits for healthy database)

### Admin Service

**Image**: Built from `admin/Dockerfile` or `admin/Dockerfile.dev`

**Ports**: 3001

**Volumes**:
- Development: Source code mounted
- Production: Only built files

**Environment**:
- `NEXT_PUBLIC_API_URL`: Backend API URL

### PostgreSQL Service

**Image**: `postgres:16-alpine`

**Ports**: 5432

**Volumes**:
- `postgres-data`: Persistent database storage

**Environment**:
- `POSTGRES_USER`: Database user
- `POSTGRES_PASSWORD`: Database password
- `POSTGRES_DB`: Database name

**Health Check**: Checks database readiness

### Redis Service

**Image**: `redis:7-alpine`

**Ports**: 6379

**Volumes**:
- `redis-data`: Persistent cache storage

**Health Check**: Redis ping

### Nginx Service (Optional)

**Image**: `nginx:alpine`

**Ports**: 80, 443

**Configuration**: `nginx/nginx.conf`

**Purpose**: Reverse proxy, load balancing, SSL termination

---

## Troubleshooting

### Common Issues

#### 1. Port Already in Use

**Error**: `Bind for 0.0.0.0:3000 failed: port is already allocated`

**Solution**:
```bash
# Find process using port
# Windows:
netstat -ano | findstr :3000

# Linux/Mac:
lsof -i :3000

# Kill process or change port in docker-compose.yml
```

#### 2. Container Won't Start

**Error**: Container exits immediately

**Solution**:
```bash
# Check logs
docker compose logs <service-name>

# Check container status
docker compose ps

# Try starting interactively
docker compose run --rm <service-name> sh
```

#### 3. Database Connection Failed

**Error**: `Connection refused` or `database does not exist`

**Solution**:
```bash
# Check database is running
docker compose ps postgres

# Check database logs
docker compose logs postgres

# Verify DATABASE_URL in backend/.env
# Format: postgresql://user:password@postgres:5432/dbname
```

#### 4. Images Not Building

**Error**: Build fails or takes too long

**Solution**:
```bash
# Clear build cache
docker compose build --no-cache

# Remove old images
docker system prune -a

# Check Dockerfile syntax
docker build -t test -f Dockerfile .
```

#### 5. Hot Reload Not Working

**Error**: Changes not reflected

**Solution**:
```bash
# Verify volumes are mounted
docker compose -f docker-compose.dev.yml config

# Check file permissions
docker compose exec frontend ls -la /app

# Restart service
docker compose restart frontend
```

#### 6. Out of Disk Space

**Error**: `no space left on device`

**Solution**:
```bash
# Clean up Docker
docker system prune -a --volumes

# Remove unused images
docker image prune -a

# Check disk usage
docker system df
```

### Debugging Commands

```bash
# Enter container shell
docker compose exec frontend sh
docker compose exec backend sh

# View container logs
docker compose logs -f --tail=100 frontend

# Check container resources
docker stats

# Inspect container
docker inspect qcell-frontend

# Network debugging
docker network ls
docker network inspect qcell-network
```

---

## Maintenance

### Regular Maintenance Tasks

#### Daily

- Monitor logs for errors
- Check service health
- Verify backups

#### Weekly

- Update dependencies
- Review resource usage
- Clean up old images/containers

#### Monthly

- Security updates
- Database optimization
- Backup verification

### Backup Procedures

#### Database Backup

```bash
# Backup PostgreSQL
docker compose exec postgres pg_dump -U postgres qcell_db > backup.sql

# Restore PostgreSQL
docker compose exec -T postgres psql -U postgres qcell_db < backup.sql
```

#### Volume Backup

```bash
# Backup volumes
docker run --rm -v qcell-website_postgres-data:/data -v $(pwd):/backup \
  alpine tar czf /backup/postgres-backup.tar.gz /data
```

#### Uploads Backup

```bash
# Backup uploads
docker compose exec backend tar czf /tmp/uploads-backup.tar.gz /app/uploads
docker compose cp backend:/tmp/uploads-backup.tar.gz ./uploads-backup.tar.gz
```

### Update Procedures

#### Update Application Code

```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker compose up -d --build
```

#### Update Dependencies

```bash
# Update frontend dependencies
docker compose exec frontend npm update

# Update backend dependencies
docker compose exec backend npm update

# Rebuild images
docker compose build
```

#### Update Base Images

```bash
# Pull latest base images
docker compose pull

# Rebuild services
docker compose build --no-cache
```

### Monitoring

#### Health Checks

```bash
# Check all services
docker compose ps

# Check specific service
docker inspect qcell-frontend | grep -A 10 Health
```

#### Resource Usage

```bash
# View resource usage
docker stats

# View disk usage
docker system df
```

#### Logs

```bash
# View all logs
docker compose logs

# View specific service logs
docker compose logs frontend

# Follow logs
docker compose logs -f

# View last 100 lines
docker compose logs --tail=100
```

---

## Security Considerations

### Production Security Checklist

- [ ] Change all default passwords
- [ ] Use strong JWT_SECRET
- [ ] Enable HTTPS with SSL certificates
- [ ] Configure firewall rules
- [ ] Set up proper CORS origins
- [ ] Use secrets management (Docker secrets or external)
- [ ] Regular security updates
- [ ] Enable Docker content trust
- [ ] Use non-root users in containers
- [ ] Limit container resources

### Environment Variables Security

```bash
# Use Docker secrets for sensitive data
echo "my-secret" | docker secret create jwt_secret -

# Reference in docker-compose.yml
secrets:
  jwt_secret:
    external: true
```

---

## Performance Optimization

### Resource Limits

Add to `docker-compose.yml`:

```yaml
services:
  frontend:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
```

### Build Optimization

- Use multi-stage builds (already implemented)
- Leverage Docker layer caching
- Use .dockerignore effectively
- Minimize image size with Alpine Linux

### Database Optimization

- Use connection pooling
- Configure PostgreSQL for production
- Set up regular VACUUM and ANALYZE
- Monitor query performance

---

## Deployment

### Production Deployment Steps

1. **Prepare Environment**
   ```bash
   # Set production environment variables
   export NODE_ENV=production
   export DATABASE_URL=postgresql://...
   ```

2. **Build Images**
   ```bash
   docker compose build
   ```

3. **Start Services**
   ```bash
   docker compose up -d
   ```

4. **Run Migrations**
   ```bash
   docker compose exec backend npm run migrate
   ```

5. **Verify Health**
   ```bash
   docker compose ps
   curl http://localhost/health
   ```

### CI/CD Integration

Example GitHub Actions workflow:

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build and deploy
        run: |
          docker compose build
          docker compose up -d
```

---

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Docker Deployment](https://nextjs.org/docs/deployment#docker-image)
- [PostgreSQL Docker](https://hub.docker.com/_/postgres)
- [Redis Docker](https://hub.docker.com/_/redis)

---

## Support

For issues or questions:
1. Check logs: `docker compose logs`
2. Review this guide
3. Check Docker documentation
4. Contact development team

---

**Last Updated**: Current implementation
**Maintained By**: Development Team


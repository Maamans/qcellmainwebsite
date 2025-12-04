# Docker Quick Start - QCell Website

Get started with Docker in 5 minutes!

---

## 🚀 Quick Start

### Option 1: Using Makefile (Recommended)

```bash
# Quick setup (first time)
make quickstart

# Or manually:
make dev          # Start development
make dev-logs     # View logs
make dev-down     # Stop
```

### Option 2: Using Docker Compose

```bash
# Development
docker compose -f docker-compose.dev.yml up -d

# Production
docker compose up -d
```

### Option 3: Using Setup Script

```bash
# Windows (Git Bash or WSL)
bash docker-setup.sh

# Linux/Mac
chmod +x docker-setup.sh
./docker-setup.sh
```

---

## 📋 Prerequisites

- ✅ Docker Desktop installed
- ✅ Docker Compose v2.0+
- ✅ 4GB+ RAM available
- ✅ 10GB+ disk space

---

## 🎯 First Time Setup

1. **Copy environment files:**
   ```bash
   cp .env.example .env.local
   cp backend/.env.example backend/.env
   ```

2. **Start services:**
   ```bash
   make dev
   # or
   docker compose -f docker-compose.dev.yml up -d
   ```

3. **Wait for services to start** (30-60 seconds)

4. **Access applications:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:4000
   - Admin: http://localhost:3001

---

## 📚 Common Commands

### Development

```bash
make dev          # Start development environment
make dev-logs     # View all logs
make dev-down     # Stop services
make dev-restart  # Restart services
```

### Production

```bash
make prod         # Start production environment
make prod-logs    # View logs
make prod-down    # Stop services
make prod-build   # Build images
```

### Utilities

```bash
make logs-frontend    # Frontend logs only
make logs-backend     # Backend logs only
make shell-frontend   # Open shell in frontend
make shell-backend    # Open shell in backend
make health           # Check service health
make clean            # Clean up containers
```

### Database

```bash
make db-backup        # Backup database
make db-restore FILE=backups/backup.sql  # Restore database
make shell-db         # Open database shell
```

---

## 🔧 Configuration

### Environment Variables

**Frontend** (`.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

**Backend** (`backend/.env`):
```env
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/qcell_db
JWT_SECRET=your-secret-key
```

---

## 🐛 Troubleshooting

### Services won't start

```bash
# Check logs
make dev-logs

# Check status
docker compose ps

# Restart
make dev-restart
```

### Port already in use

```bash
# Find what's using the port
# Windows:
netstat -ano | findstr :3000

# Change port in docker-compose.dev.yml
```

### Out of disk space

```bash
# Clean up Docker
make clean
# or
docker system prune -a
```

---

## 📖 Full Documentation

- **Complete Guide**: `DOCKER_SETUP_GUIDE.md`
- **Structure Overview**: `DOCKER_STRUCTURE.md`
- **Quick Reference**: `README_DOCKER.md`

---

## ✅ What's Included

- ✅ Frontend (Next.js) - Port 3000
- ✅ Backend API (Node.js) - Port 4000
- ✅ Admin Dashboard - Port 3001
- ✅ PostgreSQL Database - Port 5432
- ✅ Redis Cache - Port 6379
- ✅ Nginx Reverse Proxy - Port 80/443

---

## 🎉 You're Ready!

Start developing:
```bash
make dev
```

View logs:
```bash
make dev-logs
```

Happy coding! 🚀


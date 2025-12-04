# Makefile for QCell Website Docker Operations
# Simplifies common Docker commands

.PHONY: help dev prod build up down logs clean restart shell-frontend shell-backend shell-admin db-backup db-restore

# Default target
help:
	@echo "QCell Website - Docker Commands"
	@echo ""
	@echo "Development:"
	@echo "  make dev          - Start development environment"
	@echo "  make dev-build   - Build development images"
	@echo "  make dev-down    - Stop development environment"
	@echo "  make dev-logs    - View development logs"
	@echo ""
	@echo "Production:"
	@echo "  make prod        - Start production environment"
	@echo "  make prod-build  - Build production images"
	@echo "  make prod-down   - Stop production environment"
	@echo "  make prod-logs   - View production logs"
	@echo ""
	@echo "Utilities:"
	@echo "  make build       - Build all images"
	@echo "  make clean       - Clean up containers, images, and volumes"
	@echo "  make restart     - Restart all services"
	@echo "  make shell-frontend - Open shell in frontend container"
	@echo "  make shell-backend  - Open shell in backend container"
	@echo "  make shell-admin    - Open shell in admin container"
	@echo ""
	@echo "Database:"
	@echo "  make db-backup   - Backup PostgreSQL database"
	@echo "  make db-restore - Restore PostgreSQL database"
	@echo ""
	@echo "Maintenance:"
	@echo "  make update      - Update and rebuild all services"
	@echo "  make prune       - Remove unused Docker resources"

# Development Commands
dev:
	docker compose -f docker-compose.dev.yml up -d
	@echo "Development environment started!"
	@echo "Frontend: http://localhost:3000"
	@echo "Backend: http://localhost:4000"
	@echo "Admin: http://localhost:3001"

dev-build:
	docker compose -f docker-compose.dev.yml build

dev-down:
	docker compose -f docker-compose.dev.yml down

dev-logs:
	docker compose -f docker-compose.dev.yml logs -f

dev-restart:
	docker compose -f docker-compose.dev.yml restart

# Production Commands
prod:
	docker compose up -d
	@echo "Production environment started!"

prod-build:
	docker compose build

prod-down:
	docker compose down

prod-logs:
	docker compose logs -f

prod-restart:
	docker compose restart

# Build Commands
build:
	docker compose build

build-no-cache:
	docker compose build --no-cache

# Service Management
up:
	docker compose up -d

down:
	docker compose down

restart:
	docker compose restart

logs:
	docker compose logs -f

logs-frontend:
	docker compose logs -f frontend

logs-backend:
	docker compose logs -f backend

logs-admin:
	docker compose logs -f admin

logs-db:
	docker compose logs -f postgres

# Shell Access
shell-frontend:
	docker compose exec frontend sh

shell-backend:
	docker compose exec backend sh

shell-admin:
	docker compose exec admin sh

shell-db:
	docker compose exec postgres psql -U postgres -d qcell_db

# Database Operations
db-backup:
	@mkdir -p backups
	docker compose exec postgres pg_dump -U postgres qcell_db > backups/backup-$$(date +%Y%m%d-%H%M%S).sql
	@echo "Database backup created in backups/"

db-restore:
	@echo "Usage: make db-restore FILE=backups/backup.sql"
	@if [ -z "$(FILE)" ]; then \
		echo "Error: FILE parameter required"; \
		exit 1; \
	fi
	docker compose exec -T postgres psql -U postgres qcell_db < $(FILE)
	@echo "Database restored from $(FILE)"

db-reset:
	@echo "⚠️  WARNING: This will delete all data!"
	@read -p "Are you sure? [y/N] " -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		docker compose down -v; \
		docker compose up -d postgres; \
		sleep 5; \
		docker compose exec backend npm run migrate; \
		echo "Database reset complete"; \
	fi

# Cleanup Commands
clean:
	docker compose down -v
	docker system prune -f
	@echo "Cleanup complete"

clean-all:
	docker compose down -v --rmi all
	docker system prune -a -f --volumes
	@echo "Complete cleanup done (⚠️  all images removed)"

prune:
	docker system prune -a -f
	@echo "Unused Docker resources removed"

# Update Commands
update:
	git pull
	docker compose build --no-cache
	docker compose up -d
	@echo "Services updated and restarted"

# Health Checks
health:
	@echo "Checking service health..."
	@docker compose ps
	@echo ""
	@echo "Testing endpoints..."
	@curl -s http://localhost:3000 > /dev/null && echo "✅ Frontend: OK" || echo "❌ Frontend: Failed"
	@curl -s http://localhost:4000/api/health > /dev/null && echo "✅ Backend: OK" || echo "❌ Backend: Failed"
	@curl -s http://localhost:3001 > /dev/null && echo "✅ Admin: OK" || echo "❌ Admin: Failed"

# Development Helpers
install-frontend:
	docker compose exec frontend npm install

install-backend:
	docker compose exec backend npm install

install-admin:
	docker compose exec admin npm install

lint-frontend:
	docker compose exec frontend npm run lint

lint-backend:
	docker compose exec backend npm run lint

# Database Migrations
migrate:
	docker compose exec backend npm run migrate

migrate-dev:
	docker compose -f docker-compose.dev.yml exec backend npm run migrate

# Quick Start
quickstart:
	@echo "🚀 Quick Start - Setting up QCell Website"
	@echo ""
	@echo "1. Copying environment files..."
	@if [ ! -f .env.local ]; then cp .env.example .env.local; fi
	@if [ ! -f backend/.env ]; then cp backend/.env.example backend/.env; fi
	@echo "2. Building images..."
	@docker compose -f docker-compose.dev.yml build
	@echo "3. Starting services..."
	@docker compose -f docker-compose.dev.yml up -d
	@echo ""
	@echo "✅ Setup complete!"
	@echo ""
	@echo "Access your applications:"
	@echo "  Frontend: http://localhost:3000"
	@echo "  Backend:  http://localhost:4000"
	@echo "  Admin:    http://localhost:3001"
	@echo ""
	@echo "View logs: make dev-logs"
	@echo "Stop:      make dev-down"


# Docker Structure Overview - QCell Website

Complete overview of the Docker setup structure and architecture.

---

## Directory Structure

```
qcell-website/
│
├── Dockerfile                    # Frontend production image
├── Dockerfile.dev                # Frontend development image
├── .dockerignore                 # Files excluded from Docker builds
│
├── docker-compose.yml             # Production orchestration
├── docker-compose.dev.yml         # Development orchestration
│
├── Makefile                      # Convenience commands
├── docker-setup.sh               # Automated setup script
│
├── .env.example                  # Frontend env template
├── README_DOCKER.md              # Quick reference
├── DOCKER_SETUP_GUIDE.md         # Complete guide
├── DOCKER_STRUCTURE.md           # This file
│
├── backend/
│   ├── Dockerfile                # Backend production image
│   ├── Dockerfile.dev            # Backend development image
│   ├── .dockerignore            # Backend Docker ignore
│   └── .env.example             # Backend env template
│
├── admin/
│   ├── Dockerfile                # Admin production image
│   ├── Dockerfile.dev            # Admin development image
│   └── .dockerignore            # Admin Docker ignore
│
└── nginx/
    └── nginx.conf                # Reverse proxy configuration
```

---

## Docker Images

### 1. Frontend Image (`qcell-frontend`)

**Base Image**: `node:20-alpine`

**Stages**:
- `deps`: Install dependencies
- `builder`: Build Next.js application
- `runner`: Production runtime

**Ports**: 3000

**Volumes**:
- Development: Source code mounted
- Production: Only built files

**Environment**:
- `NEXT_PUBLIC_API_URL`: Backend API URL
- `NODE_ENV`: Environment mode
- `PORT`: Server port (3000)

### 2. Backend Image (`qcell-backend`)

**Base Image**: `node:20-alpine`

**Stages**:
- `deps`: Install production dependencies
- `builder`: Compile TypeScript (if needed)
- `runner`: Production runtime

**Ports**: 4000

**Volumes**:
- `backend-uploads`: Persistent uploads storage
- Development: Source code mounted

**Environment**:
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Authentication secret
- `UPLOAD_DIR`: Upload directory path
- `PORT`: Server port (4000)

### 3. Admin Image (`qcell-admin`)

**Base Image**: `node:20-alpine`

**Structure**: Similar to frontend

**Ports**: 3001

**Environment**:
- `NEXT_PUBLIC_API_URL`: Backend API URL
- `PORT`: Server port (3001)

### 4. PostgreSQL Image (`qcell-postgres`)

**Base Image**: `postgres:16-alpine`

**Ports**: 5432

**Volumes**:
- `postgres-data`: Persistent database storage

**Environment**:
- `POSTGRES_USER`: Database user
- `POSTGRES_PASSWORD`: Database password
- `POSTGRES_DB`: Database name

### 5. Redis Image (`qcell-redis`)

**Base Image**: `redis:7-alpine`

**Ports**: 6379

**Volumes**:
- `redis-data`: Persistent cache storage

### 6. Nginx Image (`qcell-nginx`)

**Base Image**: `nginx:alpine`

**Ports**: 80, 443

**Configuration**: `nginx/nginx.conf`

---

## Docker Compose Files

### docker-compose.yml (Production)

**Purpose**: Production deployment

**Features**:
- Optimized images
- Health checks
- Resource limits (can be added)
- Persistent volumes
- Nginx reverse proxy

**Usage**:
```bash
docker compose up -d
```

### docker-compose.dev.yml (Development)

**Purpose**: Development with hot reload

**Features**:
- Source code mounted
- Hot reload enabled
- Development dependencies
- Debug-friendly configuration

**Usage**:
```bash
docker compose -f docker-compose.dev.yml up
```

---

## Network Architecture

### Docker Network: `qcell-network`

**Type**: Bridge network

**Services Connected**:
- frontend
- backend
- admin
- postgres
- redis
- nginx

**Internal Communication**:
- Services communicate using service names
- Example: `http://backend:4000` (not `localhost:4000`)

---

## Volume Strategy

### Named Volumes (Persistent)

1. **postgres-data**
   - Purpose: Database files
   - Location: `/var/lib/postgresql/data`
   - Persistence: Survives container restarts

2. **redis-data**
   - Purpose: Redis persistence
   - Location: `/data`
   - Persistence: Survives container restarts

3. **backend-uploads**
   - Purpose: Uploaded images/files
   - Location: `/app/uploads`
   - Persistence: Survives container restarts

4. **nginx-logs**
   - Purpose: Nginx access/error logs
   - Location: `/var/log/nginx`
   - Persistence: Survives container restarts

### Bind Mounts (Development)

- Source code mounted for hot reload
- `node_modules` excluded (uses container's modules)
- Changes reflect immediately

---

## Build Strategy

### Multi-Stage Builds

**Benefits**:
- Smaller final images
- Faster builds (layer caching)
- Security (no build tools in production)

**Stages**:
1. **deps**: Install dependencies only
2. **builder**: Build application
3. **runner**: Minimal runtime image

### Layer Caching

**Optimization**:
- Copy package files first
- Install dependencies
- Copy source code last
- Changes to source don't invalidate dependency layer

---

## Security Considerations

### Container Security

1. **Non-root Users**
   - All services run as non-root
   - Frontend: `nextjs` user (UID 1001)
   - Backend: `nodejs` user (UID 1001)

2. **Minimal Base Images**
   - Alpine Linux (smaller attack surface)
   - Only necessary packages

3. **Secrets Management**
   - Environment variables for non-sensitive data
   - Docker secrets for sensitive data (production)

4. **Network Isolation**
   - Services on private network
   - Only necessary ports exposed

### Image Security

1. **Regular Updates**
   - Base images updated regularly
   - Dependencies updated

2. **Vulnerability Scanning**
   - Scan images before deployment
   - Use `docker scan` or external tools

---

## Performance Optimization

### Image Size Optimization

- Multi-stage builds
- Alpine Linux base images
- `.dockerignore` to exclude unnecessary files
- Layer caching

### Build Time Optimization

- Parallel builds
- Layer caching
- Selective rebuilds

### Runtime Optimization

- Health checks
- Resource limits
- Connection pooling
- Caching strategies

---

## Development Workflow

### Typical Development Flow

1. **Start Services**
   ```bash
   make dev
   # or
   docker compose -f docker-compose.dev.yml up -d
   ```

2. **Make Changes**
   - Edit source code
   - Changes auto-reload (hot reload)

3. **View Logs**
   ```bash
   make dev-logs
   # or
   docker compose -f docker-compose.dev.yml logs -f
   ```

4. **Test Changes**
   - Visit http://localhost:3000
   - Check console for errors

5. **Stop Services**
   ```bash
   make dev-down
   # or
   docker compose -f docker-compose.dev.yml down
   ```

---

## Production Workflow

### Typical Production Flow

1. **Build Images**
   ```bash
   make prod-build
   # or
   docker compose build
   ```

2. **Start Services**
   ```bash
   make prod
   # or
   docker compose up -d
   ```

3. **Run Migrations**
   ```bash
   docker compose exec backend npm run migrate
   ```

4. **Verify Health**
   ```bash
   make health
   # or
   docker compose ps
   ```

5. **Monitor**
   ```bash
   make prod-logs
   # or
   docker compose logs -f
   ```

---

## Environment Variables

### Frontend Variables

**File**: `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
MAP_BOX_ACCESS_TOKEN=your_token
NODE_ENV=development
```

### Backend Variables

**File**: `backend/.env`

```env
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/qcell_db
JWT_SECRET=your-secret-key
UPLOAD_DIR=/app/uploads
```

### Docker Compose Variables

**File**: `.env` (root)

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=qcell_db
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/qcell_db
JWT_SECRET=your-secret-key
```

---

## Health Checks

All services include health checks:

### Frontend
```yaml
healthcheck:
  test: ["CMD", "node", "-e", "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"]
  interval: 30s
  timeout: 10s
  retries: 3
```

### Backend
```yaml
healthcheck:
  test: ["CMD", "node", "-e", "require('http').get('http://localhost:4000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"]
  interval: 30s
  timeout: 10s
  retries: 3
```

### Database
```yaml
healthcheck:
  test: ["CMD-SHELL", "pg_isready -U postgres"]
  interval: 10s
  timeout: 5s
  retries: 5
```

---

## Scaling Considerations

### Horizontal Scaling

**Frontend**:
```yaml
services:
  frontend:
    deploy:
      replicas: 3
```

**Backend**:
```yaml
services:
  backend:
    deploy:
      replicas: 2
```

### Load Balancing

- Nginx handles load balancing
- Multiple frontend/backend instances
- Session affinity (if needed)

---

## Backup & Recovery

### Database Backup

```bash
# Automated backup
docker compose exec postgres pg_dump -U postgres qcell_db > backup.sql

# Scheduled backups (cron)
0 2 * * * docker compose exec postgres pg_dump -U postgres qcell_db > /backups/backup-$(date +\%Y\%m\%d).sql
```

### Volume Backup

```bash
# Backup volumes
docker run --rm -v qcell-website_postgres-data:/data -v $(pwd):/backup \
  alpine tar czf /backup/postgres-backup.tar.gz /data
```

### Recovery

```bash
# Restore database
docker compose exec -T postgres psql -U postgres qcell_db < backup.sql

# Restore volumes
docker run --rm -v qcell-website_postgres-data:/data -v $(pwd):/backup \
  alpine tar xzf /backup/postgres-backup.tar.gz -C /
```

---

## Monitoring & Logging

### Log Management

**View Logs**:
```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f frontend

# Last 100 lines
docker compose logs --tail=100
```

**Log Drivers**:
- Default: JSON file
- Production: Consider external logging (ELK, CloudWatch, etc.)

### Monitoring

**Resource Usage**:
```bash
docker stats
```

**Service Status**:
```bash
docker compose ps
```

**Health Status**:
```bash
docker inspect qcell-frontend | grep -A 10 Health
```

---

## Troubleshooting Structure

### Common Issues by Layer

1. **Application Layer**
   - Check application logs
   - Verify environment variables
   - Test endpoints

2. **Container Layer**
   - Check container status
   - View container logs
   - Inspect container

3. **Network Layer**
   - Check network connectivity
   - Verify service names
   - Test DNS resolution

4. **Volume Layer**
   - Check volume mounts
   - Verify permissions
   - Check disk space

5. **Host Layer**
   - Check Docker daemon
   - Verify resources
   - Check system logs

---

## Best Practices

### Image Management

1. **Use specific tags** (not `latest`)
2. **Regular updates** of base images
3. **Scan for vulnerabilities**
4. **Minimize layers**
5. **Use .dockerignore**

### Container Management

1. **Use health checks**
2. **Set resource limits**
3. **Use restart policies**
4. **Monitor resource usage**
5. **Clean up unused resources**

### Security

1. **Non-root users**
2. **Minimal base images**
3. **Secrets management**
4. **Network isolation**
5. **Regular updates**

### Performance

1. **Multi-stage builds**
2. **Layer caching**
3. **Resource limits**
4. **Connection pooling**
5. **Caching strategies**

---

## Summary

This Docker setup provides:

✅ **Complete containerization** of all services
✅ **Development and production** configurations
✅ **Hot reload** for development
✅ **Optimized builds** for production
✅ **Health checks** for all services
✅ **Persistent storage** for data
✅ **Network isolation** for security
✅ **Easy management** with Makefile
✅ **Comprehensive documentation**

The structure is production-ready and follows Docker best practices.

---

**Last Updated**: Current implementation
**Maintained By**: Development Team


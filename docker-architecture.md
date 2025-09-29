# Docker Architecture for React Resume Website

## Docker Setup Overview

This project uses Docker to provide a consistent development environment across different systems and simplify deployment. The containerized approach ensures that all developers work with the same Node.js version, dependencies, and SSL configuration.

## Container Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Docker Host                              │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Development Container                  │    │
│  │                                                     │    │
│  │  ┌─────────────────────────────────────────────┐    │    │
│  │  │            Node.js 18 Alpine            │    │    │
│  │  │                                         │    │    │
│  │  │  ┌─────────────────────────────────┐    │    │    │
│  │  │  │        Vite Dev Server          │    │    │    │
│  │  │  │      (Port 3000 - HTTPS)        │    │    │    │
│  │  │  └─────────────────────────────────┘    │    │    │
│  │  │                                         │    │    │
│  │  │  ┌─────────────────────────────────┐    │    │    │
│  │  │  │      SSL Certificates           │    │    │    │
│  │  │  │    (Self-signed for dev)        │    │    │    │
│  │  │  └─────────────────────────────────┘    │    │    │
│  │  │                                         │    │    │
│  │  │  ┌─────────────────────────────────┐    │    │    │
│  │  │  │       Hot Module Reload         │    │    │    │
│  │  │  │      (Watch mode enabled)       │    │    │    │
│  │  │  └─────────────────────────────────┘    │    │    │
│  │  └─────────────────────────────────────────┘    │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │             Production Container                    │    │
│  │                                                     │    │
│  │  ┌─────────────────────────────────────────────┐    │    │
│  │  │            Nginx Alpine                 │    │    │
│  │  │                                         │    │    │
│  │  │  ┌─────────────────────────────────┐    │    │    │
│  │  │  │       Static Files Serve        │    │    │    │
│  │  │  │      (Port 80/443)              │    │    │    │
│  │  │  └─────────────────────────────────┘    │    │    │
│  │  │                                         │    │    │
│  │  │  ┌─────────────────────────────────┐    │    │    │
│  │  │  │       SSL Termination           │    │    │    │
│  │  │  │    (Production certificates)    │    │    │    │
│  │  │  └─────────────────────────────────┘    │    │    │
│  │  │                                         │    │    │
│  │  │  ┌─────────────────────────────────┐    │    │    │
│  │  │  │       Gzip Compression          │    │    │    │
│  │  │  │      (Asset optimization)       │    │    │    │
│  │  │  └─────────────────────────────────┘    │    │    │
│  │  └─────────────────────────────────────────┘    │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Docker Configuration Files

### 1. Dockerfile (Multi-stage build)

```dockerfile
# Development stage
FROM node:18-alpine as development
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine as production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
```

### 2. docker-compose.yml (Development)

```yaml
version: '3.8'

services:
  react-resume-dev:
    build:
      context: .
      target: development
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
      - ./certificates:/app/certificates
    environment:
      - NODE_ENV=development
      - VITE_SSL_CERT=/app/certificates/cert.pem
      - VITE_SSL_KEY=/app/certificates/key.pem
    command: npm run dev -- --host 0.0.0.0 --port 3000
    networks:
      - resume-network

networks:
  resume-network:
    driver: bridge
```

### 3. docker-compose.prod.yml (Production)

```yaml
version: '3.8'

services:
  react-resume-prod:
    build:
      context: .
      target: production
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./certificates:/etc/nginx/certs
    environment:
      - NODE_ENV=production
    networks:
      - resume-network

networks:
  resume-network:
    driver: bridge
```

## SSL Certificate Management

### Development Certificates (Self-signed)

```bash
# Generate self-signed certificates for development
mkdir -p certificates
openssl req -x509 -newkey rsa:4096 -keyout certificates/key.pem -out certificates/cert.pem -days 365 -nodes -subj "/CN=localhost"
```

### Directory Structure with Docker

```
react-resume/
├── certificates/                 # SSL certificates
│   ├── cert.pem                 # Development certificate
│   ├── key.pem                  # Development private key
│   └── .gitignore               # Ignore certificates in git
├── docker/                      # Docker-specific configs
│   ├── nginx.conf               # Nginx configuration
│   └── entrypoint.sh            # Custom entrypoint script
├── src/                         # React application source
├── public/                      # Static assets
├── Dockerfile                   # Multi-stage Docker build
├── docker-compose.yml           # Development environment
├── docker-compose.prod.yml      # Production environment
├── .dockerignore               # Docker ignore file
├── package.json
├── vite.config.ts              # Vite config with Docker support
└── README.md
```

## Vite Configuration for Docker

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow external connections
    port: 3000,
    https: {
      key: fs.readFileSync('./certificates/key.pem'),
      cert: fs.readFileSync('./certificates/cert.pem'),
    },
    hmr: {
      port: 3000, // HMR port for Docker
    },
    watch: {
      usePolling: true, // Enable polling for Docker volumes
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['animejs'],
          styles: ['tailwindcss'],
        },
      },
    },
  },
});
```

## Development Workflow with Docker

### Quick Start Commands

```bash
# 1. Clone and setup
git clone <repository>
cd react-resume

# 2. Generate SSL certificates
make setup-ssl

# 3. Start development environment
docker-compose up --build

# 4. Access application
open https://localhost:3000
```

### Development Commands

```bash
# Start development server
docker-compose up

# Start with rebuild
docker-compose up --build

# Run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Remove volumes
docker-compose down -v

# Shell into container
docker-compose exec react-resume-dev sh

# Install new dependencies
docker-compose exec react-resume-dev npm install <package>

# Run tests
docker-compose exec react-resume-dev npm test

# Build production
docker-compose -f docker-compose.prod.yml up --build
```

## Production Deployment

### Docker Build for Production

```bash
# Build production image
docker build -t react-resume:latest .

# Run production container
docker run -p 80:80 -p 443:443 react-resume:latest

# Or use docker-compose
docker-compose -f docker-compose.prod.yml up -d
```

### Nginx Configuration

```nginx
# nginx.conf
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    server {
        listen 80;
        server_name localhost;
        return 301 https://$server_name$request_uri;
    }
    
    server {
        listen 443 ssl;
        server_name localhost;
        
        ssl_certificate /etc/nginx/certs/cert.pem;
        ssl_certificate_key /etc/nginx/certs/key.pem;
        
        root /usr/share/nginx/html;
        index index.html index.htm;
        
        location / {
            try_files $uri $uri/ /index.html;
        }
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

## Environment Variables

```bash
# .env.development
NODE_ENV=development
VITE_APP_TITLE=My Resume - Development
VITE_API_URL=https://localhost:3000/api
VITE_SSL_ENABLED=true

# .env.production
NODE_ENV=production
VITE_APP_TITLE=My Resume
VITE_API_URL=https://your-domain.com/api
VITE_SSL_ENABLED=true
```

## Docker Optimization

### .dockerignore

```
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.nyc_output
coverage
.docker
.dockerignore
Dockerfile*
docker-compose*
```

### Performance Optimizations

1. **Multi-stage builds**: Separate development and production stages
2. **Layer caching**: Optimize Dockerfile layer order
3. **Volume mounting**: Efficient hot reload in development
4. **Nginx serving**: Optimized static file serving in production
5. **Asset compression**: Gzip and modern image formats
6. **SSL termination**: Efficient HTTPS handling

## Benefits of Docker Setup

1. **Consistency**: Same environment across all development machines
2. **Isolation**: No conflicts with system Node.js versions
3. **Easy setup**: One command to start development
4. **Production parity**: Same container structure for dev and prod
5. **SSL included**: HTTPS working out of the box
6. **Hot reload**: Fast development with Docker volumes
7. **Easy deployment**: Container-ready for any platform

This Docker architecture provides a professional development environment that matches production deployment scenarios while maintaining the ease of development with hot reload and SSL support.
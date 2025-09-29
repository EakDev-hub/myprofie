
# React Resume Website

A modern, professional resume website built with React, TypeScript, Tailwind CSS, and Anime.js animations. Fully containerized with Docker for consistent development and deployment.

## 🚀 Features

- **Modern Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS
- **Smooth Animations**: Anime.js powered interactions and scroll-triggered animations
- **Professional Design**: Corporate blue/white theme with responsive layout
- **Docker Ready**: Containerized development and production environments
- **SSL Enabled**: HTTPS support for both development and production
- **Performance Optimized**: Code splitting, lazy loading, and asset optimization
- **Accessibility**: Screen reader friendly with keyboard navigation support
- **SEO Optimized**: Meta tags, structured data, and semantic HTML

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Animations**: Anime.js
- **Containerization**: Docker, Docker Compose
- **Web Server**: Nginx (production)
- **SSL**: Self-signed certificates (development)

## 📋 Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- Make (optional, for convenience commands)

## 🚀 Quick Start

### Using Docker (Recommended)

1. **Clone and setup**:
   ```bash
   git clone <repository-url>
   cd react-resume-website
   ```

2. **Generate SSL certificates**:
   ```bash
   make ssl
   # or
   npm run ssl:generate
   ```

3. **Start development environment**:
   ```bash
   make dev-build
   # or
   docker-compose up --build
   ```

4. **Access the application**:
   - Development: https://localhost:3000
   - Accept the self-signed certificate warning in your browser

### Available Make Commands

```bash
make help        # Show all available commands
make ssl         # Generate SSL certificates
make dev         # Start development environment
make dev-build   # Build and start development environment
make prod        # Start production environment
make prod-build  # Build and start production environment
make clean       # Clean up containers and volumes
make logs        # Show container logs
make shell       # Open shell in development container
```

### Manual Docker Commands

```bash
# Development
docker-compose up --build
docker-compose down

# Production
docker-compose -f docker-compose.prod.yml up --build
docker-compose -f docker-compose.prod.yml down

# View logs
docker-compose logs -f

# Shell access
docker-compose exec react-resume-dev sh
```

## 🏗 Project Structure

```
react-resume/
├── docker/                 # Docker configurations
│   └── nginx.conf          # Nginx configuration for production
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Basic UI elements
│   │   └── layout/        # Layout components
│   ├── sections/          # Main page sections
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── types/             # TypeScript type definitions
│   └── styles/            # Global styles
├── certificates/          # SSL certificates (auto-generated)
├── Dockerfile            # Multi-stage Docker build
├── docker-compose.yml    # Development environment
├── docker-compose.prod.yml # Production environment
└── Makefile             # Convenience commands
```

## 🎨 Customization

### Personal Information

Update your personal information in the data files:

1. Edit `src/data/personal.ts` - Personal details and contact info
2. Edit `src/data/experience.ts` - Work experience and education
3. Edit `src/data/skills.ts` - Technical skills and proficiencies
4. Edit `src/data/projects.ts` - Portfolio projects and demos

### Styling

The design system is built with Tailwind CSS:

- **Colors**: Modify `tailwind.config.js` for color scheme changes
- **Typography**: Fonts are configured in `src/styles/globals.css`
- **Components**: Reusable component styles in `src/styles/globals.css`

### Animations

Animation configurations are in `src/utils/animations.ts`:

- **Scroll Animations**: Intersection Observer based triggers
- **Hover Effects**: Micro-interactions for better UX
- **Page Transitions**: Smooth navigation between sections
- **Loading States**: Professional loading animations

## 🔧 Development

### Hot Reload

The development environment supports hot module replacement (HMR) through Docker volumes:

```bash
# Changes to src/ files will automatically reload
docker-compose up
```

### Adding Dependencies

```bash
# Add new package
docker-compose exec react-resume-dev npm install <package-name>

# Add dev dependency
docker-compose exec react-resume-dev npm install -D <package-name>
```

### Debugging

```bash
# View logs
make logs

# Shell into container
make shell

# Check container status
docker-compose ps
```

## 🚀 Production Deployment

### Docker Production Build

```bash
# Build and run production container
make prod-build

# Or manually
docker-compose -f docker-compose.prod.yml up --build
```

### Deployment Options

1. **Vercel/Netlify**: Push to Git repository with auto-deployment
2. **Docker Registry**: Push image to registry and deploy to cloud
3. **VPS/Cloud**: Deploy using docker-compose on server
4. **Kubernetes**: Use provided Dockerfile for k8s deployment

### SSL in Production

Replace self-signed certificates with proper SSL certificates:

```bash
# Place your certificates in certificates/ directory
certificates/
├── cert.pem    # Your SSL certificate
└── key.pem     # Your private key
```

## 🧪 Testing the Setup

1. **Start development server**:
   ```bash
   make dev-build
   ```

2. **Check HTTPS is working**:
   - Visit https://localhost:3000
   - Accept self-signed certificate
   - Verify page loads correctly

3. **Test hot reload**:
   - Edit any file in `src/`
   - Verify changes appear automatically

4. **Test production build**:
   ```bash
   make prod-build
   ```

## 📱 Browser Support

- Chrome (recommended for development)
- Firefox
- Safari
- Edge

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

1. **Port 3000 already in use**:
   ```bash
   docker-compose down
   # Change port in docker-compose.yml if needed
   ```

2. **SSL certificate errors**:
   ```bash
   make ssl  # Regenerate certificates
   ```

3. **Container build fails**:
   ```bash
   make clean  # Clean up and try again
   make dev-build
   ```

4. **Hot reload not working**:
   - Ensure file polling is enabled in vite.config.ts
   - Check Docker volume mounting

### Getting Help

- Check the logs: `make logs`
- Open an issue on GitHub
- Review Docker Compose configuration

## 🎯 Next Steps

After setup, customize the content in the data files and deploy to your preferred hosting platform. The containerized setup makes deployment consistent across environments.

---

# Component Flow & Architecture Diagram

## Application Structure

```
┌─────────────────────────────────────────────────────────────┐
│                        App.tsx                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                   Header.tsx                        │    │
│  │  [Logo] [Navigation Menu] [Theme Toggle]            │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                   Hero.tsx                          │    │
│  │  [Profile Image] [Animated Text] [CTA Buttons]      │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                   About.tsx                         │    │
│  │  [Bio Text] [Key Stats] [Download Resume]           │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                 Experience.tsx                      │    │
│  │  [Timeline] [Job Cards] [Expand Details]            │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                  Skills.tsx                         │    │
│  │  [Skill Categories] [Progress Bars] [Tech Icons]    │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                 Projects.tsx                        │    │
│  │  [Project Cards] [Image Gallery] [Live Demos]       │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                 Contact.tsx                         │    │
│  │  [Contact Form] [Social Links] [Location Info]      │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                   Footer.tsx                        │    │
│  │  [Copyright] [Quick Links] [Social Media]           │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Animation Flow

```
User Scroll Event
       ↓
Intersection Observer
       ↓
Section Enters Viewport
       ↓
Trigger Anime.js Animation
       ↓
┌─────────────────────────┐
│   Animation Types:      │
│                         │
│ • fadeInUp              │
│ • slideInLeft           │
│ • staggerChildren       │
│ • progressBar           │
│ • typeWriter            │
│ • scaleOnHover          │
└─────────────────────────┘
```

## Data Flow

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Static Data   │    │  User Actions   │    │   Animations    │
│                 │    │                 │    │                 │
│ • Personal Info │    │ • Scroll Events │    │ • Scroll Trigger│
│ • Experience    │────│ • Click Events  │────│ • Hover Effects │
│ • Skills        │    │ • Form Submit   │    │ • State Changes │
│ • Projects      │    │ • Navigation    │    │ • Loading States│
│ • Contact Info  │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Responsive Breakpoints

```
Mobile (< 640px)
├─ Single column layout
├─ Collapsed navigation
├─ Stacked components
└─ Touch-optimized interactions

Tablet (640px - 1024px)
├─ Two-column layout
├─ Horizontal navigation
├─ Grid-based sections
└─ Hover states enabled

Desktop (> 1024px)
├─ Multi-column layout
├─ Fixed navigation
├─ Advanced animations
└─ Full feature set
```

## Technology Integration

```
┌─────────────────┐
│      Vite       │ ← Build Tool & Dev Server
└─────────────────┘
         │
┌─────────────────┐
│   React 18      │ ← UI Framework
└─────────────────┘
         │
┌─────────────────┐
│   TypeScript    │ ← Type Safety
└─────────────────┘
         │
┌─────────────────┐
│  Tailwind CSS   │ ← Styling & Layout
└─────────────────┘
         │
┌─────────────────┐
│    Anime.js     │ ← Animations
└─────────────────┘
         │
┌─────────────────┐
│   HTTPS/SSL     │ ← Security
└─────────────────┘
```

---

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

---

# React Resume Website - Architecture & Technical Specifications

## Project Overview
A modern, professional single-page resume website built with React, TypeScript, and smooth animations using Anime.js. Features a professional blue/white corporate theme with SSL-enabled local development.

## Technology Stack

### Core Technologies
- **React 18**: Latest React with concurrent features and improved performance
- **TypeScript**: Type-safe development with enhanced IDE support
- **Vite**: Fast build tool with HMR and optimized bundling
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Anime.js**: Lightweight animation library for smooth interactions

### Development & Deployment
- **HTTPS/SSL**: Self-signed certificates for local development
- **ESLint + Prettier**: Code quality and formatting
- **PostCSS**: CSS processing and optimization
- **Vercel/Netlify Ready**: Pre-configured for easy deployment

## Project Structure

```
react-resume/
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── certificates/          # SSL certificates for local dev
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # Basic UI elements
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Input.tsx
│   │   ├── layout/          # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Container.tsx
│   │   └── animations/      # Animation wrappers
│   │       ├── FadeIn.tsx
│   │       ├── SlideUp.tsx
│   │       └── ScrollTrigger.tsx
│   ├── sections/            # Main page sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useScrollspy.ts
│   │   ├── useIntersection.ts
│   │   └── useAnimation.ts
│   ├── utils/               # Utility functions
│   │   ├── animations.ts
│   │   ├── constants.ts
│   │   └── helpers.ts
│   ├── types/               # TypeScript type definitions
│   │   ├── index.ts
│   │   └── components.ts
│   ├── styles/              # Global styles and themes
│   │   ├── globals.css
│   │   └── animations.css
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── certificates/            # SSL certificates
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## Design System

### Color Palette (Professional Blue/White Theme)
```css
Primary Colors:
- Blue Primary: #2563eb (blue-600)
- Blue Secondary: #1d4ed8 (blue-700)
- Blue Light: #dbeafe (blue-100)
- Blue Accent: #3b82f6 (blue-500)

Neutral Colors:
- White: #ffffff
- Gray Light: #f8fafc (slate-50)
- Gray Medium: #64748b (slate-500)
- Gray Dark: #334155 (slate-700)
- Text Dark: #0f172a (slate-900)
```

### Typography
- **Primary Font**: Inter (modern, professional)
- **Headings**: Font weights 600-800
- **Body Text**: Font weight 400-500
- **Code/Monospace**: JetBrains Mono

### Component Design Patterns
- **Cards**: White background with subtle shadows and hover effects
- **Buttons**: Primary blue with hover states and ripple animations
- **Forms**: Clean inputs with focus states and validation
- **Navigation**: Fixed header with smooth scroll indicators

## Animation Strategy

### Scroll-Triggered Animations
- **Intersection Observer**: Trigger animations when elements enter viewport
- **Staggered Animations**: Sequential animation of list items
- **Progress Indicators**: Animated skill bars and completion percentages

### Micro-Interactions
- **Hover Effects**: Subtle scale and color transitions
- **Button States**: Loading, success, and error animations
- **Form Feedback**: Real-time validation with smooth transitions

### Performance Considerations
- **Request Animation Frame**: Smooth 60fps animations
- **Will-Change Property**: Optimize expensive animations
- **Reduce Motion**: Respect user accessibility preferences

## Key Features & Sections

### 1. Hero/About Section
- Animated text introduction with typewriter effect
- Professional headshot with subtle hover animations
- Call-to-action buttons with ripple effects
- Scroll indicator with bounce animation

### 2. Experience Section
- Timeline layout with animated progression
- Company logos with hover effects
- Expandable job descriptions
- Date ranges with sliding animations

### 3. Skills Section
- Animated progress bars with percentage counters
- Skill categories with staggered reveals
- Interactive hover states showing proficiency details
- Technology icons with subtle animations

### 4. Projects Section
- Card-based layout with hover overlays
- Image galleries with smooth transitions
- Technology tags with color coding
- Live demo and code repository links

### 5. Contact Section
- Interactive contact form with validation
- Social media links with hover animations
- Email and phone with click-to-action
- Location map integration (optional)

## Technical Implementation Details

### SSL Configuration
```typescript
// vite.config.ts
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync('./certificates/key.pem'),
      cert: fs.readFileSync('./certificates/cert.pem'),
    },
    port: 3000,
  },
});
```

### Animation Utilities
```typescript
// utils/animations.ts
export const fadeInUp = {
  translateY: [30, 0],
  opacity: [0, 1],
  duration: 800,
  easing: 'easeOutCubic',
};

export const staggerAnimation = (delay: number) => ({
  ...fadeInUp,
  delay: delay * 100,
});
```

### Responsive Breakpoints
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'sm': '640px',   // Mobile landscape
      'md': '768px',   // Tablet
      'lg': '1024px',  // Desktop
      'xl': '1280px',  // Large desktop
      '2xl': '1536px', // Extra large
    },
  },
};
```

## Performance Optimization

### Build Optimization
- **Code Splitting**: Lazy loading of sections
- **Tree Shaking**: Remove unused code
- **Asset Optimization**: Image compression and modern formats
- **Bundle Analysis**: Monitor bundle size and dependencies

### Runtime Performance
- **Virtual Scrolling**: For large lists (if needed)
- **Intersection Observer**: Efficient scroll tracking
- **RAF Throttling**: Smooth scroll and resize handlers
- **Preloading**: Critical resources and fonts

## SEO & Accessibility

### SEO Features
- Meta tags and Open Graph data
- Structured data (JSON-LD)
- Sitemap generation
- Semantic HTML structure

### Accessibility Features
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Reduced motion support
- High contrast mode support

## Development Workflow

### Setup Commands
```bash
npm create vite@latest react-resume -- --template react-ts
cd react-resume
npm install tailwindcss animejs @types/animejs
npm run dev  # HTTPS development server
```

### Build & Deployment
```bash
npm run build      # Production build
npm run preview    # Preview production build
npm run deploy     # Deploy to hosting platform
```

## Testing Strategy
- **Unit Tests**: Component testing with Jest/Vitest
- **Integration Tests**: User interaction flows
- **Visual Tests**: Screenshot comparison
- **Performance Tests**: Lighthouse audits
- **Accessibility Tests**: axe-core integration

This architecture ensures a professional, performant, and maintainable resume website that showcases your skills effectively while providing an excellent user experience.
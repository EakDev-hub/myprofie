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
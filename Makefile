.PHONY: help install ssl dev dev-build prod prod-build clean logs shell test

# Default target
help:
	@echo "Available commands:"
	@echo "  install     - Install dependencies"
	@echo "  ssl         - Generate SSL certificates"
	@echo "  dev         - Start development environment"
	@echo "  dev-build   - Build and start development environment"
	@echo "  prod        - Start production environment"
	@echo "  prod-build  - Build and start production environment"
	@echo "  clean       - Clean up containers and volumes"
	@echo "  logs        - Show container logs"
	@echo "  shell       - Open shell in development container"
	@echo "  test        - Run tests"

# Install dependencies
install:
	npm install

# Generate SSL certificates
ssl:
	npm run ssl:generate

# Development environment
dev:
	docker-compose up

dev-build:
	docker-compose up --build

# Production environment
prod:
	docker-compose -f docker-compose.prod.yml up

prod-build:
	docker-compose -f docker-compose.prod.yml up --build

# Cleanup
clean:
	docker-compose down -v
	docker-compose -f docker-compose.prod.yml down -v
	docker system prune -f

# Show logs
logs:
	docker-compose logs -f

# Open shell in development container
shell:
	docker-compose exec react-resume-dev sh

# Run tests (when implemented)
test:
	docker-compose exec react-resume-dev npm test
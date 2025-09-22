#!/bin/bash

# Duvelnacht Deployment Script
# Usage: ./deploy.sh [development|production]

set -e

MODE=${1:-development}

echo "🔥 Deploying Duvelnacht in $MODE mode..."

# Build the Docker image
echo "📦 Building Docker image..."
docker build -t duvelnacht .

if [ "$MODE" = "production" ]; then
    echo "🚀 Starting production deployment with nginx..."
    docker-compose --profile production up -d
    echo "✅ Production deployment complete!"
    echo "🌐 Application available at: http://localhost"
    echo "📊 Health check: http://localhost/api/health"
else
    echo "🛠 Starting development deployment..."
    docker-compose up -d
    echo "✅ Development deployment complete!"
    echo "🌐 Application available at: http://localhost:3000"
    echo "📊 Health check: http://localhost:3000/api/health"
fi

echo ""
echo "🎭 Duvelnacht is now running!"
echo "   Where good beers meet bad influence."
echo ""
echo "📋 Useful commands:"
echo "   docker-compose logs -f        # View logs"
echo "   docker-compose down           # Stop services"
echo "   docker-compose restart       # Restart services"
echo ""

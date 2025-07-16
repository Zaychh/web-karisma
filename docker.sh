#!/bin/bash

case "$1" in
  up)
    echo "🔼 Starting containers..."
    docker-compose up -d --build
    ;;
  down)
    echo "🔽 Stopping containers..."
    docker-compose down
    ;;
  restart)
    echo "♻️ Restarting containers..."
    docker-compose down
    docker-compose up -d --build
    ;;
  logs)
    echo "📜 Showing logs..."
    docker-compose logs -f
    ;;
  ps)
    docker ps
    ;;
  *)
    echo "❓ Unknown command: $1"
    echo "Usage: ./docker.sh [up|down|restart|logs|ps]"
    ;;
esac

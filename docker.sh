#!/bin/bash

case "$1" in
  start)
    echo "🔼 Starting containers..."
    docker-compose up -d 
    ;;
  stop)
    echo "🔽 Stopping containers..."
    docker-compose down
    ;;
  restart)
    echo "♻️ Restarting Battle System, Master. Please wait..."
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
    echo "Usage: ./docker.sh [start|stop|restart|logs|ps]"
    ;;
esac

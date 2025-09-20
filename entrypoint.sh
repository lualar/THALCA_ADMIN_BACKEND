#!/bin/sh
# This script is the entrypoint for the container.
# It ensures the database is ready before applying migrations and starting the app.

set -e

# Wait for the database to be ready
echo "⏳ Waiting for database to be ready..."
until pg_isready -h db -p 5432 -U ${POSTGRES_USER}; do
  echo "Database is not ready yet - sleeping"
  sleep 2
done
echo "✅ Database is ready!"

# Apply database migrations
echo "🚀 Applying database migrations..."
npx prisma migrate deploy

echo "✅ Database migrations applied. Starting the application..."

# Execute the command passed to this script (our CMD from Dockerfile)
exec "$@"
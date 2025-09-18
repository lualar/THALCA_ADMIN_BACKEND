#!/bin/sh

echo "✅ Running database migrations..."

# Wait for PostgreSQL to be ready
# A loop to check if the database is up before proceeding
echo "⏳ Waiting for the database to be ready..."
until pg_isready -h db -p 5432 -U ${POSTGRES_USER}; do
  echo "The database is still not ready..."
  sleep 2
done
echo "✅ The database is ready!"

# Apply Prisma migrations
npx prisma migrate deploy --schema=./prisma/schema.prisma --url="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}"

echo "✅ Database migrations applied. Starting the application..."

# Start the Node.js application
exec npm run start:dev
#npx prisma migrate deploy
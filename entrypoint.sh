#!/bin/sh
# entrypoint.sh

set -e

# Wait for the PostgreSQL database to be available
host="db"
port="5432"

>&2 echo "Waiting for PostgreSQL at $host:$port..."

until pg_isready -h "$host" -p "$port" -U "$POSTGRES_USER"; do
  >&2 echo "PostgreSQL is unavailable - sleeping"
  sleep 1
done

>&2 echo "PostgreSQL is up - running migrations..."

# Apply pending migrations
npx prisma migrate deploy --schema=./prisma/schema.prisma

# Seed the database only if there are no records
npm run db:seed || true

>&2 echo "Migrations and seeding complete - executing command"
exec "$@"
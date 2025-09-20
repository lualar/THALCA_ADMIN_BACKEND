#!/bin/sh
# entrypoint.sh

set -e

# Lógica de espera a la base de datos
host="db"
port="5432"
cmd="npm run start:dev"

>&2 echo "Waiting for PostgreSQL at $host:$port..."

until pg_isready -h "$host" -U "$POSTGRES_USER"; do
  >&2 echo "PostgreSQL is unavailable - sleeping"
  sleep 1
done

>&2 echo "PostgreSQL is up - running migrations..."

# Aplicar las migraciones existentes. Esto no crea nuevas.
npx prisma migrate deploy

# Seed the database with initial data
>&2 echo "Applying database seed..."
npm run db:seed

>&2 echo "Migrations applied - executing command"
exec $cmd

# El resto de tu lógica de entrada, si la tuvieras
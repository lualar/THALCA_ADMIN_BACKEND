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

>&2 echo "PostgreSQL is up - executing command"
exec $cmd

# El resto de tu lógica de entrada, si la tuvieras
#!/bin/sh
# wait-for-db.sh

set -e

host="db"
port="5432"
cmd="npm run start:dev"

>&2 echo "Waiting for PostgreSQL at $host:$port..."

while ! nc -z $host $port; do
  >&2 echo "PostgreSQL is unavailable - sleeping"
  sleep 1
done

>&2 echo "PostgreSQL is up - executing command"
exec $cmd
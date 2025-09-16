#!/bin/bash

# Salir inmediatamente si un comando falla
set -e

# 1. Esperar a que la base de datos esté lista
# (Este es un simple bucle de espera, se puede usar una herramienta más robusta si es necesario)
echo "⏳ Esperando a que la base de datos esté lista..."
until PGPASSWORD=$POSTGRES_PASSWORD psql -h "db" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c '\q'; do
  >&2 echo "Postgres no está disponible todavía - esperando..."
  sleep 1
done
>&2 echo "✅ Postgres está listo y aceptando conexiones."

# 2. Ejecutar las migraciones de Prisma
echo "🚀 Ejecutando migraciones de la base de datos..."
npx prisma migrate deploy --schema=./prisma/schema.prisma

# 3. Generar el cliente de Prisma (por si acaso)
echo "⚙️ Generando cliente de Prisma..."
npx prisma generate --schema=./prisma/schema.prisma

# 4. Iniciar la aplicación principal
echo "🏁 Iniciando la aplicación..."
exec "$@"
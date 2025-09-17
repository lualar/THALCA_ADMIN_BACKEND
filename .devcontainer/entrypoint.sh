#!/bin/sh

# This script is the entrypoint for the THALCA Admin Backend container.
# It ensures all necessary setup tasks are completed before the application starts.

echo "✅ Running database migrations..."

# Apply database migrations using Prisma.
# The 'migrate deploy' command ensures that the database schema
# is up-to-date with the latest migrations files.
# This step is CRITICAL to prevent 'out of sync' errors between the app and the DB.
npx prisma migrate deploy  --preview-feature --schema=./prisma/schema.prisma --url="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}"

echo "✅ Database migrations applied. Starting the application..."

# Start the Node.js application in development mode.
# The 'npm run start:dev' command is defined in the package.json file.
# The application will now be running and ready to accept requests.
#npm run start:dev
exec "$@"
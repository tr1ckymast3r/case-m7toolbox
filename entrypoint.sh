#!/bin/sh
set -e

# Push Prisma schema to database (creates tables if not exist)
npx prisma db push --skip-generate

# Start Next.js server
exec node server.js

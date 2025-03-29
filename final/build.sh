#!/bin/bash

# Set environment to production
export NODE_ENV=production

# Install all dependencies including dev dependencies for build process
npm install

# Run the client build command
npx vite build

# Create the server's public directory
mkdir -p server/public

# Copy the client build to the server's public directory
cp -r client/dist/* server/public/

# Compile the custom production server
npx esbuild server/production.ts --platform=node --packages=external --bundle --format=esm --outfile=dist/production.js

echo "Build completed successfully!"
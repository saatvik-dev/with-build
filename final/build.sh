#!/bin/bash

# Set environment to production
export NODE_ENV=production

# Install all dependencies including dev dependencies for build process
npm install

# Run the build command for the client
npm run build

# Create the server's public directory
mkdir -p server/public

# Copy the client build to the server's public directory
cp -r client/dist/* server/public/

# Make sure vite is available for production
npm install vite --save

echo "Build completed successfully!"
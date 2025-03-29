#!/bin/bash

# Set environment to production
export NODE_ENV=production

# Install dependencies
npm install

# Run the build command
npm run build

echo "Build completed successfully!"
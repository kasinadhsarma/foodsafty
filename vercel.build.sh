#!/usr/bin/env bash
set -euo pipefail

echo "Starting build process..."

# Install dependencies
echo "Installing npm dependencies..."
npm install || { echo "npm install failed"; exit 1; }

# Build Next.js frontend
echo "Building Next.js frontend..."
npm run build || { echo "Next.js build failed"; exit 1; }

# Install Python dependencies for API
echo "Installing Python dependencies..."
cd backend/api || { echo "Failed to navigate to backend/api"; exit 1; }
pip install -r requirements.txt || { echo "pip install failed"; exit 1; }

echo "Build completed successfully"

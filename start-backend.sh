#!/bin/bash

echo "🚗 Starting HMI Backend Server..."
echo ""

cd backend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

echo "🚀 Starting server on port 3000..."
npm start


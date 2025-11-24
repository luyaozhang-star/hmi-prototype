#!/usr/bin/env bash

set -e  # Exit on error

echo "🖥️  Starting HMI Frontend..."
echo ""

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR/frontend"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed."
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed."
    echo "Please install Node.js (which includes npm) from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node --version) detected"
echo "✅ npm $(npm --version) detected"
echo ""

# Check if port 5173 is in use and try to free it
PORT=5173
PORT_IN_USE=false

# Try lsof first (macOS/Linux)
if command -v lsof &> /dev/null; then
    if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        PORT_IN_USE=true
        echo "⚠️  Port $PORT is already in use. Attempting to stop existing process..."
        lsof -ti:$PORT | xargs kill -9 2>/dev/null || echo "⚠️  Could not kill process automatically. Please stop it manually."
        sleep 1
    fi
# Fallback for systems without lsof (some Linux distros)
elif command -v netstat &> /dev/null; then
    if netstat -tuln 2>/dev/null | grep -q ":$PORT "; then
        PORT_IN_USE=true
        echo "⚠️  Port $PORT appears to be in use."
        echo "Please manually stop the process using port $PORT or the server may fail to start."
    fi
# Another fallback using ss (modern Linux)
elif command -v ss &> /dev/null; then
    if ss -tuln 2>/dev/null | grep -q ":$PORT "; then
        PORT_IN_USE=true
        echo "⚠️  Port $PORT appears to be in use."
        echo "Please manually stop the process using port $PORT or the server may fail to start."
    fi
fi

if [ "$PORT_IN_USE" = false ]; then
    echo "✅ Port $PORT is available"
fi
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
    echo "✅ Dependencies installed successfully"
    echo ""
fi

echo "🚀 Starting development server on port $PORT..."
echo "Press Ctrl+C to stop the server"
echo ""
npm run dev

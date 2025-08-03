#!/bin/bash

# SCT Trust Hospital - Test Runner Script
# Run comprehensive tests for authentication and appointment booking

echo "🧪 SCT Trust Hospital Test Runner"
echo "================================="
echo ""

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js to run tests."
    exit 1
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ .env file not found. Please create .env file with required variables."
    exit 1
fi

# Function to check if server is running
check_server() {
    local port=$1
    nc -z localhost $port 2>/dev/null
    return $?
}

# Check for running development server
SERVER_PORT=3000
if check_server 3000; then
    SERVER_PORT=3000
    echo "✅ Development server found on port 3000"
elif check_server 3001; then
    SERVER_PORT=3001
    echo "✅ Development server found on port 3001"
else
    echo "⚠️  No development server detected on ports 3000 or 3001"
    echo "🚀 Starting development server..."
    npm run dev &
    SERVER_PID=$!
    
    # Wait for server to start
    echo "⏳ Waiting for server to start..."
    for i in {1..30}; do
        if check_server 3000; then
            SERVER_PORT=3000
            break
        elif check_server 3001; then
            SERVER_PORT=3001
            break
        fi
        sleep 1
    done
    
    if ! check_server $SERVER_PORT; then
        echo "❌ Failed to start development server"
        exit 1
    fi
    
    echo "✅ Server started on port $SERVER_PORT"
fi

# Set the test URL
export TEST_BASE_URL="http://localhost:$SERVER_PORT"

echo ""
echo "🔧 Test Configuration:"
echo "   Server URL: $TEST_BASE_URL"
echo "   Test Directory: ./tests/"
echo ""

# Provide options for different test runs
if [ "$1" = "auth" ]; then
    echo "🔐 Running Authentication Tests Only..."
    node tests/auth-dashboard.test.js
elif [ "$1" = "e2e" ]; then
    echo "📅 Running E2E Appointment Tests Only..."
    node tests/appointment-e2e.test.js
elif [ "$1" = "db" ]; then
    echo "🗄️ Running Database Connection Test..."
    node scripts/test-mongodb.js
else
    echo "🏃 Running Complete Test Suite..."
    node tests/run-all-tests.js
fi

TEST_EXIT_CODE=$?

# Stop server if we started it
if [ ! -z "$SERVER_PID" ]; then
    echo ""
    echo "🛑 Stopping development server..."
    kill $SERVER_PID 2>/dev/null
fi

echo ""
echo "✨ Test run completed!"

# Show help information
if [ $TEST_EXIT_CODE -ne 0 ]; then
    echo ""
    echo "📚 Test Runner Usage:"
    echo "   ./test.sh          - Run all tests"
    echo "   ./test.sh auth     - Run authentication tests only"  
    echo "   ./test.sh e2e      - Run E2E appointment tests only"
    echo "   ./test.sh db       - Run database connection test only"
    echo ""
    echo "📋 Requirements:"
    echo "   • Node.js installed"
    echo "   • .env file configured"
    echo "   • MongoDB Atlas connection"
    echo "   • All npm dependencies installed"
fi

exit $TEST_EXIT_CODE
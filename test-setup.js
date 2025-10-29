// Simple test to verify the P2P Chat Application setup
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

console.log('Testing P2P Chat Application Setup...\n');

// Test 1: Check if all required modules are available
console.log('✓ Testing module availability:');
try {
  require('express');
  console.log('  ✓ Express.js');
} catch (e) {
  console.log('  ✗ Express.js - Missing');
}

try {
  require('socket.io');
  console.log('  ✓ Socket.io');
} catch (e) {
  console.log('  ✗ Socket.io - Missing');
}

try {
  require('cors');
  console.log('  ✓ CORS');
} catch (e) {
  console.log('  ✗ CORS - Missing');
}

try {
  require('uuid');
  console.log('  ✓ UUID');
} catch (e) {
  console.log('  ✗ UUID - Missing');
}

// Test 2: Check if server can start
console.log('\n✓ Testing server startup:');
try {
  const app = express();
  const server = http.createServer(app);
  const io = socketIo(server);
  
  server.listen(0, () => {
    console.log('  ✓ Server can start successfully');
    server.close();
  });
} catch (e) {
  console.log('  ✗ Server startup failed:', e.message);
}

// Test 3: Check WebRTC support (basic check)
console.log('\n✓ Testing WebRTC support:');
if (typeof window !== 'undefined' && window.RTCPeerConnection) {
  console.log('  ✓ WebRTC is supported in this environment');
} else {
  console.log('  ⚠ WebRTC support check requires browser environment');
  console.log('  ✓ This is expected when running in Node.js');
}

console.log('\n🎉 Setup test completed!');
console.log('\nTo start the application:');
console.log('1. Run: npm install');
console.log('2. Run: cd client && npm install');
console.log('3. Run: npm run dev');
console.log('\nThen open http://localhost:3000 in your browser');


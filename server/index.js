const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: [
      "http://localhost:30002",
      "https://p2pchat.luckyverse.club"
    ],
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Store active rooms and connections
const rooms = new Map();
const connections = new Map();

// STUN/TURN server configuration
const iceServers = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
  { urls: 'stun:stun2.l.google.com:19302' }
];

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/rooms', (req, res) => {
  const roomList = Array.from(rooms.keys()).map(roomId => ({
    id: roomId,
    participants: rooms.get(roomId).size,
    created: rooms.get(roomId).created
  }));
  res.json(roomList);
});

app.post('/api/rooms', (req, res) => {
  const roomId = uuidv4();
  rooms.set(roomId, new Set());
  res.json({ roomId });
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Join room
  socket.on('join-room', (data) => {
    const { roomId, username } = data;
    
    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Set());
    }
    
    const room = rooms.get(roomId);
    room.add(socket.id);
    connections.set(socket.id, { roomId, username });
    
    socket.join(roomId);
    socket.roomId = roomId;
    socket.username = username;
    
    console.log(`${username} joined room ${roomId}`);
    
    // Notify others in the room
    socket.to(roomId).emit('user-joined', {
      userId: socket.id,
      username: username,
      participants: room.size
    });
    
    // Send current participants to the new user
    socket.emit('room-joined', {
      roomId: roomId,
      participants: Array.from(room).map(id => ({
        userId: id,
        username: connections.get(id)?.username || 'Unknown'
      }))
    });
  });
  
  // WebRTC signaling
  socket.on('offer', (data) => {
    const { targetUserId, offer } = data;
    socket.to(targetUserId).emit('offer', {
      fromUserId: socket.id,
      offer: offer
    });
  });
  
  socket.on('answer', (data) => {
    const { targetUserId, answer } = data;
    socket.to(targetUserId).emit('answer', {
      fromUserId: socket.id,
      answer: answer
    });
  });
  
  socket.on('ice-candidate', (data) => {
    const { targetUserId, candidate } = data;
    socket.to(targetUserId).emit('ice-candidate', {
      fromUserId: socket.id,
      candidate: candidate
    });
  });
  
  // Chat messages (fallback for non-P2P)
  socket.on('message', (data) => {
    const { message } = data;
    socket.to(socket.roomId).emit('message', {
      fromUserId: socket.id,
      username: socket.username,
      message: message,
      timestamp: new Date().toISOString()
    });
  });
  
  // Disconnect handling
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    
    if (socket.roomId && rooms.has(socket.roomId)) {
      const room = rooms.get(socket.roomId);
      room.delete(socket.id);
      
      if (room.size === 0) {
        rooms.delete(socket.roomId);
      } else {
        // Notify remaining users
        socket.to(socket.roomId).emit('user-left', {
          userId: socket.id,
          username: socket.username,
          participants: room.size
        });
      }
    }
    
    connections.delete(socket.id);
  });
});

const PORT = process.env.PORT || 30001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`WebSocket server ready for P2P signaling`);
});


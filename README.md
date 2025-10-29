# P2P Chat Application

A peer-to-peer real-time chat application built with Node.js, React, and WebRTC. This application demonstrates direct peer-to-peer communication without relying on existing P2P libraries, using WebRTC for the actual P2P connections and a Node.js signaling server for connection establishment.

## Features

- **True P2P Communication**: Messages are sent directly between peers using WebRTC data channels
- **Real-time Messaging**: Instant message delivery with WebRTC
- **Room-based Chat**: Join existing rooms or create new ones
- **Modern UI**: Beautiful, responsive interface with glassmorphism design
- **Connection Status**: Real-time connection state monitoring
- **No Message Storage**: Messages are not stored on the server
- **STUN/TURN Support**: NAT traversal using Google's STUN servers

## Architecture

### Backend (Node.js)
- **Express Server**: REST API for room management
- **Socket.io**: WebSocket signaling server for WebRTC offer/answer exchange
- **Room Management**: Create and manage chat rooms
- **ICE Candidate Exchange**: Facilitates P2P connection establishment

### Frontend (React + TypeScript)
- **WebRTC Service**: Manages peer connections and data channels
- **React Components**: Modular UI components for chat interface
- **Real-time Updates**: Live connection status and participant management
- **Responsive Design**: Works on desktop and mobile devices

## How It Works

1. **Connection**: Users connect to the signaling server
2. **Room Join**: Users join a room or create a new one
3. **P2P Establishment**: WebRTC peer connections are established between users
4. **Data Channels**: Messages are sent through WebRTC data channels
5. **Direct Communication**: All chat messages flow directly between peers

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Modern web browser with WebRTC support

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd p2p-chat-app
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   npm install
   
   # Install client dependencies
   cd client
   npm install
   cd ..
   ```

3. **Start the application**
   ```bash
   # Start both server and client
   npm run dev
   
   # Or start them separately:
   # Terminal 1: Start server
   npm run server
   
   # Terminal 2: Start client
   npm run client
   ```

## Usage

1. **Open the application** in your browser (usually `http://localhost:3000`)
2. **Enter your username** and click "Connect"
3. **Join a room** by entering a room ID, or **create a new room**
4. **Start chatting** - messages are sent directly between peers!

## API Endpoints

### Server API
- `GET /api/health` - Server health check
- `GET /api/rooms` - List all active rooms
- `POST /api/rooms` - Create a new room

### WebSocket Events
- `join-room` - Join a chat room
- `offer` - WebRTC offer exchange
- `answer` - WebRTC answer exchange
- `ice-candidate` - ICE candidate exchange
- `message` - Chat message (fallback)

## Configuration

### STUN/TURN Servers
The application uses Google's public STUN servers by default. For production use, consider:
- Adding TURN servers for better NAT traversal
- Using your own STUN/TURN infrastructure
- Implementing authentication for TURN servers

### Environment Variables
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment mode

## Browser Support

- Chrome 56+
- Firefox 52+
- Safari 11+
- Edge 79+

## Security Considerations

- Messages are not encrypted in this implementation
- Consider adding end-to-end encryption for production use
- Implement proper authentication and authorization
- Use HTTPS in production environments

## Development

### Project Structure
```
p2p-chat-app/
├── server/
│   └── index.js          # Express server and Socket.io
├── client/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── services/     # WebRTC service
│   │   └── App.tsx       # Main app component
│   └── package.json
├── package.json          # Root package.json
└── README.md
```

### Available Scripts
- `npm start` - Start the server
- `npm run dev` - Start both server and client
- `npm run server` - Start server only
- `npm run client` - Start client only
- `npm run build` - Build client for production

## Troubleshooting

### Connection Issues
- Ensure both server and client are running
- Check firewall settings
- Verify STUN server accessibility
- Check browser console for WebRTC errors

### P2P Connection Fails
- Try refreshing the page
- Check if both users are in the same room
- Verify WebRTC support in browser
- Check network configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Acknowledgments

- WebRTC for peer-to-peer communication
- Socket.io for signaling
- React for the frontend framework
- Express.js for the backend server


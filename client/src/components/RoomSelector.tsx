import React, { useState } from 'react';
import './RoomSelector.css';

interface RoomSelectorProps {
  onJoinRoom: (roomId: string, username: string) => void;
  onCreateRoom: (username: string) => void;
  onConnect: () => void;
  connectionState: string;
  error: string;
}

const RoomSelector: React.FC<RoomSelectorProps> = ({
  onJoinRoom,
  onCreateRoom,
  onConnect,
  connectionState,
  error
}) => {
  const [username, setUsername] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const handleConnect = async () => {
    if (!username.trim()) {
      alert('Please enter a username');
      return;
    }
    
    setIsConnecting(true);
    try {
      await onConnect();
    } finally {
      setIsConnecting(false);
    }
  };

  const handleJoinRoom = () => {
    if (!username.trim() || !roomId.trim()) {
      alert('Please enter both username and room ID');
      return;
    }
    onJoinRoom(roomId.trim(), username.trim());
  };

  const handleCreateRoom = () => {
    if (!username.trim()) {
      alert('Please enter a username');
      return;
    }
    onCreateRoom(username.trim());
  };

  const handleUsernameKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleConnect();
    }
  };

  const handleRoomIdKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleJoinRoom();
    }
  };

  const getConnectionStatusColor = () => {
    switch (connectionState) {
      case 'connected': return '#4CAF50';
      case 'connecting': return '#FF9800';
      default: return '#F44336';
    }
  };

  return (
    <div className="room-selector">
      <div className="connection-section">
        <h2>Connect to Server</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleUsernameKeyPress}
            className="username-input"
          />
          <button
            onClick={handleConnect}
            disabled={isConnecting || connectionState === 'connected'}
            className="connect-button"
          >
            {isConnecting ? 'Connecting...' : 'Connect'}
          </button>
        </div>
        <div 
          className="connection-status"
          style={{ color: getConnectionStatusColor() }}
        >
          Status: {connectionState.toUpperCase()}
        </div>
      </div>

      {connectionState === 'connected' && (
        <div className="room-section">
          <h2>Join or Create Room</h2>
          
          <div className="join-room">
            <h3>Join Existing Room</h3>
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                onKeyDown={handleRoomIdKeyPress}
                className="room-input"
              />
              <button
                onClick={handleJoinRoom}
                className="join-button"
              >
                Join Room
              </button>
            </div>
          </div>

          <div className="create-room">
            <h3>Create New Room</h3>
            <button
              onClick={handleCreateRoom}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCreateRoom();
                }
              }}
              className="create-button"
            >
              Create New Room
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="info-section">
        <h3>How it works:</h3>
        <ul>
          <li>Connect to the signaling server</li>
          <li>Join an existing room or create a new one</li>
          <li>Establish peer-to-peer connections with other users</li>
          <li>Chat messages are sent directly between peers using WebRTC</li>
          <li>No messages are stored on the server</li>
        </ul>
      </div>
    </div>
  );
};

export default RoomSelector;


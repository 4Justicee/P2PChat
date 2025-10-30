import React, { useState, useEffect } from 'react';
import { WebRTCService, Message, Participant } from '../services/WebRTCService';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ConnectionStatus from './ConnectionStatus';
import RoomSelector from './RoomSelector';
import './ChatApp.css';

const ChatApp: React.FC = () => {
  const [webrtcService, setWebrtcService] = useState<WebRTCService | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [connectionState, setConnectionState] = useState<string>('disconnected');
  const [error, setError] = useState<string>('');
  const [isInRoom, setIsInRoom] = useState<boolean>(false);
  const [currentRoomId, setCurrentRoomId] = useState<string>('');
  const [currentUsername, setCurrentUsername] = useState<string>('');

  useEffect(() => {
    const service = new WebRTCService({
      onMessage: (message: Message) => {
        setMessages(prev => [...prev, message]);
      },
      onParticipantJoined: (participant: Participant) => {
        setParticipants(prev => [...prev, participant]);
      },
      onParticipantLeft: (participant: Participant) => {
        setParticipants(prev => prev.filter(p => p.userId !== participant.userId));
      },
      onConnectionStateChange: (state: string) => {
        setConnectionState(state);
      },
      onError: (error: string) => {
        setError(error);
      }
    });

    setWebrtcService(service);

    return () => {
      service.disconnect();
    };
  }, []);

  const handleConnect = async () => {
    if (!webrtcService) return;
    
    try {
      await webrtcService.connect();
      setError('');
    } catch (err) {
      setError('Failed to connect to server');
    }
  };

  const handleJoinRoom = async (roomId: string, username: string) => {
    if (!webrtcService) return;
    
    try {
      await webrtcService.joinRoom(roomId, username);
      setCurrentRoomId(roomId);
      setCurrentUsername(username);
      setIsInRoom(true);
      setError('');
    } catch (err) {
      setError('Failed to join room');
    }
  };

  const handleCreateRoom = async (username: string) => {
    if (!webrtcService) return;
    
    try {
      const roomId = await webrtcService.createRoom();
      await webrtcService.joinRoom(roomId, username);
      setCurrentRoomId(roomId);
      setCurrentUsername(username);
      setIsInRoom(true);
      setError('');
    } catch (err) {
      setError('Failed to create room');
    }
  };

  const handleSendMessage = (message: string) => {
    if (webrtcService && message.trim()) {
      webrtcService.sendMessage(message.trim());
    }
  };

  const handleLeaveRoom = () => {
    if (webrtcService) {
      webrtcService.disconnect();
      setWebrtcService(new WebRTCService({
        onMessage: (message: Message) => {
          setMessages(prev => [...prev, message]);
        },
        onParticipantJoined: (participant: Participant) => {
          setParticipants(prev => [...prev, participant]);
        },
        onParticipantLeft: (participant: Participant) => {
          setParticipants(prev => prev.filter(p => p.userId !== participant.userId));
        },
        onConnectionStateChange: (state: string) => {
          setConnectionState(state);
        },
        onError: (error: string) => {
          setError(error);
        }
      }));
    }
    setMessages([]);
    setParticipants([]);
    setIsInRoom(false);
    setCurrentRoomId('');
    setCurrentUsername('');
    setConnectionState('disconnected');
  };

  if (!isInRoom) {
    return (
      <div className="chat-app connection-screen">
        <div className="chat-header">
          <h1>P2P Chat Application</h1>
          <p>Peer-to-Peer Real-time Communication using WebRTC</p>
        </div>
        <RoomSelector
          onJoinRoom={handleJoinRoom}
          onCreateRoom={handleCreateRoom}
          onConnect={handleConnect}
          connectionState={connectionState}
          error={error}
        />
      </div>
    );
  }

  return (
    <div className="chat-app">
      <div className="chat-header">
        <h1>P2P Chat - Room: {currentRoomId}</h1>
        <div className="header-info">
          <span className="username">Welcome, {currentUsername}!</span>
          <button onClick={handleLeaveRoom} className="leave-button">
            Leave Room
          </button>
        </div>
      </div>
      
      <div className="chat-container">
        <div className="chat-sidebar">
          <ConnectionStatus 
            state={connectionState}
            participantCount={participants.length + 1}
          />
          <div className="participants">
            <h3>Participants ({participants.length + 1})</h3>
            <div className="participant-list">
              <div className="participant local">
                {currentUsername} (You)
              </div>
              {participants.map(participant => (
                <div key={participant.userId} className="participant">
                  {participant.username}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="chat-main">
          <MessageList messages={messages} currentUserId={webrtcService?.getConnectionState() || 'disconnected'} />
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </div>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
};

export default ChatApp;

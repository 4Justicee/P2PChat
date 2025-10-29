import React from 'react';
import { Message } from '../services/WebRTCService';
import './MessageList.css';

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUserId }) => {
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <div className="empty-messages">
          <p>No messages yet. Start a conversation!</p>
        </div>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.isLocal ? 'local' : 'remote'}`}
          >
            <div className="message-header">
              <span className="username">
                {message.username}
                {message.isLocal && ' (You)'}
              </span>
              <span className="timestamp">
                {formatTime(message.timestamp)}
              </span>
            </div>
            <div className="message-content">
              {message.message}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MessageList;


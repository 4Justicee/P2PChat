import React from 'react';
import './ConnectionStatus.css';

interface ConnectionStatusProps {
  state: string;
  participantCount: number;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ state, participantCount }) => {
  const getStatusColor = () => {
    switch (state) {
      case 'connected': return '#4CAF50';
      case 'connecting': return '#FF9800';
      case 'disconnected': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const getStatusText = () => {
    switch (state) {
      case 'connected': return 'P2P Connected';
      case 'connecting': return 'Connecting...';
      case 'disconnected': return 'Disconnected';
      default: return 'Unknown';
    }
  };

  return (
    <div className="connection-status">
      <div className="status-indicator">
        <div 
          className="status-dot"
          style={{ backgroundColor: getStatusColor() }}
        />
        <span className="status-text">{getStatusText()}</span>
      </div>
      <div className="participant-count">
        {participantCount} participant{participantCount !== 1 ? 's' : ''}
      </div>
    </div>
  );
};

export default ConnectionStatus;


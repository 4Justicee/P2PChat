import React from 'react';
import './ConnectionStatus.css';

interface ConnectionStatusProps {
  state: string;
  participantCount: number;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ state, participantCount }) => {
  // Show "Waiting for..." if only 1 participant (alone in room)
  const isAlone = participantCount === 1;
  
  const getStatusColor = () => {
    if (isAlone) return '#FFD700'; // Yellow for "Waiting for..."
    switch (state) {
      case 'connected': return '#2196F3'; // Blue for "Connected"
      case 'connecting': return '#2196F3'; // Blue for "Connected"
      case 'disconnected': return '#F44336';
      default: return '#FFD700';
    }
  };

  const getStatusText = () => {
    if (isAlone) return 'Waiting for...';
    switch (state) {
      case 'connected': return 'Connected';
      case 'connecting': return 'Connected';
      case 'disconnected': return 'Disconnected';
      default: return 'Connected';
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


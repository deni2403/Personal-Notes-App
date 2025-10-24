import React from 'react';

function LoadingIndicator({ text = 'Loading...' }) {
  return (
    <div className="loading-indicator">
      <div className="spinner"></div>
      <p>{text}</p>
    </div>
  );
}

export default LoadingIndicator;
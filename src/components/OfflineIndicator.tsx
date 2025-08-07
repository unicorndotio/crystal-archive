import React from 'react';

export function OfflineIndicator() {
  return (
    <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
      <p>You are currently offline. Some features may not be available.</p>
    </div>
  );
}

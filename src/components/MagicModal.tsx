import React from 'react';

interface MagicModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function MagicModal({ isOpen, onClose, children }: MagicModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} // Close when clicking outside the modal content
    >
      <div
        className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing modal
      >
        <button
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors duration-300"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}

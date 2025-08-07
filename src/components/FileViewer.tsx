import React from 'react';
import { FileRecord } from '../services/database';
import { searchService } from '../services/searchService';

interface FileViewerProps {
  file: FileRecord | null;
  searchQuery: string;
  onClose: () => void;
}

export const FileViewer: React.FC<FileViewerProps> = ({ file, searchQuery, onClose }) => {
  if (!file) {
    return null;
  }

  const highlightedContent = searchQuery && file.content
    ? searchService.highlight(file.content, searchQuery.split(' '))
    : file.content;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/10 backdrop-blur-xl rounded-lg shadow-xl w-full max-w-3xl h-full max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
      <div className="flex justify-between items-center p-4 border-b border-white/20">
          <h2 className="text-xl font-semibold text-white truncate">{file.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div className="p-4 flex-grow overflow-y-auto text-white/80 text-sm leading-relaxed">
          {file.content ? (
            <div dangerouslySetInnerHTML={{ __html: highlightedContent || '' }} />
          ) : (
            <p>No content available for this file type or file is still processing.</p>
          )}
        </div>
      </div>
    </div>
  );
};

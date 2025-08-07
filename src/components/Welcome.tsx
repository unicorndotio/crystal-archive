import React, { useState } from 'react';
import { FileUpload } from "./FileUpload";
import { MagicModal } from "./MagicModal";

export function Welcome({ onFileUpload }: { onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void; }) {
  const [showFormatsModal, setShowFormatsModal] = useState(false);

  const acceptedFormats = [
    ".txt", ".pdf", ".docx", ".doc",
  ];

  return (
    <div className="rounded-3xl p-[2px] bg-gradient-to-b from-white/20 to-white/5">
      <main className="w-full h-full rounded-[1.4rem] bg-white/10 backdrop-blur-xl flex flex-col items-center text-center p-6 sm:p-8 md:p-10 shadow-2xl">
        <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/50"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">Welcome to Crystal Archive</h2>
        <p className="max-w-xl text-gray-300 leading-relaxed mb-8">
          Your mystical document sanctuary. Peer through the crystal to find exactly what you seek. Upload, organize, and search through your documents with magical clarity. All your scrolls remain safely within your realm.
        </p>
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <FileUpload onFileUpload={onFileUpload}>
            <button className="w-full sm:w-auto bg-white hover:bg-gray-200 text-[#3b2a7c] font-semibold py-3 px-8 rounded-xl transition-colors duration-300 shadow-lg">
              Cast your first scroll into the crystal
            </button>
          </FileUpload>
          <button
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-3 px-8 rounded-xl transition-colors duration-300"
            onClick={() => setShowFormatsModal(true)}
          >
            Discover the enchanted formats
          </button>
        </div>
      </main>
      <MagicModal isOpen={showFormatsModal} onClose={() => setShowFormatsModal(false)}>
        <h3 className="text-2xl font-bold text-white mb-4">Enchanted Formats</h3>
        <p className="mb-2 text-gray-300">Supported formats:</p>
        <ul className="list-disc list-inside text-gray-300">
          {acceptedFormats.map((format, index) => (
            <li key={index}>{format}</li>
          ))}
        </ul>
      </MagicModal>
    </div>
  );
}


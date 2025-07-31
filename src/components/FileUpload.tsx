import React from 'react';

interface FileUploadProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
}

export function FileUpload({ onFileUpload, children }: FileUploadProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      {children}
      <input
        type="file"
        multiple
        ref={fileInputRef}
        onChange={onFileUpload}
        style={{ display: 'none' }}
      />
    </div>
  );
}

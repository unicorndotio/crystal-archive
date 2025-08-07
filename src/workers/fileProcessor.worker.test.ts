import { describe, it, expect, mock } from 'bun:test';

// Mock the dependencies of the worker
mock.module('pdfjs-dist', () => ({
  GlobalWorkerOptions: {},
  getDocument: () => ({ promise: Promise.resolve({ numPages: 0 }) })
}));
mock.module('mammoth', () => ({ default: { extractRawText: () => Promise.resolve({ value: '' }) } }));

// Mock the global scope for the worker
global.self = global;

describe('fileProcessor.worker.ts', () => {
  it('should process a text file and post a message', async () => {
    // Mock postMessage
    global.postMessage = mock((message) => {});

    // Dynamically import the worker script to execute its code
    await import('../../public/fileProcessor.worker.ts');

    const fileData = new TextEncoder().encode('This is a test.');
    const event = {
      data: { fileData, fileType: 'text/plain', fileId: '1' },
    };

    // Trigger the onmessage handler
    if (self.onmessage) {
      await self.onmessage(event as MessageEvent);
    }

    // Check if postMessage was called
    expect(global.postMessage).toHaveBeenCalled();
  });
});

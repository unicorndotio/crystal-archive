# AI Agent Guide - Privacy-First Local File Search

This document serves as a quick reference for the Gemini agent regarding the
`privacy-first-local-file-search` project.

## 1. Project Overview

- **Project Name**: Privacy-First Local File Search
- **Purpose**: A privacy-focused, client-side file upload and search
  application that runs entirely in the browser. All file processing, storage, and
  search happens locally on the user's device.
- **Current Status**: Core features are implemented, including file upload, client-side text extraction for TXT, PDF, and DOCX files, local indexing with MiniSearch, and a functional UI with search capabilities.

## 2. Key Technologies

- **Runtime & Tooling**: Bun (v1.0+)
- **UI Framework**: React (v18+) with TypeScript
- **Storage**: IndexedDB (via `Dexie.js`) for local storage of file metadata and content.
- **Search**: `MiniSearch` for client-side full-text search.
- **File Processing**:
    - **Web Workers**: To handle file processing in the background without blocking the UI.
    - **`pdfjs-dist`**: For extracting text from PDF files.
    - **`mammoth`**: For extracting text from DOCX files.
- **PWA**: Uses a Service Worker for offline capabilities.

## 3. Project Structure Highlights

- `src/`: Main application source code.
  - `src/App.tsx`: The main React component, managing state and orchestrating UI components.
  - `src/components/`: Reusable React components (e.g., `FileUpload`, `SearchBar`, `SearchResults`).
  - `src/services/`: Contains the logic for database interactions (`database.ts`) and the search service (`searchService.ts`).
  - `public/fileProcessor.worker.ts`: The web worker script responsible for file text extraction.
- `public/`: Static assets, including the PWA manifest and service worker.
- `docs/`: Project documentation, including the PRD, README, and standards guides.

## 4. Operational Details

- **No Backend**: This is a 100% client-side application. There is no server-side component, API, or database to manage.
- **Starting the Application (Development)**: `bun dev`
- **Building for Production**: `bun run build`

## 5. Testing Procedures

- **Run All Tests**: `bun test` (as defined in `package.json`).

## 6. Important Considerations

- **Privacy-First Architecture**: The core principle is that no user data ever leaves the browser. All operations must adhere to this.
- **Asynchronous Operations**: The app relies heavily on asynchronous operations (File API, IndexedDB, Web Workers). Code should handle promises and async/await correctly.
- **Browser Compatibility**: While targeting modern browsers, be mindful of API support (e.g., Web Workers, IndexedDB, File API).
- **State Management**: The application uses React's built-in state management (`useState`, `useCallback`). Changes should be consistent with this pattern.

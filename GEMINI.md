# Privacy-First Local File Search - To-Do List

This document outlines the tasks to be completed for the Privacy-First Local
File Search application, based on the Product Requirements Document (@PRD.md).

## Core Implementation Tasks

### Project Setup & Storage

- [x] Create React app with Bun: `bun init`
- [ ] Install dependencies: `bun add dexie minisearch pdfjs-dist mammoth`
- [ ] Set up IndexedDB schema with Dexie
- [ ] Implement basic file upload with local storage

### Client-Side File Processing

- [ ] Implement Web Worker for file processing (`fileProcessor.worker.ts`)
- [ ] Handle text/plain file type for text extraction
- [ ] Handle application/pdf file type for text extraction using `pdfjsLib`
- [ ] Handle
      application/vnd.openxmlformats-officedocument.wordprocessingml.document
      file type for text extraction using `mammoth`

### Local Search Implementation (MiniSearch)

- [ ] Initialize `MiniSearch` with `name` and `content` fields for indexing
- [ ] Implement `indexFile` to add files to the search engine incrementally
- [ ] Implement `removeFile` to discard files from the index
- [ ] Implement `search` function with `limit`, `prefix`, `fuzzy`, and `boost`
      options
- [ ] Implement `getSuggestions` for auto-suggestions
- [ ] Implement `highlightMatches` for better UX

### UI/UX & PWA Features

- [ ] Create Main App Component (`App.tsx`)
- [ ] Implement `handleFileUpload` to process uploaded files using the web
      worker
- [ ] Implement `handleSearch` for real-time search with debouncing
- [ ] Develop `Header` component
- [ ] Develop `FileUpload` component with drag-and-drop
- [ ] Develop `SearchBar` component
- [ ] Develop `SearchResults` component
- [ ] Develop `PrivacyStatus` component

# Privacy-First Local File Search - To-Do List

This document outlines the tasks to be completed for the Privacy-First Local
File Search application, based on the Product Requirements Document (<!-- Import failed: PRD.md). - Only .md files are supported -->

## Core Implementation Tasks

### Project Setup & Storage

- [x] Create React app with Bun: `bun init`
- [x] Install dependencies: `bun add dexie minisearch pdfjs-dist mammoth`
- [x] Set up IndexedDB schema with Dexie
- [x] Implement basic file upload with local storage

### Client-Side File Processing

- [x] Implement Web Worker for file processing (`fileProcessor.worker.ts`)
- [x] Handle text/plain file type for text extraction
- [x] Handle application/pdf file type for text extraction using `pdfjsLib`
- [x] Handle
      application/vnd.openxmlformats-officedocument.wordprocessingml.document
      file type for text extraction using `mammoth`

### Local Search Implementation (MiniSearch)

- [x] Initialize `MiniSearch` with `name` and `content` fields for indexing
- [x] Implement `indexFile` to add files to the search engine incrementally
- [x] Implement `removeFile` to discard files from the index
- [x] Implement `search` function with `limit`, `prefix`, `fuzzy`, and `boost`
      options
- [x] Implement `getSuggestions` for auto-suggestions
- [x] Implement `highlightMatches` for better UX

### UI/UX & PWA Features

- [x] Create Main App Component (`App.tsx`)
- [x] Implement `handleFileUpload` to process uploaded files using the web
      worker
- [x] Implement `handleSearch` for real-time search with debouncing
- [x] Develop `Header` component
- [x] Develop `FileUpload` component with drag-and-drop
- [x] Develop `SearchBar` component
- [x] Develop `SearchResults` component
- [x] Develop `PrivacyStatus` component


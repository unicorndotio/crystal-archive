# Privacy-First Local File Search

This project is a privacy-focused, client-side file search application that runs entirely in the browser. All file processing, storage, and search happens locally on the user's device, ensuring complete data privacy.

This project demonstrates the power of modern browser APIs for building powerful, offline-first, and privacy-preserving web applications.

## Core Features

- **100% Client-Side Processing**: All text extraction from files (PDF, DOCX, TXT) happens directly in your browser.
- **Local Storage**: Files and their extracted content are stored securely in your browser's IndexedDB. No data is ever sent to a server.
- **Offline-First Search**: A powerful full-text search engine (MiniSearch) runs locally, allowing you to search your files even without an internet connection.
- **Privacy by Design**: Zero data collection, zero analytics, zero tracking. Your files are your own.
- **Progressive Web App (PWA)**: The application is installable and works offline, providing a native-app-like experience.

## Technology Stack

This project is built with a modern, browser-first technology stack, with [Bun](https://bun.sh) as the all-in-one toolkit.

- **Runtime & Tooling**: Bun (runtime, bundler, package manager, test runner)
- **Framework**: React 18 with TypeScript
- **Storage**: IndexedDB with [Dexie.js](https://dexie.org/) for a developer-friendly API.
- **Search**: [MiniSearch](https://github.com/lucaong/minisearch) for a lightweight and efficient client-side search index.
- **File Processing**:
    - Web Workers for non-blocking background processing.
    - [PDF.js](https://mozilla.github.io/pdf.js/) for PDF text extraction.
    - [Mammoth.js](https://github.com/mwilliamson/mammoth.js) for `.docx` text extraction.
- **PWA**: A custom Service Worker for offline capabilities.

## Getting Started

### Prerequisites

Ensure you have [Bun](https://bun.sh/docs/installation) installed on your system.

### Installation

To install the dependencies, run:

```bash
bun install
```

### Development

To start the development server with hot reloading:

```bash
bun dev
```

### Testing

To run the test suite:

```bash
bun test
```

### Production Build

To create a production-ready build of the static assets:

```bash
bun run build
```

## Project Status & Roadmap

This repository contains the core implementation of the Privacy-First Local File Search application. For a detailed list of completed tasks, ongoing work, and future enhancements, please see the project's to-do list in [GEMINI.md](./../GEMINI.md) and the [Product Requirements Document](./PRD.md).

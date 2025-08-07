# Tech Stack

> Version: 1.0.0 Last Updated: 2025-08-07

## Context

This document outlines the technology stack for the Privacy-First Local File Search application.

## Core Client-Side Technologies

### Runtime & Tooling

- **Toolkit:** Bun
- **Version:** 1.0+

### Application Framework

- **Framework:** React with TypeScript
- **Version:** 18.0+

### Client-Side Storage & Search

- **Database:** IndexedDB
- **Wrapper:** Dexie.js
- **Search Engine:** MiniSearch

### File Processing

- **Background Processing:** Web Workers
- **PDF Extraction:** `pdfjs-dist`
- **DOCX Extraction:** `mammoth`

## Development & Deployment

### CI/CD Pipeline

- **Platform:** GitHub Actions (or similar)
- **Process:** On push to the main branch, run tests, build static assets, and deploy.

### Hosting

- **Type:** Static Site Hosting
- **Examples:** Vercel, Netlify, GitHub Pages

---

_This stack is chosen to support a fully client-side, privacy-preserving application._

import { useState, useEffect, useCallback } from "react";
import { db, type FileRecord } from "./services/database";
import { searchService } from "./services/searchService";
import type { SearchResult } from "minisearch";
import { Header } from "./components/Header";
import { FileUpload } from "./components/FileUpload";
import { SearchBar } from "./components/SearchBar";
import { SearchResults } from "./components/SearchResults";
import { PrivacyStatus } from "./components/PrivacyStatus";
import "./index.css";
const fileProcessorWorker = new Worker("/fileProcessor.worker.ts", { type: "module" });

export function App() {
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [processingStatus, setProcessingStatus] = useState<Record<string, string>>({});
  const [isIndexing, setIsIndexing] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const updateFileInStateAndIndex = useCallback(async (file: FileRecord) => {
    setFiles(prevFiles => prevFiles.map(f => (f.id === file.id ? file : f)));
    if (file.content) {
      await searchService.indexFile(file);
      setProcessingStatus(prev => ({ ...prev, [file.id]: "Processed" }));
    }
  }, []);

  useEffect(() => {
    const handleWorkerMessage = async (e: MessageEvent) => {
      const { type, fileId, content, error } = e.data;
      const file = files.find(f => f.id === fileId);

      if (file) {
        if (type === "processed") {
          const updatedFile = { ...file, content };
          await db.files.update(fileId, { content });
          await updateFileInStateAndIndex(updatedFile);
        } else if (type === "error") {
          console.error(`Error processing file ${fileId}:`, error);
          setProcessingStatus(prev => ({ ...prev, [fileId]: `Error: ${error}` }));
        }
      }
    };

    fileProcessorWorker.addEventListener("message", handleWorkerMessage);
    return () => {
      fileProcessorWorker.removeEventListener("message", handleWorkerMessage);
    };
  }, [files, updateFileInStateAndIndex]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles) return;

    const newFiles: FileRecord[] = [];
    for (const file of Array.from(uploadedFiles)) {
      const fileId = crypto.randomUUID();
      const newFile: FileRecord = {
        id: fileId, name: file.name, type: file.type, size: file.size,
        content: "", uploadedAt: new Date(), lastModified: new Date(file.lastModified),
      };
      await db.files.add(newFile);
      newFiles.push(newFile);
      fileProcessorWorker.postMessage({ file, fileId });
      setProcessingStatus(prev => ({ ...prev, [fileId]: "Processing..." }));
    }
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleDeleteFile = async (fileId: string) => {
    await db.files.delete(fileId);
    await searchService.removeFile(fileId);
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      const results = searchService.search(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const loadFilesAndBuildIndex = async () => {
      setIsIndexing(true);
      const allFiles = await db.files.toArray();
      setFiles(allFiles);

      const status: Record<string, string> = {};
      const processedFiles = allFiles.filter(file => {
        const hasContent = !!file.content;
        status[file.id] = hasContent ? "Processed" : "Pending";
        return hasContent;
      });
      setProcessingStatus(status);

      await searchService.indexAllFiles(processedFiles);
      setIsIndexing(false);
    };
    loadFilesAndBuildIndex();
  }, []);

  const displayedFiles = searchQuery ? searchResults.map(r => files.find(f => f.id === r.id)).filter(Boolean) as FileRecord[] : files;

  return (
    <div className="max-w-4xl mx-auto p-8 font-sans">
      <Header />
      <FileUpload onFileUpload={handleFileUpload} />
      <SearchBar searchQuery={searchQuery} isIndexing={isIndexing} onSearch={handleSearch} />
      <SearchResults
        searchQuery={searchQuery}
        searchResults={searchResults}
        displayedFiles={displayedFiles}
        processingStatus={processingStatus}
        onDeleteFile={handleDeleteFile}
      />
      <PrivacyStatus />
    </div>
  );
}

export default App;

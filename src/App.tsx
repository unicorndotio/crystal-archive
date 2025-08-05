import { useState, useEffect, useCallback } from "react";
import { db, type FileRecord } from "./services/database";
import { searchService } from "./services/searchService";
import type { SearchResult } from "minisearch";
import { Header } from "./components/Header";
import { Welcome } from "./components/Welcome";
import { SearchBar } from "./components/SearchBar";
import { SearchResults } from "./components/SearchResults";
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
      const { type, file, content, error } = e.data;

      if (type === "processed") {
        const updatedFile = { ...file, content };
        await db.files.update(file.id, { content });
        await updateFileInStateAndIndex(updatedFile);
      } else if (type === "error") {
        console.error(`Error processing file ${file.id}:`, error);
        setProcessingStatus(prev => ({ ...prev, [file.id]: `Error: ${error}` }));
      }
    };

    fileProcessorWorker.addEventListener("message", handleWorkerMessage);
    return () => {
      fileProcessorWorker.removeEventListener("message", handleWorkerMessage);
    };
  }, [updateFileInStateAndIndex]);

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
      await searchService.indexFile(newFile); // Index by name immediately
      newFiles.push(newFile);
      fileProcessorWorker.postMessage({ file, record: newFile });
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
      allFiles.forEach(file => {
        if (!file.content) {
          status[file.id] = "Processing...";
        }
      });
      setProcessingStatus(status);

      await searchService.indexAllFiles(allFiles); // Index all files by name
      setIsIndexing(false);
    };
    loadFilesAndBuildIndex();
  }, []);

  const displayedFiles = searchQuery ? searchResults.map(r => files.find(f => f.id === r.id)).filter(Boolean) as FileRecord[] : files;

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl flex flex-col space-y-6">
        <Header onFileUpload={handleFileUpload} />
        {files.length === 0 ? (
          <Welcome onFileUpload={handleFileUpload} />
        ) : (
          <SearchResults
            searchQuery={searchQuery}
            searchResults={searchResults}
            displayedFiles={displayedFiles}
            processingStatus={processingStatus}
            onDeleteFile={handleDeleteFile}
          />
        )}
        <SearchBar searchQuery={searchQuery} isIndexing={isIndexing} onSearch={handleSearch} />
      </div>
    </div>
  );
}

export default App;

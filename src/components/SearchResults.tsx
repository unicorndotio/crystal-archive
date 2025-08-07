import { type FileRecord } from "../services/database";
import { type SearchResult } from "minisearch";
import { searchService } from "../services/searchService";

interface SearchResultsProps {
  searchQuery: string;
  searchResults: SearchResult[];
  displayedFiles: FileRecord[];
  processingStatus: Record<string, string>;
  onDeleteFile: (fileId: string) => void;
  onFileClick: (file: FileRecord) => void;
}

const getFileIcon = (fileType: string) => {
  if (fileType.startsWith("image/")) {
    return (
      <div className="bg-purple-500/30 p-3 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
      </div>
    );
  }
  if (fileType === "application/pdf") {
    return (
      <div className="bg-indigo-500/30 p-3 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
      </div>
    );
  }
  if (fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    return (
      <div className="bg-sky-500/30 p-3 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M12 18v-6"></path><path d="M12 12H8"></path></svg>
      </div>
    );
  }
  return (
    <div className="bg-gray-500/30 p-3 rounded-lg">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
    </div>
  );
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const getStatusInfo = (status: string) => {
    switch (status) {
        case "Processed":
            return { text: "Ready", color: "text-green-400", pulse: true, spin: false, bgColor: "bg-green-400" };
        case "Processing...":
            return { text: "Processing...", color: "text-yellow-400", pulse: false, spin: true, bgColor: "bg-yellow-400" };
        default:
            if (status && status.startsWith("Error")) {
                return { text: "Error", color: "text-red-400", pulse: false, spin: false, bgColor: "bg-red-400" };
            }
            return { text: "Pending", color: "text-gray-400", pulse: false, spin: false, bgColor: "bg-gray-400" };
    }
};

export function SearchResults({ searchQuery, searchResults, displayedFiles, processingStatus, onDeleteFile, onFileClick }: SearchResultsProps) {
  return (
    <div className="rounded-3xl p-[2px] bg-gradient-to-b from-white/20 to-white/5 shadow-2xl">
      <main className="w-full h-full rounded-[1.4rem] bg-white/10 backdrop-blur-xl p-6 sm:p-8">
        <div className="space-y-4">
          {displayedFiles.map((file) => {
            const status = processingStatus[file.id] || "Pending";
            const statusInfo = getStatusInfo(status);
            const result = searchQuery ? searchResults.find(r => r.id === file.id) : undefined;
            const terms = result?.terms || [];

            return (
              <div key={file.id} className="bg-black/10 p-4 rounded-xl flex items-center justify-between hover:bg-black/20 transition-colors duration-200 cursor-pointer" onClick={() => onFileClick(file)}>
                <div className="flex items-center space-x-4">
                  {getFileIcon(file.type)}
                  <div>
                    <p className="font-semibold text-white" dangerouslySetInnerHTML={{ __html: searchService.highlight(file.name, terms) }}></p>
                    <p className="text-sm text-gray-400">{formatFileSize(file.size)}</p>
                    {searchQuery && file.content && (
                      <p className="text-sm text-gray-300 mt-1 line-clamp-2" dangerouslySetInnerHTML={{ __html: searchService.highlight(file.content.substring(0, 200), terms) }}></p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`text-sm font-medium ${statusInfo.color}`}>{statusInfo.text}</span>
                  <div className={`w-2.5 h-2.5 rounded-full ${statusInfo.bgColor} ${statusInfo.pulse ? 'animate-pulse' : ''} ${statusInfo.spin ? 'animate-spin' : ''}`}></div>
                   <button onClick={() => onDeleteFile(file.id)} className="text-gray-400 hover:text-white transition-colors duration-200">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                   </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
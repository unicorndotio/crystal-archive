import { type FileRecord } from "../services/database";
import { type SearchResult } from "minisearch";
import { searchService } from "../services/searchService";

interface SearchResultsProps {
  searchQuery: string;
  searchResults: SearchResult[];
  displayedFiles: FileRecord[];
  processingStatus: Record<string, string>;
  onDeleteFile: (fileId: string) => void;
}

export function SearchResults({ searchQuery, searchResults, displayedFiles, processingStatus, onDeleteFile }: SearchResultsProps) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">{searchQuery ? "Search Results" : "Uploaded Files"}</h2>
      {displayedFiles.length > 0 ? (
        <ul className="bg-white p-6 rounded-lg shadow-md space-y-4">
          {displayedFiles.map((file) => {
            const result = searchQuery ? searchResults.find(r => r.id === file.id) : undefined;
            const terms = result?.terms || [];

            return (
              <li key={file.id} className="p-4 border rounded-md">
                <div className="flex justify-between items-start mb-2">
                  <h3
                    className="font-semibold text-lg"
                    dangerouslySetInnerHTML={{ __html: searchService.highlight(file.name, terms) }}
                  />
                  <button onClick={() => onDeleteFile(file.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex-shrink-0 ml-4">Delete</button>
                </div>
                <div className="text-sm text-gray-500 mb-2">
                  <span>{file.type}</span> |
                  <span className="mx-1">{(file.size / 1024).toFixed(2)} KB</span> |
                  <span className={`mx-1 font-medium ${
                      processingStatus[file.id] === 'Processed' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                      {processingStatus[file.id] || 'Pending'}
                  </span>
                  {result && <span className="ml-1">| Score: {result.score.toFixed(2)}</span>}
                </div>
                {searchQuery && file.content && (
                  <div
                    className="text-sm text-gray-700 mt-2 bg-gray-50 p-2 rounded prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: searchService.highlight(
                        file.content.substring(0, 400) + (file.content.length > 400 ? '...' : ''),
                        terms
                      )
                    }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-center text-gray-500 mt-8">{searchQuery ? "No results found." : "No files uploaded yet."}</p>
      )}
    </div>
  );
}

interface SearchBarProps {
  searchQuery: string;
  isIndexing: boolean;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchBar({ searchQuery, isIndexing, onSearch }: SearchBarProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-semibold mb-4">2. Search Files</h2>
      <input
        type="search"
        value={searchQuery}
        onChange={onSearch}
        placeholder={isIndexing ? "Building search index..." : "Search by name or content..."}
        disabled={isIndexing}
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-violet-500 transition"
      />
    </div>
  );
}

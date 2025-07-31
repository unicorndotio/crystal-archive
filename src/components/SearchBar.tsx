interface SearchBarProps {
  searchQuery: string;
  isIndexing: boolean;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchBar({ searchQuery, isIndexing, onSearch }: SearchBarProps) {
  return (
    <div className="rounded-3xl p-[2px] bg-gradient-to-b from-white/20 to-white/5 shadow-2xl">
      <footer className="w-full h-full rounded-[1.4rem] bg-white/10 backdrop-blur-xl p-4">
        <div className="relative bg-black/20 rounded-xl p-2 flex items-center border border-white/10">
          <div className="pl-3 pr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
          <input 
            type="text" 
            placeholder="Gaze into the crystal to find your scrolls..." 
            className="w-full bg-transparent p-2 text-white placeholder-gray-400 focus:outline-none"
            value={searchQuery}
            onChange={onSearch}
            disabled={isIndexing}
          />
          <button className="bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-5 rounded-lg ml-2 flex items-center space-x-2 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <span>Search</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
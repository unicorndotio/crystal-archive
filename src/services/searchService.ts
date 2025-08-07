import MiniSearch from 'minisearch';
import { type FileRecord } from './database';

class LocalSearchService {
  private searchEngine: MiniSearch<FileRecord>;

  constructor() {
    this.searchEngine = new MiniSearch<FileRecord>({
      fields: ['name', 'content'], // fields to index
      storeFields: ['id', 'name', 'type', 'uploadedAt', 'size', 'content'], // fields to return
      searchOptions: {
        boost: { name: 2 }, // boost filename matches
        fuzzy: 0.2, // allow typos
        prefix: true, // match word prefixes
      },
    });
  }

  async indexFile(file: FileRecord) {
    if (this.searchEngine.has(file.id)) {
        await this.searchEngine.replace(file);
    } else {
        await this.searchEngine.add(file);
    }
  }

  async indexAllFiles(files: FileRecord[]) {
    this.searchEngine.removeAll();
    await this.searchEngine.addAllAsync(files);
  }

  async removeFile(fileId: string) {
    if (this.searchEngine.has(fileId)) {
        this.searchEngine.discard(fileId);
    }
  }

  search(query: string) {
    if (!query.trim()) return [];

    return this.searchEngine.search(query, {
      limit: 50,
      prefix: true,
      fuzzy: 0.2,
      includeMatches: true, // Required for highlighting
    });
  }

  getSuggestions(query: string, maxSuggestions = 5) {
    return this.searchEngine.autoSuggest(query, {
      maxSuggestions,
      fuzzy: 0.2,
      prefix: true,
    });
  }

  highlight(text: string, terms: string[]) {
    if (!terms.length) return text;
    const regex = new RegExp(`(${terms.join("|")})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  }
}

const searchService = new LocalSearchService();
export { searchService };

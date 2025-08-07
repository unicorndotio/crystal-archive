import { describe, it, expect, beforeEach } from 'bun:test';
import { searchService, FileRecord } from './searchService';

describe('LocalSearchService', () => {
  beforeEach(async () => {
    // Since we are using a singleton, we must clear the index before each test
    const all = searchService.search('');
    for (const item of all) {
        await searchService.removeFile(item.id);
    }
  });

  const file1: FileRecord = {
    id: '1',
    name: 'apple.txt',
    content: 'This file is about apples.',
    type: 'text/plain',
    size: 100,
    uploadedAt: new Date(),
    lastModified: new Date(),
  };

  const file2: FileRecord = {
    id: '2',
    name: 'banana.txt',
    content: 'This file is about bananas.',
    type: 'text/plain',
    size: 100,
    uploadedAt: new Date(),
    lastModified: new Date(),
  };

  const file3: FileRecord = {
    id: '3',
    name: 'apple_and_banana.txt',
    content: 'This file is about both apples and bananas.',
    type: 'text/plain',
    size: 200,
    uploadedAt: new Date(),
    lastModified: new Date(),
  };

  it('should index a file', async () => {
    await searchService.indexFile(file1);
    const results = searchService.search('apple');
    expect(results.length).toBe(1);
    expect(results[0].id).toBe('1');
  });

  it('should remove a file from the index', async () => {
    await searchService.indexFile(file1);
    await searchService.removeFile('1');
    const results = searchService.search('apple');
    expect(results.length).toBe(0);
  });

  it('should return search results based on query', async () => {
    await searchService.indexFile(file1);
    await searchService.indexFile(file2);
    await searchService.indexFile(file3);

    const results = searchService.search('apple');
    expect(results.length).toBe(2);
  });

  it('should return suggestions for a query', async () => {
    await searchService.indexFile(file1);
    await searchService.indexFile(file3);

    const suggestions = searchService.getSuggestions('appl');
    expect(suggestions.length).toBeGreaterThan(0);
    expect(suggestions[0].terms).toContain('apples');
  });

  it('should highlight matches in content', () => {
    const content = 'This is about apples and more apples.';
    const terms = ['apples'];
    const highlighted = searchService.highlight(content, terms);
    expect(highlighted).toBe('This is about <mark>apples</mark> and more <mark>apples</mark>.');
  });
});

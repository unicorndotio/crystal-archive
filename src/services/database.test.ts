import { describe, it, expect, beforeEach } from 'bun:test';
import { db, FileRecord } from './database';

describe('database', () => {
  beforeEach(async () => {
    await db.open();
    await db.files.clear();
  });

  it('should add a file to the database', async () => {
    const file: FileRecord = {
      id: '1',
      name: 'test.txt',
      type: 'text/plain',
      size: 123,
      content: 'This is a test file.',
      uploadedAt: new Date(),
      lastModified: new Date(),
    };

    await db.files.add(file);

    const storedFile = await db.files.get('1');
    expect(storedFile).toBeDefined();
    expect(storedFile?.name).toBe('test.txt');
  });

  it('should retrieve all files from the database', async () => {
    const file1: FileRecord = {
      id: '1',
      name: 'test1.txt',
      type: 'text/plain',
      size: 123,
      content: 'This is a test file 1.',
      uploadedAt: new Date(),
      lastModified: new Date(),
    };
    const file2: FileRecord = {
      id: '2',
      name: 'test2.txt',
      type: 'text/plain',
      size: 456,
      content: 'This is a test file 2.',
      uploadedAt: new Date(),
      lastModified: new Date(),
    };

    await db.files.bulkAdd([file1, file2]);

    const allFiles = await db.files.toArray();
    expect(allFiles.length).toBe(2);
  });

  it('should delete a file from the database', async () => {
    const file: FileRecord = {
      id: '1',
      name: 'test.txt',
      type: 'text/plain',
      size: 123,
      content: 'This is a test file.',
      uploadedAt: new Date(),
      lastModified: new Date(),
    };

    await db.files.add(file);
    await db.files.delete('1');

    const storedFile = await db.files.get('1');
    expect(storedFile).toBeUndefined();
  });
});

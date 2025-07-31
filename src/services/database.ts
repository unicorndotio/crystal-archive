import Dexie, { type Table } from "dexie";

export interface FileRecord {
  id: string;
  name: string;
  type: string;
  size: number;
  content: string;
  uploadedAt: Date;
  lastModified: Date;
}

class FileSearchDB extends Dexie {
  files!: Table<FileRecord>;

  constructor() {
    super("FileSearchDB");
    this.version(1).stores({
      files: "id, name, type, size, uploadedAt, *content", // *content for full-text search
    });
  }
}

const db = new FileSearchDB();

export { db };

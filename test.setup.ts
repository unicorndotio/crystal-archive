import { JSDOM } from 'jsdom';
import indexeddb from 'fake-indexeddb';
import IDBKeyRange from 'fake-indexeddb/lib/FDBKeyRange';
import { expect } from 'bun:test';
import * as matchers from '@testing-library/jest-dom/matchers';

// Setup the DOM
const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost/',
});
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

// JSDOM doesn't have DOMMatrix, so we polyfill it.
if (typeof global.DOMMatrix === 'undefined') {
    const { DOMMatrix } = await import('dommatrix');
    global.DOMMatrix = DOMMatrix;
}

// Setup IndexedDB
global.indexedDB = indexeddb;
global.IDBKeyRange = IDBKeyRange;

// Extend expect with jest-dom matchers
expect.extend(matchers);

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  db: IDBDatabase;
  constructor() { this.initialize(); }

  //  DB Setup
  initialize(): void {
    // eslint-disable-next-line max-len
    const indexedDB = window.indexedDB || (window as any).mozIndexedDB || (window as any).webkitIndexedDB || (window as any).msIndexedDB;
    if (!indexedDB) {
      // eslint-disable-next-line no-alert
      window.alert('Your browser doesn\'t support a stable version of IndexedDB. The application with therefore not work');
    }

    //  open DB
    const request = indexedDB.open('AccessibilityBasics', 1);
    request.onupgradeneeded = event => {
      this.db = event.target.result;
      this.db.createObjectStore('toDoList', { autoIncrement: true, keyPath: 'id' });
    };

    request.onsuccess = event => {
      this.db = event.target.result;
    };

    request.onerror = () => {
      // eslint-disable-next-line no-alert
      alert('Epic fail: Something terrible has happened');
    };
  }

  getDb(): IDBDatabase { return this.db; }
}

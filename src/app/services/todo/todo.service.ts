import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Todo } from '../../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  db: IDBDatabase;
  private todos: Subject<Todo[]> = new Subject();
  todos$: Observable<Todo[]> = this.todos.asObservable();

  constructor() {
    this.get();
  }

  getDb(): Promise<void> {
    //  open DB
    return new Promise(resolve => {
      const request = indexedDB.open('AccessibilityBasics', 1);
      request.onupgradeneeded = (event: any) => {
        this.db = event.target.result;
        this.db.createObjectStore('toDoList', { autoIncrement: true, keyPath: 'id' });
      };

      request.onsuccess = (event: any) => {
        this.db = event.target.result;
        resolve(event.target.result);
      };
    });
  }

  /**
   * list of all todo items, both completed and non
   */
    async get(): Promise<Todo[]> {
      if (!this.db) { await this.getDb(); }
      const returnVal: Promise<Todo[]> = new Promise((resolve) => {
        const objectStore = this.db.transaction(['toDoList'], 'readwrite').objectStore('toDoList');
        const list: Todo[] = [];
        objectStore.openCursor().onsuccess = (event: any) => {
          const cursor = event.target.result;
          if (!cursor) {
            this.todos.next(list);
            resolve(list);
            return;
          }
          const item = new Todo(cursor.value, cursor.key);
          list.push(item);
          cursor.continue();
        };
      });
      return returnVal;
    }

  /**
   * creates a new todo item
   */
  async create(item: string): Promise<Todo[]> {
    if (!this.db) { await this.getDb(); }
    const returnVal: Promise<Todo[]> = new Promise((resolve) => {
      const payload = {
        item,
        completed: false,
      };
      const objectStore = this.db.transaction(['toDoList'], 'readwrite').objectStore('toDoList');
      const result = objectStore.add(payload);
      result.onsuccess = async () => {
        const list = await this.get();
        this.todos.next(list);
        resolve(list);
      };
    });
    return returnVal;
  }

  /**
   * Marks a todo item as completed
   */
  async updateStatus(id: number): Promise<Todo[]> {
    if (!this.db) { await this.getDb(); }
    const returnVal: Promise<Todo[]> = new Promise((resolve) => {
      const objectStore = this.db.transaction(['toDoList'], 'readwrite').objectStore('toDoList');
      objectStore.get(id).onsuccess = (event: any) => {
        const todo = { ...event.target.result };
        todo.completed = !todo.completed;
        objectStore.put(todo).onsuccess = async () => {
          const list = await this.get();
          this.todos.next(list);
          resolve(list);
        };
      };
    });
    return returnVal;
  }

  /**
   * deletes todo item
   */
  async remove(id: number): Promise<Todo[]> {
    if (!this.db) { await this.getDb(); }
    const returnVal: Promise<Todo[]> = new Promise((resolve) => {
      const key = Number(id);
      const request = this.db.transaction(['toDoList'], 'readwrite').objectStore('toDoList').delete(key);
      request.onsuccess = async () => {
        const list = await this.get();
        this.todos.next(list);
        resolve(list);
      };
    });
    return returnVal;
  }

}

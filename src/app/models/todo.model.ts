interface CursorValue {
  item: string;
  completed: boolean;
}

export class Todo {
  item: string;
  completed: boolean;
  id: number;
  constructor(cursorValue: CursorValue, id: number) {
    this.item = cursorValue.item;
    this.completed = cursorValue.completed;
    this.id = id;
  }
}

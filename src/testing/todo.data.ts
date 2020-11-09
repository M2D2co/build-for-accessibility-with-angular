import { Todo } from '../app/models/todo.model';

export const allTodos: Todo[] = [
  { id: 2, item: 'Clean Kitchen', completed: false },
  { id: 3, item: 'Cook Dinner', completed: false },
  { id: 4, item: 'Fold Laundry', completed: true },
  { id: 5, item: 'Call Alex', completed: false },
];

export const completedTodos: Todo[] = [
  { id: 4, item: 'Fold Laundry', completed: true },
];

export const todos: Todo[] = [
  { id: 2, item: 'Clean Kitchen', completed: false },
  { id: 3, item: 'Cook Dinner', completed: false },
  { id: 5, item: 'Call Alex', completed: false },
];

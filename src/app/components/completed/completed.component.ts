import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo/todo.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss']
})
export class CompletedComponent implements OnInit, OnDestroy {

  destroyed$: Subject<boolean> = new Subject();
  todoList: Todo[];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.todos$.pipe(
      takeUntil(this.destroyed$),
      map((todos: Todo[]) => todos.filter(todo => todo.completed))
      ).subscribe(todos => {
      this.todoList = todos;
    });
  }

  remove(id: number): Promise<Todo[]> {
    return this.todoService.remove(id);
  }

  undo(id: number): Promise<Todo[]> {
    return this.todoService.updateStatus(id);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}

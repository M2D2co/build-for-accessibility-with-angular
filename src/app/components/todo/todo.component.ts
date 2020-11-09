import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectionListChange } from '@angular/material/list';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy {

  destroyed$: Subject<boolean> = new Subject();
  todoList: Todo[];
  form: FormGroup;

  constructor(
    private todoService: TodoService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      item: ['', [Validators.required, Validators.maxLength(250) ]]
    });
  }

  ngOnInit(): void {
    this.todoService.todos$.pipe(
      takeUntil(this.destroyed$),
      map((todos: Todo[]) => todos.filter(todo => !todo.completed))
      ).subscribe(todos => {
      this.todoList = todos;
    });
  }

  add(): void {
    const item = this.form.value.item;
    this.todoService.create(item);
  }

  onSelectionChange(event: MatSelectionListChange): void {
    const id = event.source._value[0];
    if (!id) { return; }
    this.todoService.updateStatus(Number(id));
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}

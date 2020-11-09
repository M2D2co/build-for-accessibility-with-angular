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
  loaded = false;

  constructor(
    private todoService: TodoService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      item: ['', [Validators.required, Validators.maxLength(250) ]]
    });
  }

  ngOnInit(): void {
    console.log('init');
    this.todoService.todos$.pipe(
      takeUntil(this.destroyed$),
      map((todos: Todo[]) => {
        if (!todos) { return todos; }
        return todos.filter(todo => !todo.completed);
      })).subscribe(todos => {
        if (!todos) { return; }
        this.todoList = todos;
        this.loaded = true;
    });
  }

  async add(): Promise<void> {
    const item = this.form.value.item;
    await this.todoService.create(item);
    this.form.reset();
  }

  onSelectionChange(event: MatSelectionListChange): void {
    const id = event.source._value[0];
    if (!id) { return; }
    this.todoService.updateStatus(Number(id));
  }

  ngOnDestroy(): void {
    console.log('destroyed');
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}

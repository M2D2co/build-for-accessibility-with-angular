import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { Mock } from 'ts-mocks';

import { TodoComponent } from './todo.component';
import { TodoService } from '../../services/todo/todo.service';
import { of } from 'rxjs';
import { allTodos, todos } from '../../../testing/todo.data';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  let mockTodoService: Mock<TodoService>;

  beforeEach(waitForAsync(() => {
    mockTodoService = new Mock<TodoService>({
      todos$: of(allTodos),
      updateStatus: () => ('statusUpdated' as any),
    });
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ ReactiveFormsModule, MaterialModule, BrowserAnimationsModule  ],
      declarations: [ TodoComponent ],
      providers: [
        { provide: TodoService, useValue: mockTodoService.Object }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a h2 level header', () => {
    const h2 = fixture.debugElement.nativeElement.querySelector('h2');
    expect(h2).toBeTruthy();
  });

  it('should have header text of "Completed List"', () => {
    const h2 = fixture.debugElement.nativeElement.querySelector('h2');
    expect(h2.innerText).toEqual('To Do List');
  });

  it('should filter for uncompleted to dos', () => {
    expect(component.todoList.length).toEqual(todos.length);
  });

  it('should show empty screen when no to dos', async () => {
    mockTodoService.extend({ todos$: of([]) });
    component.ngOnInit();
    await fixture.whenStable();
    fixture.detectChanges();
    const empty = fixture.debugElement.nativeElement.querySelector('div.empty');
    expect(empty).toBeTruthy();
  });

  it('should show loading screen while loading', async () => {
    component.loaded = false;
    component.todoList = null;
    mockTodoService.extend({ todos$: of(null) });
    component.ngOnInit();
    await fixture.whenStable();
    fixture.detectChanges();
    const loading = fixture.debugElement.nativeElement.querySelector('.loading');
    expect(loading).toBeTruthy();
  });

  it('should include an add to list form', () => {
    const form = fixture.debugElement.nativeElement.querySelector('form');
    expect(form).toBeTruthy();
  });

  it('form should include a submit button', () => {
    const form: HTMLElement = fixture.debugElement.nativeElement.querySelector('form');
    const submitButton: HTMLElement = form.querySelector('button[type="submit"]');
    expect(submitButton).toBeTruthy();
  });

  it('should disable submit button when form is invalid', () => {
    const validationError: ValidationErrors = { error: 'I am invalid' };
    component.form.setErrors(validationError);
    fixture.detectChanges();
    const form: HTMLElement = fixture.debugElement.nativeElement.querySelector('form');
    const submitButton: HTMLElement = form.querySelector('button[type="submit"]');
    expect(submitButton.getAttribute('disabled')).toEqual('true');
  });

  it('should enable submit button when form is valid', () => {
    component.form.setErrors(null);
    component.form.get('item').patchValue('Read my favorite book');
    fixture.detectChanges();
    const form: HTMLElement = fixture.debugElement.nativeElement.querySelector('form');
    const submitButton: HTMLElement = form.querySelector('button[type="submit"]');
    expect(submitButton.getAttribute('disabled')).toBeFalsy();
  });

  it('item should be a required field', () => {
    const form: HTMLElement = fixture.debugElement.nativeElement.querySelector('form');
    const input: HTMLElement = form.querySelector('input[formControlName="item"]');
    expect(input.getAttribute('aria-required')).toEqual('true');
  });

  it('should onSelectionChange when list item is selected', () => {
    spyOn(component, 'onSelectionChange').and.callThrough();
    const listOption = fixture.debugElement.nativeElement.querySelector('mat-list-option');
    listOption.click();
    expect(component.onSelectionChange).toHaveBeenCalled();
  });

  it('mat-icon-buttons should have aria-labels', () => {
    const buttons: HTMLElement[] = fixture.debugElement.nativeElement.querySelector('button[mat-icon-button]');
    const unLabeledButtons = Array.from(buttons).some(button => !button.getAttribute('aria-label'));
    expect(unLabeledButtons).toBeFalsy();
  });
});

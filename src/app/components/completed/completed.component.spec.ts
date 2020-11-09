import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { Mock } from 'ts-mocks';
import { TodoService } from '../../services/todo/todo.service';
import { allTodos, completedTodos } from '../../../testing/todo.data';

import { CompletedComponent } from './completed.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from '../../material/material.module';

describe('CompletedComponent', () => {
  let component: CompletedComponent;
  let fixture: ComponentFixture<CompletedComponent>;

  let mockTodoService: Mock<TodoService>;

  beforeEach(async(() => {
    mockTodoService = new Mock<TodoService>({
      todos$: of(allTodos),
      remove: () => ('removed' as any),
      updateStatus: () => ('statusUpdated' as any),
    });
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ MaterialModule ],
      declarations: [ CompletedComponent ],
      providers: [
        { provide: TodoService, useValue: mockTodoService.Object }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedComponent);
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
    expect(h2.innerText).toEqual('Completed List');
  });

  it('should filter for completed todos', () => {
    expect(component.todoList.length).toEqual(completedTodos.length);
  });

  it('should call remove when remove button is pressed', () => {
    spyOn(component, 'remove').and.callThrough();
    const deleteButton = fixture.debugElement.nativeElement.querySelector('button[aria-label="delete"]');
    deleteButton.click();
    expect(component.remove).toHaveBeenCalled();
  });

  it('should call undo when undo button is pressed', () => {
    spyOn(component, 'undo').and.callThrough();
    const deleteButton = fixture.debugElement.nativeElement.querySelector('button[aria-label="undo"]');
    deleteButton.click();
    expect(component.undo).toHaveBeenCalled();
  });

  it('icon butttons should have aria labels', () => {
    const iconButtons = fixture.debugElement.nativeElement.querySelectorAll('button[mat-icon-button]');
    const missingLabels = Array.from(iconButtons).some((button: HTMLElement) => !button.getAttribute('aria-label'));
    expect(missingLabels).toBeFalsy();
  });

  it('mat list should have a role of list', () => {
    const list = fixture.debugElement.nativeElement.querySelector('mat-list');
    expect(list.getAttribute('role')).toEqual('list');
  });

  it('mat list items should have a role of listitem', () => {
    const listItems = fixture.debugElement.nativeElement.querySelectorAll('mat-list-item');
    const missingRoles = Array.from(listItems).some((listItem: HTMLElement) => listItem.getAttribute('role') !== 'listitem');
    expect(missingRoles).toBeFalsy();
  });

  it('should showo empty screen when no completed to dos', async () => {
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
    console.log(component.todoList);
    const loading = fixture.debugElement.nativeElement.querySelector('mat-card-content.loading');
    expect(loading).toBeTruthy();
  });
});

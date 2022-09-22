import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MaterialModule } from '../../material/material.module';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ MaterialModule ],
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should include the todo section', () => {
    const todoSection = fixture.debugElement.nativeElement.querySelector('app-todo');
    expect(todoSection).toBeTruthy();
  });

  it('should include the completed section', () => {
    const completedSection = fixture.debugElement.nativeElement.querySelector('app-completed');
    expect(completedSection).toBeTruthy();
  });

  it('should include the resources section', () => {
    const resourcesSection = fixture.debugElement.nativeElement.querySelector('app-resources');
    expect(resourcesSection).toBeTruthy();
  });
});

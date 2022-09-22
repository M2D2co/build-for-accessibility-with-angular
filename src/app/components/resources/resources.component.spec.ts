import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MaterialModule } from '../../material/material.module';

import { ResourcesComponent } from './resources.component';

describe('ResourcesComponent', () => {
  let component: ResourcesComponent;
  let fixture: ComponentFixture<ResourcesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ MaterialModule ],
      declarations: [ ResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('resource list should include a role of list', () => {
    const list: HTMLElement = fixture.debugElement.nativeElement.querySelector('mat-list');
    expect(list.getAttribute('role')).toEqual('list');
  });

  it('list items should include a role of listitem', () => {
    const listItems: HTMLElement[] = fixture.debugElement.nativeElement.querySelectorAll('mat-list-item');
    const nonLabeldListItems = Array.from(listItems).some(item => item.getAttribute('role') !== 'listitem');
    expect(nonLabeldListItems).toBeFalsy();
  });

  it('links should have discernable text', () => {
    const links: HTMLElement[] = fixture.debugElement.nativeElement.querySelectorAll('a');
    const emptyLinks = Array.from(links).some(link => !link.innerText);
    expect(emptyLinks).toBeFalsy();
  });

  it('should have a title of "Resources"', () => {
    const title = fixture.debugElement.nativeElement.querySelector('.title');
    expect(title.innerText).toEqual('Resources');
  });

  it('should include an h2', () => {
    const h2 = fixture.debugElement.nativeElement.querySelector('h2');
    expect(h2).toBeTruthy();
  });
});

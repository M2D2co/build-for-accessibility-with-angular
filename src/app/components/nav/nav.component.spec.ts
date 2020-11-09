import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../material/material.module';

import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ MaterialModule, RouterTestingModule ],
      declarations: [ NavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should include a nav element', () => {
    const nav = fixture.debugElement.nativeElement.querySelector('nav');
    expect(nav).toBeTruthy();
  });

  it('anchor tags should include text', () => {
    const anchorTags = fixture.debugElement.nativeElement.querySelectorAll('a');
    const emptyTags = Array.from(anchorTags).some((a: HTMLElement) => !a.innerText);
    expect(emptyTags).toBeFalsy();
  });

});
